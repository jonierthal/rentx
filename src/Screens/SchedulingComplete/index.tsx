import React from 'react';
import { ParamListBase, NavigationProp, useNavigation, useRoute } from '@react-navigation/native';
import { useWindowDimensions, StatusBar } from 'react-native';

import LogoSvg from '../../assets/logo_background_gray.svg';
import DoneSvg from '../../assets/done.svg';

import {
 Container,
 Content,
 Title,
 Message,
 Footer
} from './styles';
import { ConfirmButton } from '../../components/ConfirmButton';

interface Params{
    title: string;
    message: string;
    nextScreenRoute: string
}

export function Confirmation(){
    const { width } = useWindowDimensions();
    const navigation = useNavigation<NavigationProp<ParamListBase>>();
    const route = useRoute();
    const { title, message, nextScreenRoute } = route.params as Params;

    function handleConfirm() {
        navigation.navigate(nextScreenRoute)
    }

    return (
       <Container>
            <StatusBar 
                barStyle="light-content"
                translucent
                backgroundColor="transparent"
            />
            <LogoSvg width={width} />

            <Content>
                <DoneSvg width={50} height={80} />
                <Title>{title}</Title>

                <Message>
                    {message}
                </Message> 
            </Content>

            <Footer>
                <ConfirmButton title="OK" onPress={handleConfirm}/>
            </Footer>
       </Container>
    );
}