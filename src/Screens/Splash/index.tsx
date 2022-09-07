import React, {useEffect} from 'react';

import BrandSvg from '../../assets/brand.svg';
import LogoSvg from '../../assets/logo.svg';

import Animated, { 
    useSharedValue, 
    useAnimatedStyle,
    withTiming,
    Easing,
    interpolate,
    Extrapolate,
    runOnJS
} from 'react-native-reanimated';

import {
 Container
} from './styles';
import { NavigationProp, ParamListBase, useNavigation } from '@react-navigation/native';


export function Splash(){
    const SplashAnimation = useSharedValue(0);

    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    const brandStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(SplashAnimation.value, [0,50],[1, 0]),
            transform: [
                {
                    translateX: interpolate(SplashAnimation.value,
                        [0,50],
                        [0,-50],
                        Extrapolate.CLAMP
                        )
                }
            ]
        }
    });

    
    const logoStyle = useAnimatedStyle(() => {
        return {
            opacity: interpolate(SplashAnimation.value,[0,25,50],[0, .3, 1]),
            transform: [
                {
                    translateX: interpolate(SplashAnimation.value,
                        [0,50],
                        [-50,0],
                        Extrapolate.CLAMP    
                    )
                }
            ]
        }
    });

    useEffect(() => {
        SplashAnimation.value = withTiming(
            50,
            { duration: 2000 },
            () => {
                'worklet'
                runOnJS(startApp)();
            }
        );
    },[]);

    function startApp(){
        navigation.navigate('Home');
    }

    return (
       <Container>
            <Animated.View style={[brandStyle, {position: 'absolute'}]}>
                <BrandSvg width={80} height={50} />
            </Animated.View>

            <Animated.View style={[logoStyle, {position: 'absolute'}]}>
                <LogoSvg width={180} height={20} />
            </Animated.View>
       </Container>
    );
}
