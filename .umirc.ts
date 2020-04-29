import { defineConfig } from 'umi';
const path = require('path');

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  alias: {
    '@': path.resolve(__dirname, 'src'),
  },
  devServer: {
    port: 8001,
  },
});
