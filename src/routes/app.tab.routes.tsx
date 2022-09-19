import React from "react";
import { createBottomTabNavigator  } from '@react-navigation/bottom-tabs';
import { useTheme } from 'styled-components';

import { AppStackRoutes } from "./app.stack.routes";
import { Home } from '../Screens/Home';
import { MyCars } from '../Screens/MyCars';

import HomeSvg from '../assets/home.svg';
import CarSvg from '../assets/car.svg';
import PeopleSvg from '../assets/people.svg';
import { Platform } from "react-native";

const { Navigator, Screen } = createBottomTabNavigator();

export function AppTabRoutes(){
    const theme = useTheme();

    return(
        <Navigator 
            tabBarOptions={{
                activeTintColor: theme.colors.main,
                inactiveTintColor: theme.colors.text_detail,
                showLabel: false,
                style: {
                    paddingVertical: Platform.OS === 'ios' ? 20 : 0,
                    height: 78,
                    backgroundColor: theme.colors.background_primary,
                }
            }}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Screen
                name="Home"
                component={AppStackRoutes}     
                options={{
                    tabBarIcon: (({ color }) =>(
                        <HomeSvg width={24} height={24} fill={color}/>
                    ))
                }}          
            />
            <Screen
                name="MyCars"
                component={MyCars}
                options={{
                    tabBarIcon: (({ color }) =>(
                        <CarSvg width={24} height={24} fill={color}/>
                    ))
                }}  
            />
            <Screen
                name="Profile"
                component={Home}  
                options={{
                    tabBarIcon: (({ color }) =>(
                        <PeopleSvg width={24} height={24} fill={color}/>
                    ))
                }}               
            />
        </Navigator>
    );
}