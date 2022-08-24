import React from 'react';
import { StatusBar } from 'react-native';
import { RFValue} from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';

import {
 Container,
 Header,
 HeaderContent,
 TotalCars
} from './styles';

export function Home(){
    const CarDataOne = {
        brand: 'Audi',
        name: 'RS 5 Coupé',
        rent:{
            period: 'AO DIA',
            price: 120,
        },
        thumbnail: 'https://w7.pngwing.com/pngs/964/762/png-transparent-audi-tt-rs-sports-car-compact-car-others-compact-car-roadster-car.png' 
    }

    const CarDataTwo = {
        brand: 'Porsche',
        name: 'Panamera',
        rent:{
            period: 'AO DIA',
            price: 340,
        },
        thumbnail: 'https://w7.pngwing.com/pngs/1014/228/png-transparent-2018-porsche-panamera-car-luxury-vehicle-porsche-911-porsche-compact-car-car-performance-car.png' 
    }

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
                        Total de 12 carros
                    </TotalCars>
                </HeaderContent>
            </Header>

            <Car data={CarDataOne} />
            <Car data={CarDataTwo} />

       </Container>
    );
}