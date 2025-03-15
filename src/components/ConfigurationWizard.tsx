import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { 
  Box, 
  Button, 
  Card, 
  CardContent,
  Divider,
  FormControl, 
  FormHelperText, 
  InputLabel, 
  MenuItem, 
  Select, 
  Slider, 
  TextField, 
  Typography, 
  Container,
  Grid,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  Chip,
  Tooltip
} from '@mui/material';

// Import Google/Material icons
import MenuIcon from '@mui/icons-material/Menu';
import DownloadIcon from '@mui/icons-material/Download';
import CodeIcon from '@mui/icons-material/Code';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SaveAltIcon from '@mui/icons-material/SaveAlt';

import { projects, fuzzers, mutationStrategies, ExperimentConfig } from '../data/fuzzerData';
import { generateYaml, downloadYaml } from '../utils/yamlUtils';

const validationSchema = Yup.object({
  project: Yup.string().required('Project is required'),
  fuzzer: Yup.string().required('Fuzzer is required'),
  mutationStrategy: Yup.string().required('Mutation strategy is required'),
  cpuCores: Yup.number().min(1, 'Min: 1 core').max(8, 'Max: 8 cores').required('CPU cores are required'),
  memoryGB: Yup.number().min(1, 'Min: 1GB').max(16, 'Max: 16GB').required('Memory is required'),
  timeoutHours: Yup.number().min(1, 'Min: 1 hour').max(24, 'Max: 24 hours').required('Timeout is required'),
  additionalOptions: Yup.string()
});

const ConfigurationWizard = () => {
  const [yamlPreview, setYamlPreview] = useState<string>('');

  const formik = useFormik<ExperimentConfig>({
    initialValues: {
      project: '',
      fuzzer: '',
      mutationStrategy: 'default',
      cpuCores: 2,
      memoryGB: 4,
      timeoutHours: 1,
      additionalOptions: ''
    },
    validationSchema,
    onSubmit: (values) => {
      const yaml = generateYaml(values);
      setYamlPreview(yaml);
    }
  });

  // Update YAML preview whenever form values change
  const updatePreview = () => {
    if (formik.dirty && !Object.keys(formik.errors).length) {
      const yaml = generateYaml(formik.values);
      setYamlPreview(yaml);
    }
  };

  useEffect(() => {
    updatePreview();
  }, [formik.values]);

  return (
    <>
      <AppBar position="static" color="default" elevation={0} className="border-b border-gray-200">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <CodeIcon sx={{ mr: 1 }} />
            OSS-Fuzz-Gen
            <Divider orientation="vertical" flexItem sx={{ mx: 2, height: 24 }} />
            <Typography variant="body1" color="text.secondary">Experiment Configuration</Typography>
          </Typography>
          <Tooltip title="Help">
            <IconButton color="inherit">
              <HelpOutlineIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Settings">
            <IconButton color="inherit">
              <SettingsIcon />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="lg" className="py-6">
        {/* Project navigation header */}
        <Box className="mb-6 flex items-center">
          <Typography variant="h5" component="h1" className="font-medium">
            Experiment Configuration Wizard
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
        </Box>
        
        <Grid container spacing={3}>
          <Grid item xs={12} md={7}>
            <Card className="gcp-card">
              <Box className="gcp-card-header">
                <Typography variant="h6" component="h2" className="font-medium flex items-center">
                  <SettingsIcon sx={{ mr: 1, color: 'primary.main' }} fontSize="small" />
                  Configure Experiment
                </Typography>
              </Box>
              
              <CardContent className="gcp-card-content">
                <form onSubmit={formik.handleSubmit} onChange={updatePreview}>
                  <Grid container spacing={3}>
                    {/* Project Selection */}
                    <Grid item xs={12} sm={6} className="gcp-form-control">
                      <FormControl fullWidth error={formik.touched.project && Boolean(formik.errors.project)} variant="outlined">
                        <InputLabel>Project</InputLabel>
                        <Select
                          name="project"
                          label="Project"
                          value={formik.values.project}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          {projects.map((project) => (
                            <MenuItem key={project.id} value={project.id}>
                              {project.name}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>{formik.touched.project && formik.errors.project}</FormHelperText>
                      </FormControl>
                    </Grid>

                    {/* Fuzzer Selection */}
                    <Grid item xs={12} sm={6} className="gcp-form-control">
                      <FormControl fullWidth error={formik.touched.fuzzer && Boolean(formik.errors.fuzzer)} variant="outlined">
                        <InputLabel>Fuzzer</InputLabel>
                        <Select
                          name="fuzzer"
                          label="Fuzzer"
                          value={formik.values.fuzzer}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          {fuzzers.map((fuzzer) => (
                            <MenuItem key={fuzzer.id} value={fuzzer.id}>
                              {fuzzer.name}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>{formik.touched.fuzzer && formik.errors.fuzzer}</FormHelperText>
                      </FormControl>
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Divider sx={{ my: 1 }} />
                      <Typography className="gcp-section-title flex items-center">
                        <InfoOutlinedIcon fontSize="small" sx={{ mr: 1, color: 'info.main' }} />
                        Fuzzer Options
                      </Typography>
                    </Grid>

                    {/* Mutation Strategy */}
                    <Grid item xs={12} className="gcp-form-control">
                      <FormControl fullWidth error={formik.touched.mutationStrategy && Boolean(formik.errors.mutationStrategy)} variant="outlined">
                        <InputLabel>Mutation Strategy</InputLabel>
                        <Select
                          name="mutationStrategy"
                          label="Mutation Strategy"
                          value={formik.values.mutationStrategy}
                          onChange={formik.handleChange}
                          onBlur={formik.handleBlur}
                        >
                          {mutationStrategies.map((strategy) => (
                            <MenuItem key={strategy.id} value={strategy.id}>
                              {strategy.name}
                            </MenuItem>
                          ))}
                        </Select>
                        <FormHelperText>{formik.touched.mutationStrategy && formik.errors.mutationStrategy}</FormHelperText>
                      </FormControl>
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Divider sx={{ my: 1 }} />
                      <Typography className="gcp-section-title flex items-center">
                        <InfoOutlinedIcon fontSize="small" sx={{ mr: 1, color: 'info.main' }} />
                        Resource Allocation
                      </Typography>
                    </Grid>

                    {/* CPU Cores */}
                    <Grid item xs={12} className="gcp-form-control">
                      <Box className="flex items-center justify-between">
                        <Typography variant="body2">CPU Cores</Typography>
                        <Chip 
                          label={`${formik.values.cpuCores} cores`} 
                          size="small" 
                          color="primary" 
                          variant="outlined"
                        />
                      </Box>
                      <Slider
                        name="cpuCores"
                        min={1}
                        max={8}
                        step={1}
                        marks
                        value={formik.values.cpuCores}
                        onChange={(_, value) => formik.setFieldValue('cpuCores', value)}
                        aria-labelledby="cpu-cores-slider"
                        sx={{ mt: 2, color: 'primary.main' }}
                      />
                      {formik.touched.cpuCores && formik.errors.cpuCores && (
                        <FormHelperText error>{formik.errors.cpuCores}</FormHelperText>
                      )}
                    </Grid>

                    {/* Memory */}
                    <Grid item xs={12} className="gcp-form-control">
                      <Box className="flex items-center justify-between">
                        <Typography variant="body2">Memory</Typography>
                        <Chip 
                          label={`${formik.values.memoryGB} GB`} 
                          size="small" 
                          color="primary" 
                          variant="outlined"
                        />
                      </Box>
                      <Slider
                        name="memoryGB"
                        min={1}
                        max={16}
                        step={1}
                        marks
                        value={formik.values.memoryGB}
                        onChange={(_, value) => formik.setFieldValue('memoryGB', value)}
                        aria-labelledby="memory-slider"
                        sx={{ mt: 2, color: 'primary.main' }}
                      />
                      {formik.touched.memoryGB && formik.errors.memoryGB && (
                        <FormHelperText error>{formik.errors.memoryGB}</FormHelperText>
                      )}
                    </Grid>

                    {/* Timeout */}
                    <Grid item xs={12} className="gcp-form-control">
                      <Box className="flex items-center justify-between">
                        <Typography variant="body2">Timeout</Typography>
                        <Chip 
                          label={`${formik.values.timeoutHours} hours`} 
                          size="small" 
                          color="primary" 
                          variant="outlined"
                        />
                      </Box>
                      <Slider
                        name="timeoutHours"
                        min={1}
                        max={24}
                        step={1}
                        marks
                        value={formik.values.timeoutHours}
                        onChange={(_, value) => formik.setFieldValue('timeoutHours', value)}
                        aria-labelledby="timeout-slider"
                        sx={{ mt: 2, color: 'primary.main' }}
                      />
                      {formik.touched.timeoutHours && formik.errors.timeoutHours && (
                        <FormHelperText error>{formik.errors.timeoutHours}</FormHelperText>
                      )}
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Divider sx={{ my: 1 }} />
                      <Typography className="gcp-section-title flex items-center">
                        <InfoOutlinedIcon fontSize="small" sx={{ mr: 1, color: 'info.main' }} />
                        Advanced Options
                      </Typography>
                    </Grid>

                    {/* Additional Options */}
                    <Grid item xs={12} className="gcp-form-control">
                      <TextField
                        fullWidth
                        multiline
                        rows={2}
                        name="additionalOptions"
                        label="Additional Options (JSON format)"
                        variant="outlined"
                        value={formik.values.additionalOptions}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.additionalOptions && Boolean(formik.errors.additionalOptions)}
                        helperText={formik.touched.additionalOptions && formik.errors.additionalOptions}
                      />
                    </Grid>

                    {/* Buttons */}
                    <Grid item xs={12} className="flex justify-end space-x-3">
                      <Button 
                        variant="contained" 
                        color="primary" 
                        type="submit"
                        startIcon={<PlayArrowIcon />}
                      >
                        Generate Config
                      </Button>
                      <Button 
                        variant="outlined" 
                        color="secondary"
                        onClick={() => downloadYaml(formik.values)}
                        disabled={!yamlPreview}
                        startIcon={<SaveAltIcon />}
                      >
                        Download YAML
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </CardContent>
            </Card>
          </Grid>

          {/* YAML Preview */}
          <Grid item xs={12} md={5}>
            <Card className="gcp-card h-full">
              <Box className="gcp-card-header">
                <Typography variant="h6" component="h2" className="font-medium flex items-center">
                  <CodeIcon sx={{ mr: 1, color: 'primary.main' }} fontSize="small" />
                  Configuration Preview
                </Typography>
              </Box>
              <CardContent className="gcp-card-content">
                <Box 
                  component="pre" 
                  className="bg-gray-50 p-4 rounded border border-gray-100 overflow-auto h-[500px] whitespace-pre-wrap text-sm font-mono"
                  sx={{ 
                    fontFamily: '"Google Sans Mono", "Roboto Mono", monospace',
                    fontSize: '13px',
                  }}
                >
                  {yamlPreview || 'Fill out the form to generate YAML configuration.'}
                </Box>
                {yamlPreview && (
                  <Box mt={2} className="flex justify-end">
                    <Button 
                      variant="text" 
                      color="primary"
                      startIcon={<DownloadIcon />}
                      onClick={() => downloadYaml(formik.values)}
                      size="small"
                    >
                      Download Configuration
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        
        <Box className="mt-8 text-center">
          <Typography variant="body2" color="text.secondary">
            Demo of OSS-Fuzz-Gen Experiment Configuration Wizard • 2025
          </Typography>
        </Box>
      </Container>
    </>
  );
};

export default ConfigurationWizard; 