import React, { useEffect, useState } from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import { RFValue} from 'react-native-responsive-fontsize';
import { ParamListBase, NavigationProp, useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { RectButton, PanGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler'; //PanGestureHandler -> identifica quando o usuario clicka e arrasta alguma coisa na tela

import Animated, {
    useSharedValue,
    useAnimatedStyle,
    useAnimatedGestureHandler,
    withSpring //serve para lidar com efeitos de fisica
} from 'react-native-reanimated';

const ButtonAnimated = Animated.createAnimatedComponent(RectButton); //pegando o RectButton e dizendo que agora ele é um componente animado

import Logo from '../../assets/logo.svg';
import { api } from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';

import { Car } from '../../components/Car';
import { Load } from '../../components/Load';

import {
 Container,
 Header,
 HeaderContent,
 TotalCars,
 CarList,
} from './styles';
import { useTheme } from 'styled-components';

export function Home(){
    const [cars, setCars] = useState<CarDTO[]>([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation<NavigationProp<ParamListBase>>();
    const theme = useTheme();

    const positionY = useSharedValue(0); //posição vertical (Y) inicia em 0
    const positionX = useSharedValue(0); // posição em Horizontal (X) inicia em 0

    const myCarsButtonStyle = useAnimatedStyle(() => {
        return {
            transform: [ // animação da posição 
                { translateX: positionX.value }, 
                { translateY: positionY.value },
            ]
        }
    });

    const onGestureEvent = useAnimatedGestureHandler({
        onStart(_, ctx: any){ //quando o usuário pressiona e começa a arrastar o elemento pela tela 
            ctx.positionX = positionX.value;
            ctx.positionY = positionY.value;
        },
        onActive(event, ctx: any){ //quando o usuário está arrastando o elemento pela tela
            positionX.value = ctx.positionX + event.translationX; //captura em que ponta da tela está o elemento no eixo X
            positionY.value = ctx.positionY + event.translationY; //captura em que ponta da tela está o elemento no eixo Y
        },
        onEnd(){ //quando o usuário terminou de arrastar o elemento pela tela
            positionX.value = withSpring(0);
            positionY.value = withSpring(0);
        }
    });

    function handleCarDetails(car: CarDTO) {
        navigation.navigate('CarDetail', { car })
    }

    function handleOpenMyCars() {
        navigation.navigate('MyCars');
    }

    useEffect(() => {
      async function fetchCars(){
        try {
            const response = await api.get('/cars');
            setCars(response.data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
      }

      fetchCars();
    }, []);
    

    return (
       <Container>
        <StatusBar
            barStyle="light-content"
            backgroundColor="transparent"
            translucent
        />
            <Header>
                <HeaderContent>
                    <Logo 
                        width={RFValue(108)}
                        height={RFValue(12)}
                    />
                    <TotalCars>
                        Total de {cars.length} carros
                    </TotalCars>
                </HeaderContent>
            </Header>
            { loading ? <Load /> : 
                <CarList
                    data={cars}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => 
                    <Car data={item} onPress={() => handleCarDetails(item)}/>
                    }
                />
            }
            <GestureHandlerRootView >
           
            <PanGestureHandler onGestureEvent={onGestureEvent}> 
                <Animated.View
                    style={[
                        myCarsButtonStyle,
                        {
                            position: 'absolute',
                            bottom: 13,
                            right: 22
                        }
                    ]}
                >
                    <ButtonAnimated 
                        onPress={handleOpenMyCars}
                        style={[styles.button, { backgroundColor: theme.colors.main}]}
                    >
                        <Ionicons 
                            name="ios-car-sport" 
                            size={32}
                            color={theme.colors.shape}
                        />
                    </ButtonAnimated>      
                </Animated.View>   
            </PanGestureHandler> 
            </GestureHandlerRootView>
       </Container>
       
    );
}

const styles = StyleSheet.create({
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

