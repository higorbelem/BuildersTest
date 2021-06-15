import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {Provider} from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import store from '../store';

import Main from '../screens/Main';

const stackRoutes = createStackNavigator();

const Routes = () => {
    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <NavigationContainer>
                    <stackRoutes.Navigator
                        headerMode="none"
                    >
                        <stackRoutes.Screen 
                            name="Main"
                            component={Main}
                        />
                    </stackRoutes.Navigator>
                </NavigationContainer>
            </SafeAreaProvider>
        </Provider>
    )
}

export default Routes;