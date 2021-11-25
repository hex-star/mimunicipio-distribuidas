/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import {
    View, Text, Image, TouchableOpacity, Alert,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import base64 from 'react-native-base64';
import style from '../customProperties/Styles';
import MiVecindario from '../components/MiVecindario';
import logo from '../assets/avatar.png';
import { getUsuario } from '../controllers/usuarios';

function Perfil(props) {
    const [nombre, setNombre] = useState('Cargando...');
    const [apellido, setApellido] = useState('Cargando...');
    const [documento, setDocumento] = useState('Cargando...');
    const [direccion, setDireccion] = useState('Cargando...');
    const [isInspector, setIsInspector] = useState(false);
    // INSPECTOR
    const [legajo, setLegajo] = useState('Cargando...');
    const [fecha, setFecha] = useState('Cargando...');
    const [rubro, setRubro] = useState('Cargando...');
    const [token, setToken] = useState(null);

    const { navigation } = props;
    // llama a los datos del perfil
    const fetchApi = async () => {
        try {
            const async = await AsyncStorage.getItem('authToken');
            const token = JSON.parse(base64.decode(async));
            /* console.log("TOKEN")
              console.log(token); */
            setToken(token);

            const documento = await AsyncStorage.getItem('documento');
            console.log(typeof (documento));
            console.log(`DOCUMENTO: ${documento}`);
            console.log(token);
            if (token && token.tipo === 'inspector') {
                setLegajo(token.referencia);
                setNombre(token.email);
                setRubro(token.rubro);
            } else {
                const res = await getUsuario(documento);
                console.log('RES');
                console.log(res);
                if (res && res.vecino) {
                    console.log(res);
                    console.log(`REEEEES: ${res}`);
                    setNombre(res.vecino.nombre);
                    console.log(res.vecino.nombre);
                    setApellido(res.vecino.apellido);
                    setDocumento(documento);
                    setDireccion(res.vecino.direccion);
                }
            }
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(() => {
        fetchApi();
    }, []);

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
                    {token && token.tipo !== 'vecino' && (
                        <View>

                            <Text style={style.formTooltip}>Email</Text>
                            <Text style={style.textPerfil}>{nombre}</Text>
                            <View style={{ borderBottomColor: '#24b6ff', borderBottomWidth: 0.5 }} />
                            <Text style={style.formTooltip}>Legajo</Text>
                            <Text style={style.textPerfil}>{legajo}</Text>
                            <View style={{ borderBottomColor: '#24b6ff', borderBottomWidth: 0.5 }} />
                            <View style={{ borderBottomColor: '#24b6ff', borderBottomWidth: 0.5 }} />
                        </View>
                    )}
                    {token && token.tipo == 'vecino' && (
                        <View>
                            <Text style={style.formTooltip}>Nombre</Text>
                            <Text style={style.textPerfil}>{nombre}</Text>
                            <View style={{ borderBottomColor: '#24b6ff', borderBottomWidth: 0.5 }} />
                            <Text style={style.formTooltip}>Apellido</Text>
                            <Text style={style.textPerfil}>{apellido}</Text>
                            <View style={{ borderBottomColor: '#24b6ff', borderBottomWidth: 0.5 }} />
                        </View>
                    )}

                    <View style={{ borderBottomColor: '#24b6ff', borderBottomWidth: 0.5 }} />

                    <View style={{ borderBottomColor: '#24b6ff', borderBottomWidth: 0.5 }} />
                    {token && token.tipo !== 'vecino' && (
                        <View>

                            <View style={{ borderBottomColor: '#24b6ff', borderBottomWidth: 0.5 }} />
                            <Text style={style.formTooltip}>Rubro</Text>
                            <Text style={style.textPerfil}>{rubro}</Text>
                            <View style={{ borderBottomColor: '#24b6ff', borderBottomWidth: 0.5 }} />
                            
                        </View>
                    )}
                    {token && token.tipo == 'vecino'
                        && (
                            <View>

                                <Text style={style.formTooltip}>Documento</Text>
                                <Text value="123" style={style.textPerfil}>{documento}</Text>
                                <View style={{ borderBottomColor: '#24b6ff', borderBottomWidth: 0.5 }} />
                                <View style={{ borderBottomColor: '#24b6ff', borderBottomWidth: 0.5 }} />
                                <Text style={style.formTooltip}>Dirección</Text>
                                <Text style={style.textPerfil}>{direccion}</Text>
                                <View style={{ borderBottomColor: '#24b6ff', borderBottomWidth: 0.5, marginBottom: 10 }} />
                            </View>

                        )}
                    <Text style={{ fontSize: 13, textAlign: 'center' }}> *Para cambiar sus datos, deberá acercarse al Municipio.</Text>

                    <TouchableOpacity onPress={() => navigation.navigate('CambiarContraseña')}>
                        <Text style={style.subtitle2}>Cambiar Contraseña</Text>

                    </TouchableOpacity>
                </View>
            </ScrollView>
        </>
    );
}

export default (Perfil);
