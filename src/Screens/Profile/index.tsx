import { useNavigation } from '@react-navigation/core';
import React from 'react';
import { BackButton } from '../../components/BackButton';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';

import {
 Container,
 Header,
 HeaderTop,
 HeaderTitle,
 LogoutButton,
 PhotoContainer,
 Photo,
 PhotoButton
} from './styles';

export function Profile(){
    const theme = useTheme();
    const navigation = useNavigation();

    function handleBack() {
        navigation.goBack();
    }

    function handleSignOut() {
    }

    return (
       <Container>
        <Header>
            <HeaderTop>
                <BackButton 
                    color={theme.colors.shape} 
                    onPress={handleBack}
                />
                <HeaderTitle>Editar Perfil</HeaderTitle>
                <LogoutButton onPress={handleSignOut}>
                    <Feather 
                        name="power" 
                        color={theme.colors.shape} 
                        size={24}
                    />
                </LogoutButton>
            </HeaderTop>
            <PhotoContainer>
                <Photo source={{ uri: 'https://avatars.githubusercontent.com/u/80595367?v=4' }} />
                <PhotoButton onPress={() => {}} >
                    <Feather 
                        name="camera"
                        color={theme.colors.shape}
                        size={24}
                    />
                </PhotoButton>
            </PhotoContainer>
        </Header>
       </Container>
    );
}