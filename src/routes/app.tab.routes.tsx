import React from "react";
import { createBottomTabNavigator  } from '@react-navigation/bottom-tabs';

import { AppStackRoutes } from "./app.stack.routes";
import { Home } from '../Screens/Home';
import { MyCars } from '../Screens/MyCars';

const { Navigator, Screen } = createBottomTabNavigator();

export function AppTabRoutes(){
    return(
        <Navigator screenOptions={{
            headerShown: false,
        }}>
            <Screen
                name="Home"
                component={AppStackRoutes}               
            />
            <Screen
                name="Profile"
                component={Home}               
            />
            <Screen
                name="MyCars"
                component={MyCars}
            />
        </Navigator>
    );
}