import React from 'react';
import Animated, { useSharedValue, useAnimatedStyle } from 'react-native-reanimated';
import { Button, StyleSheet } from 'react-native';

import {
 Container
} from './styles';

export function Splash(){
    const animation = useSharedValue(0);

    const animatedStyles = useAnimatedStyle(() =>{
        return {
            transform: [{ translateY: animation.value}]
        }
    });

    function handleAnimationPosition(){
        animation.value = Math.random() * 1000;
    }

    return (
       <Container>
            <Animated.View style={[styles.box, animatedStyles]} />

            <Button title="Mover" onPress={handleAnimationPosition} />
       </Container>
    );
}

const styles = StyleSheet.create({
    box: {
        width: 100,
        height: 100,
        backgroundColor: 'red',
    }
})