module.exports = {
  project: {
    android: {
      packageName: 'com.blooddonationapp',
    },
  },
  dependencies: {
    '@react-native-async-storage/async-storage': {
      platforms: {
        android: {
          sourceDir: '../node_modules/@react-native-async-storage/async-storage/android',
          packageImportPath: 'import com.reactnativecommunity.asyncstorage.AsyncStoragePackage;',
        },
      },
    },
    '@react-native-community/netinfo': {
      platforms: {
        android: {
          sourceDir: '../node_modules/@react-native-community/netinfo/android',
          packageImportPath: 'import com.reactnativecommunity.netinfo.NetInfoPackage;',
        },
      },
    },
    'react-native-geolocation-service': {
      platforms: {
        android: {
          sourceDir: '../node_modules/react-native-geolocation-service/android',
          packageImportPath: 'import com.agontuk.RNFusedLocation.RNFusedLocationPackage;',
        },
      },
    },
    'react-native-gesture-handler': {
      platforms: {
        android: {
          sourceDir: '../node_modules/react-native-gesture-handler/android',
          packageImportPath: 'import com.swmansion.gesturehandler.RNGestureHandlerPackage;',
        },
      },
    },
    'react-native-vector-icons': {
      platforms: {
        android: {
          sourceDir: '../node_modules/react-native-vector-icons/android',
          packageImportPath: 'import com.oblador.vectoricons.VectorIconsPackage;',
        },
      },
    },
  },
  assets: ['./src/assets/fonts/', './src/assets/'],
};
