import React from "react";
import { createStackNavigator  } from '@react-navigation/stack';

import { Home } from '../Screens/Home';
import { CarDetail } from '../Screens/CarDetail';
import { Scheduling } from '../Screens/Scheduling';
import { SchedulingDetails } from '../Screens/SchedulingDetails';
import { Confirmation } from '../Screens/Confirmation';
import { MyCars } from '../Screens/MyCars';
import { Splash } from '../Screens/Splash';
import { SignIn } from '../Screens/SignIn';
import { SignUpFirstStep } from '../Screens/SignUp/SignUpFirstStep'
import { SignUpSecondStep } from '../Screens/SignUp/SignUpSecondStep'

const { Navigator, Screen } = createStackNavigator();

export function StackRoutes(){
    return(
        <Navigator 
        initialRouteName="SignIn"
        screenOptions={{
            headerShown: false,
        }}>
            <Screen
                name="SignIn"
                component={SignIn}               
            />
            <Screen
                name="SignUpFirstStep"
                component={SignUpFirstStep}               
            />
            <Screen
                name="SignUpSecondStep"
                component={SignUpSecondStep}               
            />
            <Screen
                name="Home"
                component={Home}
                options={{
                    gestureEnabled: false,
                }}
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