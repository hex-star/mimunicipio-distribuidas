import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import theme from './customProperties/Themes';
import TopBar from './components/TopBar';
import MainScreen from './components/MainScreen';
import {NavigationContainer} from '@react-navigation/native'
import {createStackNavigator} from '@react-navigation/stack'
import HomeScreen from './screens/HomeScreen';
import Registrar from './screens/Registrar';
import {Text,TouchableOpacity} from 'react-native'

const Stack = createStackNavigator()

export default function App() {
  return (
    <PaperProvider theme={theme}>
      <TopBar />

      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name ="HomeScreen" component={HomeScreen} options={({navigation}) =>({
          headerRight:() => (<TouchableOpacity onPress={() =>navigation.navigate('Registrar')}>
          <Text style={{color:"black",marginRight:20,fontSize:15}}>New</Text>
          </TouchableOpacity>)
          })}>

          </Stack.Screen>
          <Stack.Screen name ="Registrar" component={Registrar}>

          </Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
