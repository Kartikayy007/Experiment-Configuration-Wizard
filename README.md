# OSS-Fuzz-Gen Experiment Configuration Wizard

A React-based configuration wizard for OSS-Fuzz-Gen fuzzing experiments. This tool allows researchers to easily configure and set up fuzzing experiments without manually editing YAML/JSON files.

## Features

- **Project/Fuzzer Selection**: Choose from available projects (OpenSSL, SQLite, etc.) and fuzzers (libFuzzer, AFL++, etc.)
- **Resource Allocation**: Set CPU cores, memory, and timeout for your experiments
- **Configuration Preview**: See a real-time YAML configuration preview
- **Export to YAML**: Generate and download a ready-to-use YAML configuration file

## Technologies Used

- React with TypeScript
- Vite for fast development
- Tailwind CSS for styling
- Material-UI for UI components
- Formik for form handling
- Yup for validation

## Getting Started

### Prerequisites

- Node.js 16+ and npm

### Installation

1. Clone the repository
2. Install dependencies:
```
npm install
```

3. Start the development server:
```
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. Select a project and fuzzer from the dropdown menus
2. Adjust resource settings (CPU, memory, timeout) using the sliders
3. Choose a mutation strategy
4. Add any additional options in JSON format if needed
5. Click "Generate Config" to see the YAML preview
6. Click "Download YAML" to save the configuration file

## About

This wizard is part of the Google Summer of Code (GSoC) 2025 project under DeepMind, aimed at improving the usability of OSS-Fuzz-Gen by streamlining experiment execution and reporting.

## License

MIT
