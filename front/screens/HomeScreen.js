// import React, { useEffect, useState } from 'react';
import React from 'react';
// import { useIsFocused } from '@react-navigation/native';
import {
    Image,
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import logo from '../assets/miVecindarioHome.png';
import style from '../customProperties/Styles';
// import useStickyState from "react-native-sticky-state";


function MainScreen(props) {
    const { navigation } = props;
    // const [authToken] = useStickyState('', '', 'authToken');
    // const [loading, setLoading] = useState(true);
    // const state = useState();
    // const isFocused = useIsFocused();

    // useEffect(() => {
    //     const checkLogin = async function () {
    //         if (authToken) {
    //             navigation.navigate('Menu');
    //         } else {
    //             setLoading(false);
    //         }
    //     };
    //     checkLogin();
    // }, [props, isFocused, state]);

    return (
        <View style={style.homeContainer}>
            <Image source={logo} />
            <Text style={style.whiteSubtitle1}>MiVecindario</Text>

            <TouchableOpacity style={style.homeButtonPrimary}>
                <Text style={style.homeButtonPrimaryText}>
                    Continuar como invitado
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={style.homeButtonSecondary} onPress={() => navigation.navigate('Login')}>
                <Text style={style.homeButtonSecondaryText}>
                    Iniciar sesión
                </Text>
            </TouchableOpacity>

            <Text style={style.whiteFont} onPress={() => navigation.navigate('Registrar')}>¿No estás registrado? Registrate acá</Text>
            <Text style={style.whiteFontFooter}>
                Una aplicación del Municipio de Posadas
            </Text>
        </View>
    );
}

export default MainScreen;
