/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import React, { useState, useEffect } from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LogBox } from 'react-native';
import theme from './customProperties/Themes';
import Loading from './screens/Loading';
import HomeScreen from './screens/HomeScreen';
import Registrar from './screens/Registrar';
import Login from './screens/Login';
import Menu from './screens/Menu';
import Denuncia from './screens/Denuncia';
import Historial from './screens/Historial';
import Perfil from './screens/Perfil';
import Contraseña from './screens/Contraseña';
import UserProfile from './components/UserProfile';
import ImageBrowser from './components/ImageBrowser';
import Confirmacion from './components/Confirmacion';
import PrimerInicio from './screens/PrimerInicio';

const Stack = createStackNavigator();

LogBox.ignoreLogs(['VirtualizedList']); // Ignore log notification by message

export default function App() {
    const [loading, setLoading] = useState(true);
    const [authToken, setAuthToken] = useState('');

    useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            setLoading(true);
            setAuthToken(await AsyncStorage.getItem('authToken'));
            setLoading(false);
        };

        bootstrapAsync();
    }, []);

    const options = {
        headerRight: () => (<UserProfile onPress={() => navigation.Perfil} authToken={authToken} setAuthToken={setAuthToken} />),
    };

    if (loading) {
        // We haven't finished checking for the token yet
        return <Loading />;
    }

    return (
        <PaperProvider theme={theme}>
            <NavigationContainer>
                <Stack.Navigator>
                    <Stack.Screen
                        name="HomeScreen"
                        component={HomeScreen}
                        options={options}
                    />
                    <Stack.Screen
                        name="Registrar"
                        component={Registrar}
                        options={options}
                    />
                    <Stack.Screen
                        name="Login"
                        component={Login}
                        options={options}
                    />
                    <Stack.Screen
                        name="Menu"
                        component={Menu}
                        options={options}
                    />
                    <Stack.Screen
                        name="Denuncia"
                        component={Denuncia}
                        options={options}
                    />
                    <Stack.Screen
                        name="Historial"
                        component={Historial}
                        options={options}
                    />
                    <Stack.Screen
                        name="ImageBrowser"
                        component={ImageBrowser}
                        options={{
                            title: 'Selected 0 files',
                        }}
                    />
                    <Stack.Screen
                        name="Confirmacion"
                        component={Confirmacion}
                        options={options}
                    />
                  
        
                 
                    <Stack.Screen name="Perfil" component={Perfil}  options={options} />
                    <Stack.Screen name="Contraseña" component={Contraseña}  options={options}  />
                    <Stack.Screen
                        name="PrimerInicio"
                        component={PrimerInicio}
                        options={options}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}
