import React from "react";
import { createStackNavigator  } from '@react-navigation/stack';

import { Home } from '../Screens/Home';
import { CarDetail } from '../Screens/CarDetail';
import { Scheduling } from '../Screens/Scheduling';
import { SchedulingDetails } from '../Screens/SchedulingDetails';
import { Confirmation } from '../Screens/Confirmation';
import { MyCars } from '../Screens/MyCars';

const { Navigator, Screen } = createStackNavigator();

export function AppStackRoutes(){
    return(
        <Navigator 
        initialRouteName="Home"
        screenOptions={{
            headerShown: false,
        }}>
            <Screen
                name="Home"
                component={Home}
            />
            <Screen
                name="CarDetail"
                component={CarDetail}
            />
            <Screen
                name="Scheduling"
                component={Scheduling}
            />
            <Screen
                name="SchedulingDetails"
                component={SchedulingDetails}
            />
            <Screen
                name="Confirmation"
                component={Confirmation}
            />
            <Screen
                name="MyCars"
                component={MyCars}
            />
        </Navigator>
    );
}