import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {Provider as PaperProvider} from "react-native-paper"
import theme from './customProperties/Themes'
import TopBar from "./components/TopBar"
import MainScreen from "./components/MainScreen"

export default function App() {

  return (
    <PaperProvider theme={theme}>
      <TopBar/>
      <MainScreen/>
    </PaperProvider>
  );
}

