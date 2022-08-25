import React from 'react';

import { BackButton } from '../../components/BackButton';
import { ImageSlider } from '../../components/ImageSlider';


import {
 Container,
 Header,
 <CarImages>
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
       </Container>
    );
}