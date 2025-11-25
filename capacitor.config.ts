import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.cvd.inspect',
  appName: 'CVD Inspect',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
