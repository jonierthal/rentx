import React, {useState} from 'react';
import {
    Keyboard,
    KeyboardAvoidingView, //usado para movimentar os elementos em tela quando o teclado sobe
    TouchableWithoutFeedback,
    Alert
} from 'react-native';
import { ParamListBase, NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from 'styled-components';
import { BackButton } from '../../../components/BackButton';
import { Bullet } from '../../../components/Bullet';
import { PasswordInput } from '../../../components/PasswordInput';
import { Button } from '../../../components/Button';
import { api } from '../../../services/api';

import {
 Container,
 Header,
 Steps,
 Title,
 Subtitle,
 Form,
 FormTitle
} from './styles';

interface Params {
    user: {
        name: string;
        email: string;
        driverLicense: string;
    }
}
export function SignUpSecondStep(){
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    const navigation = useNavigation<NavigationProp<ParamListBase>>();
    const route = useRoute();
    const theme = useTheme();

    const { user } = route.params as Params;

    function handleBack(){
        navigation.goBack();
    }

    async function handleRegister() {
        if(!password || !passwordConfirm){
            return Alert.alert('Informa a senha e a confirmação.')
        }

        if(password != passwordConfirm){
            return Alert.alert('As senhas não são iguais.')
        }

        await api.post('/users',{
            name: user.name,
            email:user.email,
            driver_license: user.driverLicense,
            password
        })
        .then(() => {
            navigation.navigate('Confirmation', {
                title: 'Conta criada!',
                message: `Agora é só fazer login\n e aproveitar.`,
                nextScreenRoute: 'SignIn'
            });
        })
        .catch(() => {
            Alert.alert('Opa', 'Não foi possível cadastrar');
        }); 
    }

    return (
        <KeyboardAvoidingView behavior="position" enabled>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <Container>
                        <Header>
                            <BackButton onPress={handleBack}/>
                            <Steps>
                                <Bullet active/>
                                <Bullet/>
                            </Steps>
                        </Header>

                        <Title>
                            Crie sua {'\n'}conta
                        </Title>
                        <Subtitle>
                            Faça seu cadastro de{'\n'}
                            forma rápida e fácil
                        </Subtitle> 

                        <Form>
                            <FormTitle>2. Senha</FormTitle>
                            <PasswordInput
                                iconName="lock"
                                placeholder="Senha"
                                onChangeText={setPassword}
                                value={password}
                            />
                            <PasswordInput
                                iconName="lock"
                                placeholder="Repetir Senha"
                                onChangeText={setPasswordConfirm}
                                value={passwordConfirm}
                            />
                        </Form>

                        <Button 
                            title="Cadastrar"    
                            color={theme.colors.success}
                            onPress={handleRegister}
                        />
                </Container>
            </TouchableWithoutFeedback>
       </KeyboardAvoidingView>
    );
}