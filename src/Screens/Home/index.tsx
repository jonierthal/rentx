import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { RFValue} from 'react-native-responsive-fontsize';
import { ParamListBase, NavigationProp, useNavigation } from '@react-navigation/native';

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
 CarList
} from './styles';

export function Home(){
    const [cars, setCars] = useState<CarDTO>([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    const CarData = {
        brand: 'Audi',
        name: 'RS 5 Coupé',
        rent:{
            period: 'AO DIA',
            price: 120,
        },
        thumbnail: 'https://img2.gratispng.com/20181115/lej/kisspng-2-18-bmw-m4-coupe-car-2-19-bmw-m4-coupe-bmw-m4-con-pembroke-pines-bmw-i-xdrive-for-sale-in-pembroke-p-5bedce66755684.7137571115423115264806.jpg' 
    }

    function handleCarDetails() {
        navigation.navigate('CarDetail')
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
                        Total de 12 carros
                    </TotalCars>
                </HeaderContent>
            </Header>
            { loading ? <Load /> : 
                <CarList
                    data={cars}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => 
                    <Car data={item} onPress={handleCarDetails}/>
                    }
                />
            }
                
             
       </Container>
    );
}