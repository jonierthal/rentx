import React from 'react';
import { 
    StatusBar,
    Keyboard,
    KeyboardAvoidingView, //usado para movimentar os elementos em tela quando o teclado sobe
    TouchableWithoutFeedback //server para fechar o teclado apertando em qualquer lugar da tela
} from 'react-native';
import { useTheme } from 'styled-components';

import { Button } from '../../components/Button'; 
import { Input } from '../../components/Input'; 
import { PasswordInput } from '../../components/PasswordInput'; 

import {
 Container,
 Header,
 Title,
 SubTitle,
 Form,
 Footer,
} from './styles';

export function SignIn(){
    const theme = useTheme();

    return ( //o behavior="position" muda a posição do restante da tela quando o tecado abre
        <KeyboardAvoidingView behavior="position" enabled> 
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
                <Container>
                    <StatusBar 
                        barStyle="dark-content"
                        backgroundColor="transparent"
                        translucent
                    />
                    <Header>
                        <Title>Estamos{'\n'}quase lá.</Title>
                        <SubTitle>
                            Faça seu login para começar{'\n'}
                            uma experiência incrível.
                        </SubTitle>
                    </Header>
                    <Form>
                        <Input
                            iconName="mail"
                            placeholder="E-mail"
                            keyboardType="email-address"
                            auto-correct={false}
                            autoCapitalize="none"
                        />
                        <PasswordInput
                            iconName="lock"
                            placeholder="Senha"
                        />
                    </Form>
                    <Footer>
                        <Button 
                            title="Login"
                            onPress={() => {}}
                            enabled={false}    
                            loading={false}
                        />
                        <Button 
                            title="Criar conta gratuita"
                            onPress={() => {}}
                            enabled={false}    
                            loading={false}
                            color={theme.colors.background_secondary}
                            light // mesma coisa que passar {true}
                        />
                    </Footer>
            </Container>
        </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
    );
}