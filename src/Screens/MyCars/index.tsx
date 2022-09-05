import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';
import { ParamListBase, NavigationProp, useNavigation, useRoute } from '@react-navigation/native';

import {
 Container,
 Header,
 Title,
 SubTitle,
 Content,
 Appointments,
 AppointmentsTitle,
 AppointmentsQuantity,
} from './styles';
import { StatusBar, FlatList } from 'react-native';
import { BackButton } from '../../components/BackButton';
import { useTheme } from 'styled-components';
import { Car } from '../../components/Car';

interface CarProps{
    id: string;
    user_id: string;
    car: CarDTO;

}

export function MyCars(){
    const [cars, setCars] = useState<CarProps[]>([]);
    const [loading, setLoading] = useState(true);
    const navigation = useNavigation<NavigationProp<ParamListBase>>();
    const theme = useTheme();

    function handleBack() {
        navigation.goBack();
    }

    useEffect(() => {
        async function fetchCars(){
            try {
                const response = await api.get('/schedules_byuser?user_id=1');
                console.log(response.data);
                setCars(response.data);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        }

        fetchCars();
    },[])

    return (
       <Container>
            <Header>
                    <StatusBar
                        barStyle="light-content"
                        translucent
                        background-color="transparent"
                    />
                    <BackButton 
                        onPress={handleBack}
                        color={theme.colors.shape}
                    />

                    <Title>
                        Seus agendamentos, {'\n'}
                        estão aqui. 
                    </Title>
                    <SubTitle>
                        Conforto, segurança e praticidade.
                    </SubTitle>
            </Header>

            <Content>
                <Appointments>
                    <AppointmentsTitle>Agendamentos Feitos</AppointmentsTitle>
                    <AppointmentsQuantity>05</AppointmentsQuantity>
                </Appointments>

                <FlatList
                    data={cars}
                    keyExtractor={item => item.id}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <Car data={item.car} />
                    )}
                />
            </Content>
       </Container>
    );
}