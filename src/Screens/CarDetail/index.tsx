import React from 'react';
import { ParamListBase, NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import { StatusBar } from 'react-native';
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

    const scrollY = useSharedValue(0);

    const headerStyleAnimation = useAnimatedStyle(() => {
        return {
            height: interpolate(
                scrollY.value,
                [0,200],
                [200, 70],
                Extrapolate.CLAMP
            ),
        }
    });

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
                style={[headerStyleAnimation]}
            >
                <Header>
                    <BackButton color="black" onPress={handleBack}/>
                </Header>

                <CarImages>
                    <ImageSlider 
                        imagesUrl={car.photos}
                    />
                </CarImages>
            </Animated.View>

            <Animated.ScrollView
                contentContainerStyle={{
                    paddingHorizontal: 24,
                    paddingTop: getStatusBarHeight(),
                }}
                showsVerticalScrollIndicator={false}
                onScroll={scrollHandler}
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
                <About> {car.about} </About>
                <About> {car.about} </About>
                <About> {car.about} </About>
                <About> {car.about} </About>
            </Animated.ScrollView>
            <Footer>
                <Button title="Escolher período do aluguel" onPress={handleConfirmRental}/>
            </Footer>
       </Container>
    );
}