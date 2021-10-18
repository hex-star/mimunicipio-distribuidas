import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { Text, TouchableOpacity } from 'react-native';
import theme from './customProperties/Themes';
import HomeScreen from './screens/HomeScreen';
import Registrar from './screens/Registrar';

const Stack = createStackNavigator();

export default function App() {
  return (
    <PaperProvider theme={theme}>

      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            // options={({ navigation }) => ({
            //   headerRight: () => (
            //     <TouchableOpacity onPress={() => navigation.navigate('Registrar')}>
            //       <Text style={{ color: 'black', marginRight: 20, fontSize: 15 }}>New</Text>
            //     </TouchableOpacity>
            //   ),
            // })}
          />
          <Stack.Screen name="Registrar" component={Registrar} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
