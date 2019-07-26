import typescript from 'rollup-plugin-typescript';
import commonjs from 'rollup-plugin-commonjs';

import pkg from './package.json';

export default {
  input: './src/index.ts',
  output: [
    {
      name: pkg.main,
      file: pkg.main,
      format: 'cjs',
      globals: {
        '@improbable-eng/grpc-web': 'grpcWeb',
        'google-protobuf': 'googleProtobuf',
      },
    },
    {
      file: pkg.module,
      format: 'es',
    },
  ],
  external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
  plugins: [typescript({ module: 'CommonJS' }), commonjs({ extensions: ['.js', '.ts'] })],
};
