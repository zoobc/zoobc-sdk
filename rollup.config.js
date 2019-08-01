import resolve from 'rollup-plugin-node-resolve';
import typescript from 'rollup-plugin-typescript';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';

const env = process.env.NODE_ENV;
const pkg = require('./package.json');

export default {
  input: './src/index.ts',
  output: [
    {
      name: pkg.name,
      file: { es: pkg.module, cjs: pkg.main }[env],
      format: env,
      globals: {
        '@improbable-eng/grpc-web': 'grpcWeb',
        'google-protobuf': 'googleProtobuf',
      },
    },
  ],
  external: [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})],
  plugins: [
    resolve(),
    typescript({ module: 'CommonJS' }),
    commonjs({ extensions: ['.js', '.ts'] }),
    filesize(),
  ],
};
