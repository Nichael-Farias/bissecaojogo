
import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.9c8bf4f7ccac4415adb938cb6e753147',
  appName: 'bissecaojogo',
  webDir: 'dist',
  server: {
    url: "https://9c8bf4f7-ccac-4415-adb9-38cb6e753147.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
  android: {
    buildOptions: {
      keystorePath: undefined,
      keystoreAlias: undefined,
      keystorePassword: undefined,
      keystoreAliasPassword: undefined,
      signingType: "apksigner"
    }
  }
};

export default config;
