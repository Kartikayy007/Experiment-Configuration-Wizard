export const projects = [
  { id: "openssl", name: "OpenSSL" },
  { id: "sqlite", name: "SQLite" },
  { id: "libxml2", name: "libxml2" },
  { id: "curl", name: "cURL" },
  { id: "libpng", name: "libpng" },
  { id: "libjpeg", name: "libjpeg" },
  { id: "zlib", name: "zlib" },
  { id: "libgit2", name: "libgit2" },
];

export const fuzzers = [
  { id: "libfuzzer", name: "libFuzzer" },
  { id: "afl", name: "AFL++" },
  { id: "honggfuzz", name: "Honggfuzz" },
  { id: "jazzer", name: "Jazzer" },
];

export const mutationStrategies = [
  { id: "default", name: "Default" },
  { id: "aggressive", name: "Aggressive" },
  { id: "conservative", name: "Conservative" },
];

export interface ExperimentConfig {
  project: string;
  fuzzer: string;
  mutationStrategy: string;
  cpuCores: number;
  memoryGB: number;
  timeoutHours: number;
  additionalOptions?: string;
} 