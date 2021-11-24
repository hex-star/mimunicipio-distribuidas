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
    const [img, setImg] = useState(params.publicacion.imagenesPublicacions);

    useEffect(() => {
        fetchApi();
    });

    return (
        <>
            <ScrollView>
                <MiVecindario noPerfil />
                <View style={style.paginaProductoContainer}>
                    <Text style={style.h1Cartelera}>Cartelera</Text>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
                        {
                            img.map((item) => (

                                <Image
                                    source={{ uri: item.url }}
                                    style={{
                                        width: 120, height: 120, resizeMode: 'stretch', justifyContent: 'center', alignSelf: 'center',
                                    }}
                                />

                            ))
                        }
                    </View>
                    <Text style={{ color: '#000', fontSize: 20 }}>{nombre}</Text>
                    <Text style={{ color: '#000' }}>Horarios</Text>

                    <View style={{ flexDirection: 'row' }}>
                        <Text>-Lunes </Text>
                        <Text style={{ color: '#000' }}>
                        {
                            horarios.split(',')[0] === '' && horarios.split(',')[1] === ''
                            && (
                                <Text style={{ color: '#000' }}>
                                   Cerrado
                                </Text>
                            )

                        }
                        {
                            horarios.split(',')[0] !== '' && horarios.split(',')[1] !== ''
                            &&(
                                <Text style={{ color: '#000' }}>
                                    {horarios.split(',')[0]}
                                    {' '}
                                    -
                                    {' '}
                                    {horarios.split(',')[1]}
                                    {' '}
                                    hs
                                </Text>
                            )
                        }
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>-Martes </Text>
                        <Text style={{ color: '#000' }}>
                        {
                            horarios.split(',')[2] === '' && horarios.split(',')[3] === ''
                            && (
                                <Text style={{ color: '#000' }}>
                                   Cerrado
                                </Text>
                            )

                        }
                        {
                            horarios.split(',')[2] !== '' && horarios.split(',')[3] !== ''
                            &&(
                                <Text style={{ color: '#000' }}>
                                    {horarios.split(',')[2]}
                                    {' '}
                                    -
                                    {' '}
                                    {horarios.split(',')[3]}
                                    {' '}
                                    hs
                                </Text>
                            )
                        }
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>-Miercoles </Text>
                        <Text style={{ color: '#000' }}>
                        {
                            horarios.split(',')[4] === '' && horarios.split(',')[5] === ''
                            && (
                                <Text style={{ color: '#000' }}>
                                   Cerrado
                                </Text>
                            )

                        }
                        {
                            horarios.split(',')[4] !== '' && horarios.split(',')[5] !== ''
                            &&(
                                <Text style={{ color: '#000' }}>
                                    {horarios.split(',')[4]}
                                    {' '}
                                    -
                                    {' '}
                                    {horarios.split(',')[5]}
                                    {' '}
                                    hs
                                </Text>
                            )
                        }
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>-Jueves </Text>
                        <Text style={{ color: '#000' }}>
                        {
                            horarios.split(',')[6] === '' && horarios.split(',')[7] === ''
                            && (
                                <Text style={{ color: '#000' }}>
                                   Cerrado
                                </Text>
                            )

                        }
                        {
                            horarios.split(',')[6] !== '' && horarios.split(',')[7] !== ''
                            &&(
                                <Text style={{ color: '#000' }}>
                                    {horarios.split(',')[6]}
                                    {' '}
                                    -
                                    {' '}
                                    {horarios.split(',')[7]}
                                    {' '}
                                    hs
                                </Text>
                            )
                        }
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>-Viernes </Text>
                        <Text style={{ color: '#000' }}>
                        {
                            horarios.split(',')[8] === '' && horarios.split(',')[9] === ''
                            && (
                                <Text style={{ color: '#000' }}>
                                   Cerrado
                                </Text>
                            )

                        }
                        {
                            horarios.split(',')[8] !== '' && horarios.split(',')[9] !== ''
                            &&(
                                <Text style={{ color: '#000' }}>
                                    {horarios.split(',')[8]}
                                    {' '}
                                    -
                                    {' '}
                                    {horarios.split(',')[9]}
                                    {' '}
                                    hs
                                </Text>
                            )
                        }
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>-Sabado </Text>
                        <Text style={{ color: '#000' }}>
                        {
                            horarios.split(',')[10] === '' && horarios.split(',')[11] === ''
                            && (
                                <Text style={{ color: '#000' }}>
                                   Cerrado
                                </Text>
                            )

                        }
                        {
                            horarios.split(',')[10] !== '' && horarios.split(',')[11] !== ''
                            &&(
                                <Text style={{ color: '#000' }}>
                                    {horarios.split(',')[10]}
                                    {' '}
                                    -
                                    {' '}
                                    {horarios.split(',')[11]}
                                    {' '}
                                    hs
                                </Text>
                            )
                        }
                        </Text>
                    </View>
                    <View style={{ flexDirection: 'row' }}>
                        <Text>-Domingo </Text>
                        {
                            horarios.split(',')[12] === '' && horarios.split(',')[13] === ''
                            && (
                                <Text style={{ color: '#000' }}>
                                   Cerrado
                                </Text>
                            )

                        }
                        {
                            horarios.split(',')[12] !== '' && horarios.split(',')[13] !== ''
                            &&(
                                <Text style={{ color: '#000' }}>
                                    {horarios.split(',')[12]}
                                    {' '}
                                    -
                                    {' '}
                                    {horarios.split(',')[13]}
                                    {' '}
                                    hs
                                </Text>
                            )
                        }

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