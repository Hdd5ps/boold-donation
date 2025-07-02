module.exports = {
  project: {
    android: {
      packageName: 'com.blooddonationapp',
    },
  },
  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        android: {
          sourceDir: '../node_modules/react-native-vector-icons/android',
          packageImportPath: 'import io.github.react_native_vector_icons.VectorIconsPackage;',
        },
      },
    },
  },
  assets: ['./src/assets/fonts/', './src/assets/'],
};
