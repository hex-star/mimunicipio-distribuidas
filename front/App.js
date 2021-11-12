/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { LogBox } from 'react-native';
import useStickyState from 'react-native-sticky-state';
import theme from './customProperties/Themes';
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
import CambiarContraseña from './screens/CambiarContraseña';
import Reclamo from './screens/reclamos/Reclamo1';
import Reclamo2 from './screens/reclamos/Reclamo2';

const Stack = createStackNavigator();

LogBox.ignoreLogs(['VirtualizedList']); // Ignore log notification by message

export default function App() {
    const [authToken] = useStickyState('', '', 'authToken');
    console.log('authToken:', authToken);
    const options = {
        headerRight: () => (<UserProfile />),
    };

    return (
        <PaperProvider theme={theme}>
            <NavigationContainer>
                <Stack.Navigator>
                    {authToken ? (
                        <>
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
                                name="Reclamo"
                                component={Reclamo}
                                options={options}
                            />
                            <Stack.Screen
                                name="Reclamo#2"
                                component={Reclamo2}
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

                            <Stack.Screen
                                name="Perfil"
                                component={Perfil}
                                options={options}
                            />

                            <Stack.Screen
                                name="Contraseña"
                                component={Contraseña}
                                options={options}
                            />

                            <Stack.Screen
                                name="CambiarContraseña"
                                component={CambiarContraseña}
                                options={options}
                            />
                        </>
                    ) : (
                        <>
                            <Stack.Screen
                                name="HomeScreen"
                                component={HomeScreen}
                            />
                            <Stack.Screen
                                name="Registrar"
                                component={Registrar}
                            />
                            <Stack.Screen
                                name="Login"
                                component={Login}
                            />
                            <Stack.Screen
                                name="PrimerInicio"
                                component={PrimerInicio}
                            />
                        </>
                    )}
                </Stack.Navigator>
            </NavigationContainer>
        </PaperProvider>
    );
}
