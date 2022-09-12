import React, {useState} from 'react';
import { TextInputProps } from 'react-native';

import { useTheme } from 'styled-components';
import {Feather} from '@expo/vector-icons';

import {
 Container,
 InputText,
 IconContainer
} from './styles';


interface Props extends TextInputProps{
    iconName: React.ComponentProps<typeof Feather>['name'];
    value?:string;
}

export function Input({
    iconName,
    value,
    ...rest
}: Props){
    const theme = useTheme();

    const [isFocused, setIsFocused ] = useState(false); //estado para saber se o componente está com foco
    const [isFilled, setIsFilled] = useState(false); //estado para saber se o input está preenchido

    function handleInputFocus() { //quando o usuario entrar na caixa dispara esta funçao
        setIsFocused(true);
        setIsFilled(!!value); //verifica se tem conteudo ou não dentro do value, se tiver passa para o setIsFilled o valor de true, caso contrario false 
    }

    function handleInputBlur() { //quando o usuario sair da caixa dispara esta funçao
        setIsFocused(false);
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
                onFocus={handleInputFocus} // quando o usuário entra na caixinha
                onBlur={handleInputBlur} //quando o usuário saiu da caixinha
                {...rest}
            ></InputText>
       </Container>
    );
}