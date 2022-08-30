import React from 'react';

import AppLoading from 'expo-app-loading';
import { ThemeProvider} from 'styled-components';
import {
  useFonts,
  Inter_400Regular,
  Inter_500Medium
 } from '@expo-google-fonts/inter';
import {
  Archivo_400Regular,
  Archivo_500Medium,
  Archivo_600SemiBold
 } from '@expo-google-fonts/archivo';

//import { Home } from './src/Screens/Home';
//import { CarDetail } from './src/Screens/CarDetail';
import { SchedulingDetails } from './src/Screens/SchedulingDetails';
import theme from './src/styles/theme';

export default function App() {
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold
  });

  if(!fontsLoaded){
    return <AppLoading />
  }

  return (
    <ThemeProvider theme={theme}>
      <SchedulingDetails />
    </ThemeProvider>
  )
}