import React, { useEffect } from 'react';
import { Alert, Dimensions, Platform, SafeAreaView, StatusBar, StyleSheet, Text, View } from 'react-native';
import { Provider } from 'react-redux';
import AppNavigator from './Apps/Navigation/AppNavigator';
import { LoadingSpinner } from './Apps/Components/LoadingSpinner';
import { store, persistor } from './Apps/Redux/Store';
import { PersistGate } from 'redux-persist/integration/react';

const App: React.FC = () => {
  const { height: WINDOW_HEIGHT, width: WINDOW_WIDTH } = Dimensions.get('window');
  const { height: SCREEN_HEIGHT } = Dimensions.get('screen');
  
  const getStatusBarHeight = () => {
    if (Platform.OS === 'ios') {
      return WINDOW_HEIGHT !== SCREEN_HEIGHT ? 20 : 0; // Fallback for iOS
    } else if (Platform.OS === 'android') {
      return StatusBar.currentHeight || 0;
    }
    return 0;
  };

  const statusBarHeight = getStatusBarHeight();

  // https://fake-users.free.beeceptor.com/api/dynamic-form


  return (
    <View style={[styles.contentContainer,{paddingTop:statusBarHeight}]}>
      <StatusBar barStyle="light-content" backgroundColor="#007AFF" />
      <Provider store={store}>
        <PersistGate loading={<LoadingSpinner />} persistor={persistor}>
          <AppNavigator />
        </PersistGate>
      </Provider>
    </View>
  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    // height: '100%',
    width: '100%',  // Make sure it covers the full width
    backgroundColor: '#fff', // Optional: can change the color to suit your design
  },
});

export default App;