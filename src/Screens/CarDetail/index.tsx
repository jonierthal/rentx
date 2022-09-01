import React from 'react';
import { ParamListBase, NavigationProp, useNavigation } from '@react-navigation/native';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Acessory } from '../../components/Acessory';
import { Button } from '../../components/Button';

import speedSvg from '../../assets/speed.svg';
import accelerationSvg from '../../assets/acceleration.svg';
import forceSvg from '../../assets/force.svg';
import gasolineSvg from '../../assets/gasoline.svg';
import exchangeSvg from '../../assets/exchange.svg';
import peopleSvg from '../../assets/people.svg';


import {
 Container,
 Header,
 CarImages,
 Content,
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


export function CarDetail(){
    const navigation = useNavigation<NavigationProp<ParamListBase>>();

    function handleConfirmRental() {
        navigation.navigate('Scheduling')
    }

    return (
       <Container>
            <Header>
                <BackButton color="black" />
            </Header>

            <CarImages>
                <ImageSlider 
                    imagesUrl={['https://cdn.motor1.com/images/mgl/kNREB/s3/lamborghini-huracan-sto.jpg']}
                />
            </CarImages>

            <Content>
                <Details>
                    <Description>
                        <Brand>Lamborghini</Brand>
                        <Name>Huracan</Name>
                    </Description>

                    <Rent>
                        <Period>Ao dia</Period>
                        <Price>R$ 580</Price>
                    </Rent>
                </Details>

                <Acessories>
                    <Acessory name="380Km/h" icon={speedSvg}/>  
                    <Acessory name="3.2s" icon={accelerationSvg}/> 
                    <Acessory name="800 HP" icon={forceSvg}/> 
                    <Acessory name="Gasolina" icon={gasolineSvg}/> 
                    <Acessory name="Auto" icon={exchangeSvg}/> 
                    <Acessory name="2 pessoas" icon={peopleSvg}/>   
                </Acessories>
                <About>
                    Este automóvel é desportivo. Surgiu do lendário touro de lide indultado
                    na praça Real Maestrenza de Sevilla.
                    É um belíssimo carro para quem gosta de acelerar.
                </About>
            </Content>
            <Footer>
                <Button title="Escolher período do aluguel" onPress={handleConfirmRental}/>
            </Footer>
       </Container>
    );
}