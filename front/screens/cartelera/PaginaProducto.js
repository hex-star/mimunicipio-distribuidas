/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';
import {
    View, Text, Image, TouchableOpacity, Alert,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { TextInput } from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown';
import style from '../../customProperties/Styles';
import MiVecindario from '../../components/MiVecindario';
import logo from '../../assets/avatar.png';
import thumbnail from '../../assets/avatar.png';

function PaginaProducto(props) {
    const { navigation, route } = props; // props.navigation
    const { params } = route;
    const filtros = ['Almacén', 'Abogado', 'Bar', 'Estética'];
    // llama a los datos del perfil
    const fetchApi = async () => {
        try {

        } catch (e) {
            console.log(e);
        }
    };
    // const [horarios, setHorarios] = useState('-Lunes: 9:00 - 19:00 hs' + '\n' + '-Martes: 9:00 - 19:00 hs ' + '\n' + '-Miercoles: Cerrado' + '\n' + '-Jueves: 9:00 - 22:00hs' + '\n' + '-Sábado: Cerrado' + '\n' + '-Domingo: Cerrado');
    const [horarios, setHorarios] = useState(params.publicacion.horarios);
    const [nombre, setNombre] = useState(params.publicacion.nombre);
    const [descripcion, setDescripcion] = useState(params.publicacion.descripcion);
    const [img, setImg] = useState(params.publicacion.img[0]);

    useEffect(() => {
        fetchApi();
    });

    return (
        <>
            <ScrollView>
                <MiVecindario noPerfil />
                <View style={style.paginaProductoContainer}>
                    <Text style={style.h1Cartelera}>Cartelera</Text>

                    <Image
                        source={{ uri: img }}
                        style={{
                            width: 120, height: 120, resizeMode: 'stretch', justifyContent: 'center', alignSelf: 'center',
                        }}
                    />
                    <Text style={{ color: '#000', fontSize: 20 }}>{nombre}</Text>
                    <Text style={{ color: '#000' }}>Horarios</Text>

                    <View style={{flexDirection:'row'}}>
                        <Text>-Lunes </Text>
                        <Text style={{ color: '#000' }}>{horarios.lunes.desde} - {horarios.lunes.hasta} hs</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text>-Martes </Text>
                        <Text style={{ color: '#000' }}>{horarios.martes.desde} - {horarios.martes.hasta} hs</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text>-Miercoles </Text>
                        <Text style={{ color: '#000' }}>{horarios.miercoles.desde} - {horarios.miercoles.hasta} hs</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text>-Jueves </Text>
                        <Text style={{ color: '#000' }}>{horarios.jueves.desde} - {horarios.jueves.hasta} hs</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text>-Viernes </Text>
                        <Text style={{ color: '#000' }}>{horarios.viernes.desde} - {horarios.viernes.hasta} hs</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text>-Sabado </Text>
                        <Text style={{ color: '#000' }}>{horarios.sabado.desde} - {horarios.sabado.hasta} hs</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                        <Text>-Domingo </Text>
                        <Text style={{ color: '#000' }}>{horarios.domingo.desde} - {horarios.domingo.hasta} hs</Text>
                    </View>

                    <Text style={{ marginTop: 5 }}>{descripcion}</Text>
                    <View style={style.carteleraItemContainer}>

                        <TouchableOpacity onPress={() => navigation.navigate('CambiarContraseña')} />
                    </View>
                </View>
            </ScrollView>
        </>
    );
}

export default (PaginaProducto);
