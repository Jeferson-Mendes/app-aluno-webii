import { useNavigation } from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, { useContext } from 'react';
import { AuthContext } from '../contexts/auth';
import AddMatter from '../screens/addMatter';
import AddMeet from '../screens/addMeet';
import EditMatter from '../screens/editMatter';
import EditMeet from '../screens/editMeet';
import Home from '../screens/home';
import Login from '../screens/login';


import {AuthStackParamList} from './navigation/types';
// import HomeScreen from '../screens/HomeScreen';
// import ConfigScreen from '../screens/ConfigScreen';

const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const AuthRoutes: React.FC = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        options={{ headerTitleAlign: 'center' }}
        name="Home"
        component={Home}
      />

      <AuthStack.Screen
        options={{ headerTitleAlign: 'center' }}
        name="Criar Encontro"
        component={AddMeet}
      />

      <AuthStack.Screen
        options={{ headerTitleAlign: 'center' }}
        name="Criar Assunto"
        component={AddMatter}
      />

      <AuthStack.Screen
        options={{ headerTitleAlign: 'center' }}
        name="Editar Assunto"
        component={EditMatter}
      />

      <AuthStack.Screen
        options={{ headerTitleAlign: 'center' }}
        name="Editar Encontro"
        component={EditMeet}
      />
  
    </AuthStack.Navigator>
  );
} 
export default AuthRoutes;