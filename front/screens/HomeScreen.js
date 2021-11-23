import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import {
    Image,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import logo from '../assets/miVecindarioHome.png';
import style from '../customProperties/Styles';

function MainScreen(props) {
    const { navigation } = props;

    const [authToken, setAuthToken] = useState('');
    const [loading, setLoading] = useState(true);
    const state = useState();
    const isFocused = useIsFocused();

    useEffect(() => {
        const checkLogin = async function () {
            setAuthToken(await AsyncStorage.getItem('authToken'));
            if (authToken) {
                navigation.navigate('Menu');
            } else {
                setLoading(false);
            }
        };
        checkLogin();
    }, [props, isFocused, state]);

    return (
        <>
            { loading ? (
                <ActivityIndicator animating />
            ) : (
                <View style={style.homeContainer}>
                    <Image source={logo} />
                    <Text style={style.whiteSubtitle1}>MiVecindario</Text>

                    <TouchableOpacity style={style.homeButtonPrimary} onPress={() => navigation.navigate('Cartelera')}>
                        <Text style={style.homeButtonPrimaryText}>
                            Continuar como invitado
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={style.homeButtonSecondary} onPress={() => navigation.navigate('Login')}>
                        <Text style={style.homeButtonSecondaryText}>
                            Iniciar sesion
                        </Text>
                    </TouchableOpacity>

                    <Text style={style.whiteFont} onPress={() => navigation.navigate('Registrar')}>¿No estas registrado? Registrate aca</Text>
                    <Text style={style.whiteFontFooter}>
                        Una aplicacion del Municipio de Posadas
                    </Text>
                </View>
            )}
        </>
    );
}

export default MainScreen;
