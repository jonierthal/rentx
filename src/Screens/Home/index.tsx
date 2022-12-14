import React, { useEffect, useState } from 'react';
import { StatusBar } from 'react-native';
import { RFValue} from 'react-native-responsive-fontsize';
import { ParamListBase, NavigationProp, useNavigation } from '@react-navigation/native';
import { useNetInfo } from '@react-native-community/netinfo';
import { synchronize } from '@nozbe/watermelondb/sync'; 
import { database } from '../../databases';
import { Car as ModelCar } from '../../databases/model/Car';

import Logo from '../../assets/logo.svg';
import { api } from '../../services/api';
import { CarDTO } from '../../dtos/CarDTO';

import { Car } from '../../components/Car';
import { LoadAnimation } from '../../components/LoadAnimation';

import {
 Container,
 Header,
 HeaderContent,
 TotalCars,
 CarList,
} from './styles';

export function Home(){
    const [cars, setCars] = useState<ModelCar[]>([]);
    const [loading, setLoading] = useState(true);

    const netInfo = useNetInfo();
    const navigation = useNavigation<NavigationProp<ParamListBase>>();


    function handleCarDetails(car: CarDTO) {
        navigation.navigate('CarDetail', { car })
    }

    async function offlineSynchronize(){
        await synchronize({ //retorna um objeto que mostra os registros novos, registros que sofreram alguma atualização, registros deletados e quando foi a ultima sincronização
            database,
            pullChanges: async({ lastPulledAt }) => {
                const response = await api
                .get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`);

                const { changes, latestVersion } = response.data;
                return { changes, timestamp: latestVersion }
                
            }, //busca atualizações do lado do servidor
            pushChanges: async({ changes }) => {
                const user = changes.user;
                await api.post('/users/sync',user);
            },//enviar as mudanças para o back end
        });
    }

    useEffect(() => {
        let isMounted = true;

        async function fetchCars() {
            try{
                const carCollection = database.get<ModelCar>('cars');
                const cars = await carCollection.query().fetch();

                if(isMounted){
                    setCars(cars);
                }
            } catch (error){
                console.log(error);
            } finally {
                if(isMounted){
                    setLoading(false);
                }
            }
        }

      fetchCars();
      return () => {
        isMounted = false;
      };
    }, []);

    useEffect(() => {
        if(netInfo.isConnected === true){
            offlineSynchronize();
        }
    }, [netInfo.isConnected])


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
                    {
                        !loading &&
                        <TotalCars>
                            Total de {cars.length} carros
                        </TotalCars>
                    }
                </HeaderContent>
            </Header>
            { loading ? <LoadAnimation /> : 
                <CarList
                    data={cars}
                    keyExtractor={item => item.id}
                    renderItem={({ item }) => 
                    <Car data={item} onPress={() => handleCarDetails(item)}/>
                    }
                />
            }

       </Container>
       
    );
}

