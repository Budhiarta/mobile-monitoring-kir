const { createMetroConfiguration } = require('expo-router/metro');

module.exports = async () => {
  const config = await createMetroConfiguration(__dirname);

  config.transformer = {
    ...config.transformer,
    babelTransformerPath: require.resolve('react-native-css-interop/metro'),
  };

  return config;
};
