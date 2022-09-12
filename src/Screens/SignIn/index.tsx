import React, { useState } from 'react';
import { 
    Alert,
    StatusBar,
    Keyboard,
    KeyboardAvoidingView, //usado para movimentar os elementos em tela quando o teclado sobe
    TouchableWithoutFeedback //server para fechar o teclado apertando em qualquer lugar da tela
} from 'react-native';
import * as Yup from 'yup'; // biblioteca para valição de formulário
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

    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');

    async function handleSignIn(){
        try{
            const schema = Yup.object().shape({ //definindo a forma de validação
                email: Yup.string() //validando email como requirido e no formato correto
                    .required('E-mail obrigatório')
                    .email('Digite um e-mail válido'),
                password: Yup.string()
                    .required('A senha é obrigatória') // definindo a senha como obrigatória
            });
    
            await schema.validate({ email, password }) //validando o email e password passado no estado
            Alert.alert('Tudo certo');
        }catch(error){
            if(error instanceof Yup.ValidationError){
                Alert.alert('Opa',error.message);
            } else {
                Alert.alert(
                    'Erro na autenticação',
                    'Ocorreu um erro ao fazer login, verifique as credenciais'
                )
            }
        }
    }

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
                            onChangeText={setEmail} 
                            value={email}
                        />
                        <PasswordInput
                            iconName="lock"
                            placeholder="Senha"
                            onChangeText={setPassword}
                            value={password}
                        />
                    </Form>
                    <Footer>
                        <Button 
                            title="Login"
                            onPress={handleSignIn}
                            enabled={true}    
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