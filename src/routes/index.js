import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import store from '../store';
import Drawer from './drawer';

const Routes = () => {
    return (
        <Provider store={store}>
            <SafeAreaProvider>
                <NavigationContainer>
                    <Drawer />
                </NavigationContainer>
            </SafeAreaProvider>
        </Provider>
    )
}

export default Routes;