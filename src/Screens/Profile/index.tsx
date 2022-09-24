import { useNavigation } from '@react-navigation/core';
import React, { useState } from 'react';
import { useAuth } from '../../hooks/auth';
import { BackButton } from '../../components/BackButton';
import { useTheme } from 'styled-components';
import { Feather } from '@expo/vector-icons';
import { Input } from '../../components/Input'
import { PasswordInput } from '../../components/PasswordInput'
import { 
    Keyboard,
    KeyboardAvoidingView, //usado para movimentar os elementos em tela quando o teclado sobe
    TouchableWithoutFeedback //server para fechar o teclado apertando em qualquer lugar da tela
} from 'react-native';
import { useBottomTabBarHeight} from '@react-navigation/bottom-tabs'; //hook para capturar altura da barra do keyboard

import {
 Container,
 Header,
 HeaderTop,
 HeaderTitle,
 LogoutButton,
 PhotoContainer,
 Photo,
 PhotoButton,
 Content,
 Options,
 Option,
 OptionTitle,
 Section
} from './styles';

export function Profile(){
    const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');

    const { user } = useAuth();
    const theme = useTheme();
    const navigation = useNavigation();

    function handleBack() {
        navigation.goBack();
    }

    function handleSignOut() {
    }

    function handleOptionChange(optionSelected: 'dataEdit' | 'passwordEdit') {
        setOption(optionSelected);
    }

    return (
        <KeyboardAvoidingView behavior="position" enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
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

                    <Content style={{ marginBottom: useBottomTabBarHeight() }}>
                        <Options>
                            <Option 
                                active={option === 'dataEdit'}
                                onPress={() => handleOptionChange('dataEdit')}
                            >
                                <OptionTitle active={option === 'dataEdit'}>
                                    Dados
                                </OptionTitle>
                            </Option>
                            <Option 
                                active={option === 'passwordEdit'}
                                onPress={() => handleOptionChange('passwordEdit')}
                            >
                                <OptionTitle active={option === 'passwordEdit'}>
                                    Trocar Senha
                                </OptionTitle>
                            </Option>
                        </Options>
                    {
                        option === 'dataEdit' ?
                        <Section>
                            <Input
                                iconName="user"
                                placeholder="Nome"
                                autoCorrect={false}
                                defaultValue={user.name}
                            />
                            <Input
                                iconName="mail"
                                editable={false}
                                defaultValue={user.email}

                            />
                            <Input
                                iconName="credit-card"
                                placeholder="CNH"
                                keyboardType="numeric"
                                defaultValue={user.driver_license}
                            />
                        </Section>
                        :
                        <Section>
                            <PasswordInput
                                iconName="lock"
                                placeholder="Senha atual"
                            />
                            <PasswordInput
                                iconName="lock"
                                placeholder="Nova senha"
                            />
                            <PasswordInput
                                iconName="lock"
                                placeholder="Repetir senha"
                            />
                        </Section>
                    }
                    </Content>
                </Container>
            </TouchableWithoutFeedback>
       </KeyboardAvoidingView>
    );
}