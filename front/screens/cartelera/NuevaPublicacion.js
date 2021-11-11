/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import {
    View, Text, Image, TouchableOpacity, Alert,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-paper';
import style from '../../customProperties/Styles';
import MiVecindario from '../../components/MiVecindario';
import logo from '../../assets/avatar.png';
import thumbnail from '../../assets/avatar.png';

function NuevaPublicacion(props) {
    const { navigation } = props;
    // llama a los datos del perfil
    const fetchApi = async () => {
        try {

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
                <View style={{marginTop:'20%',marginLeft:10,marginRight:10}}>
                    <Text style={style.h1Cartelera}>Nueva publicación</Text>

                    <View style={style.carteleraItemContainer}>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('ServiciosProfesionales')}
                            style={style.historialButton}

                        >
                            <Text style={style.primaryNavigationButtonText}>
                                Servicios profesionales
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('NuevoComercio')}
                            style={style.historialButton}

                        >
                            <Text style={style.primaryNavigationButtonText}>
                                Comercio
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('CambiarContraseña')} />
                    </View>
                </View>
            </ScrollView>
        </>
    );
}

export default (NuevaPublicacion);
