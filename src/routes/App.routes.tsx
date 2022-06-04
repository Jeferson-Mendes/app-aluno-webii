import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import Home from '../screens/home';
import Login from '../screens/login';


import {AuthStackParamList} from './navigation/types';
// import HomeScreen from '../screens/HomeScreen';
// import ConfigScreen from '../screens/ConfigScreen';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();

const AppRoutes: React.FC = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      options={{headerShown: false}}
      // options={{ headerTitleAlign: 'center' }}
      name="SignIn"
      component={Login}
    />

  </AuthStack.Navigator>
);
export default AppRoutes;