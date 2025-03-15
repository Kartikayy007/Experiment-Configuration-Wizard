import yaml from 'js-yaml';
import { ExperimentConfig } from '../data/fuzzerData';

export const generateYaml = (config: ExperimentConfig): string => {
  const yamlConfig = {
    experiment: {
      project: config.project,
      fuzzer: config.fuzzer,
      resources: {
        cpu_cores: config.cpuCores,
        memory_gb: config.memoryGB,
        timeout_hours: config.timeoutHours
      },
      fuzzer_options: {
        mutation_strategy: config.mutationStrategy,
        ...(config.additionalOptions ? { additional_options: config.additionalOptions } : {})
      }
    }
  };
  
  return yaml.dump(yamlConfig, { indent: 2 });
};

export const downloadYaml = (config: ExperimentConfig, filename = 'experiment-config.yaml'): void => {
  const yamlContent = generateYaml(config);
  const blob = new Blob([yamlContent], { type: 'text/yaml' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  
  URL.revokeObjectURL(url);
  document.body.removeChild(a);
}; 