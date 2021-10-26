import React from 'react';
import { View, Text, Image } from 'react-native';
import style from '../customProperties/Styles';
import MiVecindario from '../components/MiVecindario';
import logo from '../assets/avatar.png';

function Perfil() {
    return (
        <>
            <MiVecindario />
            <View style={style.formsContainer}>
                <Text style={style.sectionTitle}>Mi perfil</Text>
                <Image
                    style={{
                        width: 50, height: 50, resizeMode: 'stretch', justifyContent: 'center',
                    }}
                    source={logo}
                />
            </View>
        </>
    );
}

export default (Perfil);
