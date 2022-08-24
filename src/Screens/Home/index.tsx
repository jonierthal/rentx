import React from 'react';
import { StatusBar } from 'react-native';
import { RFValue} from 'react-native-responsive-fontsize';

import Logo from '../../assets/logo.svg';

import { Car } from '../../components/Car';

import {
 Container,
 Header,
 HeaderContent,
 TotalCars,
 CarList
} from './styles';

export function Home(){
    const CarData = {
        brand: 'Audi',
        name: 'RS 5 Coupé',
        rent:{
            period: 'AO DIA',
            price: 120,
        },
        thumbnail: 'https://img2.gratispng.com/20181115/lej/kisspng-2-18-bmw-m4-coupe-car-2-19-bmw-m4-coupe-bmw-m4-con-pembroke-pines-bmw-i-xdrive-for-sale-in-pembroke-p-5bedce66755684.7137571115423115264806.jpg' 
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

            <CarList
                data={[1,2,3,4,5,6,7]}
                keyExtractor={item => String(item)}
                renderItem={({ item }) => <Car data={CarData} />}
            />
                
             
       </Container>
    );
}