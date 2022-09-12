import React, {useState} from 'react';
import { TextInputProps } from 'react-native';

import { useTheme } from 'styled-components';
import {Feather} from '@expo/vector-icons';
import { BorderlessButton } from 'react-native-gesture-handler';

import {
 Container,
 InputText,
 IconContainer,
} from './styles';


interface Props extends TextInputProps{
    iconName: React.ComponentProps<typeof Feather>['name'],
    value?:string;
}

export function PasswordInput({
    iconName,
    value,
    ...rest
}: Props){
    const theme = useTheme();

    const [isPasswordVisible, setIsPasswordVisible] = useState(true);
    const [isFocused, setIsFocused ] = useState(false); //estado para saber se o componente está com foco
    const [isFilled, setIsFilled] = useState(false); //estado para saber se o input está preenchido

    function handleInputFocus() { //quando o usuario entrar na caixa dispara esta funçao
        setIsFocused(true);
        setIsFilled(!!value); //verifica se tem conteudo ou não dentro do value, se tiver passa para o setIsFilled o valor de true, caso contrario false 
    }

    function handleInputBlur() { //quando o usuario sair da caixa dispara esta funçao
        setIsFocused(false);
    }


     function handlePasswordVisibilityChange() {
        setIsPasswordVisible(prevState => !prevState); //sempre que chamada a função altera o status do isPasswordVisible, ou seja: Mostra a senha ou esconde a senha 
     }

    return (
       <Container isFocused={isFocused}>
            <IconContainer>
                <Feather
                    name={iconName}
                    size={24}
                    color={(isFocused || isFilled) ? theme.colors.main : theme.colors.text_detail}
                />
            </IconContainer>
            
            <InputText 
                secureTextEntry={isPasswordVisible}
                onFocus={handleInputFocus}
                onBlur={handleInputBlur}
                {...rest}
            ></InputText>

            <BorderlessButton onPress={handlePasswordVisibilityChange}>
                <IconContainer>
                    <Feather
                            name={isPasswordVisible ? 'eye' : 'eye-off'}
                            size={24}
                            color={theme.colors.text_detail}
                        />
                </IconContainer>
            </BorderlessButton>
       </Container>
    );
}