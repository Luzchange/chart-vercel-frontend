import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'mil.health.chartplus',
  appName: 'CHART+',
  webDir: 'out',
  backgroundColor: '#0f172a',
  server: {
    androidScheme: 'https',
  },
};

export default config;
