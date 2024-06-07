import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginForm from './android/app/src/pages/Login/LoginForm';
import SignUpForm from './android/app/src/pages/Cadastro/SignUpForm';
import Home from './android/app/src/pages/Home/Home';
import ForgotPassword from './android/app/src/pages/Esqueceu a Senha/ForgotPassword';
import { StatusBar, View } from 'react-native';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <View>
        <StatusBar translucent backgroundColor="transparent" />
      </View>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="LoginForm" component={LoginForm} options={{ headerShown: false }}/>
        <Stack.Screen name="SignUp" component={SignUpForm} options={{ headerShown: false }}/>
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} options={{ headerShown: false }}/>
        <Stack.Screen name="Home" component={Home} options={{ headerShown: false }}/>
      </Stack.Navigator>
    </NavigationContainer>
)}



