import typescript from 'rollup-plugin-typescript2';
import commonjs from '@rollup/plugin-commonjs';
import { terser } from 'rollup-plugin-terser';
import size from 'rollup-plugin-size';
import resolve from '@rollup/plugin-node-resolve';
import pkg from './package.json';

const commonjsPulgin = () => {
  return commonjs({
    extensions: ['.js', '.ts'],
    namedExports: {
      './grpc/model/transaction_pb': ['GetTransactionsRequest', 'GetTransactionRequest', 'PostTransactionRequest', 'GetTransactionMinimumFeeRequest', 'TransactionType'],
      './grpc/model/pagination_pb': ['Pagination', 'OrderBy'],
      './grpc/model/mempool_pb': ['GetMempoolTransactionsRequest', 'GetMempoolTransactionRequest'],
      './grpc/model/accountBalance_pb': ['GetAccountBalanceRequest'],
      './grpc/model/empty_pb': ['Empty'],
      './grpc/model/proofOfOwnership_pb': ['GetProofOfOwnershipRequest'],
      './grpc/model/auth_pb': ['RequestType'],
      './grpc/model/nodeHardware_pb': ['GetNodeHardwareRequest'],
      './grpc/model/node_pb': ['GenerateNodeKeyRequest'],
      './grpc/model/nodeRegistration_pb': ['GetNodeRegistrationRequest', 'GetNodeRegistrationsRequest', 'NodeAddress'],
      './grpc/model/escrow_pb.js': ['GetEscrowTransactionsRequest', 'GetEscrowTransactionRequest'],
      './grpc/model/block_pb.js': ['GetBlocksRequest', 'GetBlockRequest'],
    }
  })
}

const typescriptPlugin = () => typescript({ typescript: require('typescript'), useTsconfigDeclarationDir: true })

const external = [
  ...Object.keys(pkg.dependencies || {}),
];

export default [
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/zoobc-sdk.mjs',
      format: 'es',
      sourcemap: true,
    },
    external,
    plugins: [typescriptPlugin(), resolve(), commonjsPulgin()],
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/zoobc-sdk.development.js',
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
    },
    external,
    plugins: [typescriptPlugin(), resolve(), commonjsPulgin()],
  },
  {
    input: 'src/index.ts',
    output: {
      file: 'dist/zoobc-sdk.production.min.js',
      format: 'cjs',
      sourcemap: true,
      exports: 'named',
    },
    external,
    plugins: [
      typescriptPlugin(),
      resolve(),
      commonjsPulgin(),
      terser({
        sourcemap: true,
        output: { comments: false }
      }),
      size()
    ],
  },
]
