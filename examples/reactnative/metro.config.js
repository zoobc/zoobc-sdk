/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

module.exports = {
  // resolver: {
  //   extraNodeModules: {
  //     buffer: require.resolve('buffer'),
  //     http: require.resolve('stream-http'),
  //     https: require.resolve('https-browserify'),
  //     url: require.resolve('url'),
  //     events: require.resolve('events'),
  //     process: require.resolve('process/browser.js'),
  //   },
  // },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};
