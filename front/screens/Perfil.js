import React from 'react';
import {
    View, Text, Image, TextInput,
} from 'react-native';
import style from '../customProperties/Styles';
import MiVecindario from '../components/MiVecindario';
import logo from '../assets/avatar.png';

function Perfil() {
    return (
        <>
            <MiVecindario />
            <View style={style.formsContainer}>
                <Text style={style.sectionTitle}>Mi perfil</Text>
                <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                    <Image
                        style={{
                            width: 80, height: 80, resizeMode: 'stretch', justifyContent: 'center',
                        }}
                        source={logo}
                    />
                </View>
                <Text style={style.formTooltip}>Nombre</Text>
                <Text style={{ fontSize: 12, color: 'black', textDecorationLine: 'underline' }}> Nicolás </Text>
                <TextInput placeholder="Estrella" />
                <Text style={style.formTooltip}>Apellido</Text>
                <Text style={style.formTooltip}>Documento</Text>
                <Text style={style.formTooltip}>Dirección</Text>
            </View>
        </>
    );
}

export default (Perfil);
