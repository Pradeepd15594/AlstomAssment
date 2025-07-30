import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { CardStyleInterpolators, createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import Dashboard from '../Screens/Dashboard';
import AlbumDetails from '../Screens/AlbumDetails';
import { StackParamList } from './Screens';
import { LoadingSpinner } from '../Components/LoadingSpinner';
import { ActivityIndicator, Alert, Text, View } from 'react-native';
import Orientation from 'react-native-orientation-locker';
import { useDispatch } from 'react-redux';
import { setOrientation } from '../Redux/Slices/AuthSlice';


export const Loading=()=>{
  return (
    <View style={{flexGrow:1, justifyContent:'center', alignItems:'center'}}>
          <ActivityIndicator color={'red'} size={'large'} />
          <Text style={{paddingTop:10}}>Loading...</Text>
      </View>
  )
}

const AppNavigator: React.FC = () => {
  const dispatch=useDispatch();
    const Stack = createStackNavigator<StackParamList>();
    const NAVIGATOR_OPTION: StackNavigationOptions = {
        headerShown: false,
        gestureDirection: 'horizontal',
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
    }
    const SCREEN_OPTION = {
      headerShown: false
    }

     useEffect(() => {
        console.log('useEffect');
        // Allow all orientations
        // Orientation.unlockAllOrientations();

        // Listen to orientation changes
        const orientationChange:any = Orientation.addOrientationListener((orientation:any) => {
          dispatch(setOrientation(orientation.includes('PORTRAIT') ? 'PORTRAIT' : 'LANDSCAPE'));
        });
        return () => {
          // orientationChange.remove();
        };
    
      }, []);

  return (
    <NavigationContainer fallback={<Loading />}>
      <Stack.Navigator
        initialRouteName="Dashboard"
        screenOptions={NAVIGATOR_OPTION}
      >
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={SCREEN_OPTION}
        />

        <Stack.Screen
          name="AlbumDetails"
          component={AlbumDetails}
          options={SCREEN_OPTION}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;