import React, {  useEffect } from 'react';

import { createStackNavigator } from '@react-navigation/stack';

import SplashScreen from './splash-screen/SplashScreen';
import SignInScreen from './sign-in-screen/SignInScreen';
import SignUpScreen from './sign-up-screen/SignUpScreen';

const RootStack = createStackNavigator();

const RootStackScreen = ({navigation}) => {
    return (
        <RootStack.Navigator headerMode='none'>
            <RootStack.Screen name="SplashScreen" component={SplashScreen}/>
            <RootStack.Screen name="SignInScreen" component={SignInScreen}/>
            <RootStack.Screen name="SignUpScreen" component={SignUpScreen}/>
        </RootStack.Navigator>
    )
};

export default RootStackScreen;