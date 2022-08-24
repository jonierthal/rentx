import React from 'react';
import { BackButton } from '../../components/BackButton';


import {
 Container,
 Header
} from './styles';

export function CarDetail(){
    return (
       <Container>
            <Header>
                <BackButton color="black" />
            </Header>
       </Container>
    );
}