import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Menu from '../components/Menu';
import Main from '../screens/Main';

const Drawer = createDrawerNavigator();

const MyDrawer = () => {
  return (
    <Drawer.Navigator
        drawerContent={(props) => <Menu/>}
        drawerPosition='right'
    >
            <Drawer.Screen 
                name='Main'
                component={Main}
            />
    </Drawer.Navigator>
  );
}

export default MyDrawer;