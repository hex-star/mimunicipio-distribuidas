import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
// import { Text, TouchableOpacity } from 'react-native';
import { LogBox } from 'react-native';
import theme from './customProperties/Themes';
import HomeScreen from './screens/HomeScreen';
import Registrar from './screens/Registrar';
import Login from './screens/Login';
import Menu from './screens/Menu';
import Denuncia from './screens/Denuncia';
<<<<<<< HEAD
import Historial from './screens/Historial';
import Perfil from './screens/Perfil';
=======
import Contraseña from './screens/Contraseña';
>>>>>>> forgotPassword

const Stack = createStackNavigator();

LogBox.ignoreLogs(['VirtualizedList']); // Ignore log notification by message

export default function App() {
    return (
        <PaperProvider theme={theme}>

            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="HomeScreen"
                        component={HomeScreen}
                    />
                    <Stack.Screen name="Registrar" component={Registrar} />
                    <Stack.Screen name="Login" component={Login} />
                    <Stack.Screen name="Menu" component={Menu} />
                    <Stack.Screen name="Denuncia" component={Denuncia} />
<<<<<<< HEAD
<<<<<<< HEAD
                    <Stack.Screen name="Historial" component={Historial}/>
=======
                    <Stack.Screen name="Perfil" component={Perfil} />
>>>>>>> perfil
=======
                    <Stack.Screen name="Contraseña" component={Contraseña} />
>>>>>>> forgotPassword
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}
