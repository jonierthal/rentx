import React from 'react';
import { ParamListBase, NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar, StyleSheet } from 'react-native';
import { useTheme } from 'styled-components';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';

import Animated,
    { 
        useSharedValue,
        useAnimatedScrollHandler,
        useAnimatedStyle,
        interpolate,
        Extrapolate
    }
from 'react-native-reanimated';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Acessory } from '../../components/Acessory';
import { Button } from '../../components/Button';

import { getAccessoryIcon } from '../../utils/getAccessoryIcon';
import { CarDTO } from 'src/dtos/CarDTO';

import {
 Container,
 Header,
 CarImages,
 Details,
 Description,
 Brand,
 Name,
 Rent,
 Period,
 Price,
 About,
 Acessories,
 Footer
} from './styles';

interface Params {
    car: CarDTO;
}

export function CarDetail(){
    const navigation = useNavigation<NavigationProp<ParamListBase>>();
    const route = useRoute();
    const { car } = route.params as Params;

    const theme = useTheme();

    const scrollY = useSharedValue(0);

    const headerStyleAnimation = useAnimatedStyle(() => {
        return {
            height: interpolate( //animação na altura do cabeçalho
                scrollY.value,
                [0,200],
                [200, 70],
                Extrapolate.CLAMP
            ),
        }
    });

    const sliderCarStyleAnimation = useAnimatedStyle(() => {
        return {
            opacity: interpolate ( //animação na opacidade do Slider Car
                scrollY.value, //no sentido vertical Y
                [0,150], //iniciando da posição 0 a 150
                [1,0], // posição 0 aplica opacity: 1 - posição 150 aplica opacity: 0;
                Extrapolate.CLAMP //usado para não ultrapassar os limites definidos
            )
        }
    })

    const scrollHandler = useAnimatedScrollHandler(event => {
        scrollY.value = event.contentOffset.y;
        console.log(event.contentOffset.y);
    })

    function handleConfirmRental() {
        navigation.navigate('Scheduling', { car })
    }

    function handleBack() {
        navigation.goBack();
    }

    return (
       <Container>
            <StatusBar 
                barStyle="dark-content"
                translucent
                backgroundColor="transparent"
            />

            <Animated.View
                style={[
                    headerStyleAnimation,
                    styles.header,
                    { backgroundColor: theme.colors.background_secondary }
                ]}
            >
                <Header>
                    <BackButton color="black" onPress={handleBack}/>
                </Header>

                <Animated.View style={sliderCarStyleAnimation}>
                    <CarImages>
                        <ImageSlider 
                            imagesUrl={car.photos}
                        />
                    </CarImages>
                </Animated.View>
            </Animated.View>

            <Animated.ScrollView
                contentContainerStyle={{
                    paddingHorizontal: 24,
                    paddingTop: getStatusBarHeight() + 160,
                }}
                showsVerticalScrollIndicator={false}
                onScroll={scrollHandler}
                scrollEventThrottle={16} //quantos quadros queremos renderizar na hora do scroll 16: para ter 60 quadros por segundo, melhorando a fluidez da animação
            >
                <Details>
                    <Description>
                        <Brand>{car.brand}</Brand>
                        <Name>{car.name}</Name>
                    </Description>

                    <Rent>
                        <Period>{car.rent.period}</Period>
                        <Price>R$ {car.rent.price}</Price>
                    </Rent>
                </Details>

                <Acessories>
                    {
                        car.accessories.map(accessory => (
                            <Acessory 
                                key={accessory.type}
                                name={accessory.name}
                                icon={getAccessoryIcon(accessory.type)}/>
                        ))
                    }  
                </Acessories>
                <About> {car.about} </About>
            </Animated.ScrollView>
            <Footer>
                <Button title="Escolher período do aluguel" onPress={handleConfirmRental}/>
            </Footer>
       </Container>
    );
}

const styles = StyleSheet.create({
    header: {
        position: 'absolute',
        overflow: 'hidden', //se o carro não couber na caixa, esconde o que exceder do header
        zIndex: 1, //para o componete sempre ficar na frent
    }
})