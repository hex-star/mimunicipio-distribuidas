import React from 'react';
import {
    View, Text, TouchableOpacity, Image,
} from 'react-native';
import logo from '../assets/miVecindarioHome.png';
import style from '../customProperties/Styles';

function MainScreen(props) {
    const { navigation } = props;

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
                    Iniciar sesion
                </Text>
            </TouchableOpacity>

            <Text style={style.whiteFont} onPress={() => navigation.navigate('Registrar')}>¿No estas registrado? Registrate aca</Text>
            <Text style={style.whiteFontFooter}>Una aplicacion del Municipio de Posadas</Text>
        </View>
    );
}

export default MainScreen;
