import React from 'react';
import { Feather } from '@expo/vector-icons';

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
 Acessories,
 Footer,
 RentalPeriod,
 CalendarIcon,
 DateInfo,
 DateTitle,
 DateValue,
 RentalPrice,
 RentalPriceLabel,
 RentalPriceDetails,
 RentalPriceQuota,
 RentalPriceTotal,
} from './styles';

import { useTheme } from 'styled-components';
import { RFValue } from 'react-native-responsive-fontsize';

export function SchedulingDetails(){
    const theme = useTheme();
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
                
                <RentalPeriod>
                    <CalendarIcon>
                        <Feather
                            name="calendar"
                            size={RFValue(24)}
                            color={theme.colors.shape}
                        />
                    </CalendarIcon>

                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue>18/06/2021</DateValue>
                    </DateInfo>

                    <Feather
                            name="chevron-right"
                            size={RFValue(10)}
                            color={theme.colors.text}
                    />

                    <DateInfo>
                        <DateTitle>DE</DateTitle>
                        <DateValue>18/06/2021</DateValue>
                    </DateInfo>
                </RentalPeriod>

                <RentalPrice>
                    <RentalPriceLabel>TOTAL</RentalPriceLabel>
                    <RentalPriceDetails>
                        <RentalPriceQuota>R$ 580 x3 diárias </RentalPriceQuota>
                        <RentalPriceTotal>R$ 2.900 </RentalPriceTotal>
                    </RentalPriceDetails>
                </RentalPrice>
            </Content>
            <Footer>
                <Button title="Alugar Agora" color={theme.colors.success}/>
            </Footer>
       </Container>
    );
}