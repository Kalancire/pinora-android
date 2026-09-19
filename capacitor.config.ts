import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.pinora.app',
  appName: 'PINORA',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  }
};

export default config;
