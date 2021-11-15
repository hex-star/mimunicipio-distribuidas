/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import {
    View, Text, Image, TouchableOpacity,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import base64 from 'react-native-base64';
import style from '../customProperties/Styles';
import MiVecindario from '../components/MiVecindario';
import logo from '../assets/avatar.png';
import { getUsuario } from '../controllers/usuarios';
import useStickyState from '../utils/useStickyState';

function Perfil(props) {
    const [nombre, setNombre] = useState('Cargando...');
    const [apellido, setApellido] = useState('Cargando...');
    const [direccion, setDireccion] = useState('Cargando...');
    const [isInspector, setIsInspector] = useState(false);
    // INSPECTOR
    const [legajo, setLegajo] = useState('111');
    const [fecha, setFecha] = useState('10/09/2021');
    const [rubro, setRubro] = useState('Alumbrado');

    const { navigation, route } = props;
    const { params } = route;
    // llama a los datos del perfil
    const { documento } = JSON.parse(base64.decode(params.authToken).toString());

    const fetchApi = async () => {
        try {
            const res = await getUsuario(documento);

            if (res && res.vecino) {
                setNombre(res.vecino.nombre);
                setApellido(res.vecino.apellido);
                setDireccion(res.vecino.direccion);
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchApi();
    });

    return (
        <>
            <ScrollView>
                <MiVecindario noPerfil />
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
                    {isInspector && (
                        <View>
                            <Text style={style.formTooltip}>Legajo</Text>
                            <Text style={style.textPerfil}>{legajo}</Text>
                            <View style={{ borderBottomColor: '#24b6ff', borderBottomWidth: 0.5 }} />
                        </View>
                    )}

                    <Text style={style.formTooltip}>Nombre</Text>
                    <Text style={style.textPerfil}>{nombre}</Text>
                    <View style={{ borderBottomColor: '#24b6ff', borderBottomWidth: 0.5 }} />
                    <Text style={style.formTooltip}>Apellido</Text>
                    <Text style={style.textPerfil}>{apellido}</Text>
                    <View style={{ borderBottomColor: '#24b6ff', borderBottomWidth: 0.5 }} />
                    {isInspector && (
                        <View>
                            <Text style={style.formTooltip}>Fecha de ingreso</Text>
                            <Text style={style.textPerfil}>{fecha}</Text>
                            <View style={{ borderBottomColor: '#24b6ff', borderBottomWidth: 0.5 }} />
                            <Text style={style.formTooltip}>Rubro</Text>
                            <Text style={style.textPerfil}>{rubro}</Text>
                            <View style={{ borderBottomColor: '#24b6ff', borderBottomWidth: 0.5 }} />
                        </View>
                    )}
                    {!isInspector
                        && (
                            <View>

                                <Text style={style.formTooltip}>Documento</Text>
                                <Text value="123" style={style.textPerfil}>{documento}</Text>
                                <View style={{ borderBottomColor: '#24b6ff', borderBottomWidth: 0.5 }} />
                                <Text style={style.formTooltip}>Dirección</Text>
                                <Text style={style.textPerfil}>{direccion}</Text>
                                <View style={{ borderBottomColor: '#24b6ff', borderBottomWidth: 0.5, marginBottom: 10 }} />
                            </View>

                        )}
                    <Text style={{ fontSize: 13, textAlign: 'center' }}> *Para cambiar sus datos deberá acercarse al Municipio.</Text>

                    <TouchableOpacity onPress={() => navigation.navigate('CambiarContraseña')}>
                        <Text style={style.subtitle2}>Cambiar Contraseña</Text>

                    </TouchableOpacity>
                </View>
            </ScrollView>
        </>
    );
}

export default (Perfil);
