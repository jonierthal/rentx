import React from 'react';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';
import { Acessory } from '../../components/Acessory';

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
 Acessories
} from './styles';

export function CarDetail(){
    return (
       <Container>
            <Header>
                <BackButton color="black" />
            </Header>

            <CarImages>
                <ImageSlider 
                    imagesUrl={['https://img2.gratispng.com/20181115/lej/kisspng-2-18-bmw-m4-coupe-car-2-19-bmw-m4-coupe-bmw-m4-con-pembroke-pines-bmw-i-xdrive-for-sale-in-pembroke-p-5bedce66755684.7137571115423115264806.jpg']}
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
       </Container>
    );
}