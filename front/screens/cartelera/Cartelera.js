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

function Cartelera(props) {
    const { navigation } = props;
    const placeholder = 'https://static.wixstatic.com/media/bb1bd6_74deb77a5d6648749c5358f5f26944fa~mv2.jpg/v1/fill/w_584,h_333,al_c,lg_1,q_90/bb1bd6_74deb77a5d6648749c5358f5f26944fa~mv2.webp';
    const filtros = ['Almacén', 'Abogado', 'Bar', 'Estética'];
    // llama a los datos del perfil
    const [publicaciones, setpublicaciones] = useState([
        {
            nombre: 'La farola',
            descripcion: 'Lorem ipsum is simply dummy text of the printing an pesetting',
            horarios: {
                lunes: {
                    desde: 15,
                    hasta: 18,
                },
                martes: {
                    desde: 15,
                    hasta: 18,
                },
                miercoles: {
                    desde: 15,
                    hasta: 18,
                },
                jueves: {
                    desde: 5,
                    hasta: 18,
                },
                viernes: {
                    desde: 6,
                    hasta: 18,
                },
                sabado: {
                    desde: 7,
                    hasta: 18,
                },
                domingo: {
                    desde: 12,
                    hasta: 18,
                },
            },
            img: ['https://static.wixstatic.com/media/bb1bd6_74deb77a5d6648749c5358f5f26944fa~mv2.jpg/v1/fill/w_584,h_333,al_c,lg_1,q_90/bb1bd6_74deb77a5d6648749c5358f5f26944fa~mv2.webp', 'aa'],
            direccion: 'av falsa',
            telefono: '12121',
            mail: 'falso@gmail.com',
            rubro: '',
            tipo: 'Comercio',
        },
        {
            nombre: 'Estética Mary',
            descripcion: 'Lorem ipsum is simply dummy text of the printing an pesetting',
            horarios: {
                lunes: {
                    desde: 15,
                    hasta: 18,
                },
                martes: {
                    desde: 15,
                    hasta: 18,
                },
                miercoles: {
                    desde: 15,
                    hasta: 18,
                },
                jueves: {
                    desde: 15,
                    hasta: 18,
                },
                viernes: {
                    desde: 15,
                    hasta: 18,
                },
                sabado: {
                    desde: 15,
                    hasta: 18,
                },
                domingo: {
                    desde: 15,
                    hasta: 18,
                },
            },
            img: [placeholder, placeholder, placeholder, placeholder, placeholder],
            direccion: 'av falsa',
            telefono: '12121',
            mail: 'falso@gmail.com',
            rubro: '',
            tipo: 'Comercio',
        },
        {
            nombre: 'Juan Carlos',
            descripcion: 'Lorem ipsum is simply dummy text of the printing an pesetting',
            horarios: {
                lunes: {
                    desde: 15,
                    hasta: 18,
                },
                martes: {
                    desde: 15,
                    hasta: 18,
                },
                miercoles: {
                    desde: 15,
                    hasta: 18,
                },
                jueves: {
                    desde: 15,
                    hasta: 18,
                },
                viernes: {
                    desde: 15,
                    hasta: 18,
                },
                sabado: {
                    desde: 15,
                    hasta: 18,
                },
                domingo: {
                    desde: 15,
                    hasta: 18,
                },
            },
            img: ['https://static.wixstatic.com/media/bb1bd6_74deb77a5d6648749c5358f5f26944fa~mv2.jpg/v1/fill/w_584,h_333,al_c,lg_1,q_90/bb1bd6_74deb77a5d6648749c5358f5f26944fa~mv2.webp', 'aa'],
            direccion: 'av falsa',
            telefono: '12121',
            mail: 'falso@gmail.com',
            rubro: '',
            tipo: 'Comercio',
        },
        {
            nombre: 'Maria Sierra',
            descripcion: 'Lorem ipsum is simply dummy text of the printing an pesetting',
            horarios: {
                lunes: {
                    desde: 15,
                    hasta: 18,
                },
                martes: {
                    desde: 15,
                    hasta: 18,
                },
                miercoles: {
                    desde: 15,
                    hasta: 18,
                },
                jueves: {
                    desde: 15,
                    hasta: 18,
                },
                viernes: {
                    desde: 15,
                    hasta: 18,
                },
                sabado: {
                    desde: 15,
                    hasta: 18,
                },
                domingo: {
                    desde: 15,
                    hasta: 18,
                },
            },
            img: ['https://static.wixstatic.com/media/bb1bd6_74deb77a5d6648749c5358f5f26944fa~mv2.jpg/v1/fill/w_584,h_333,al_c,lg_1,q_90/bb1bd6_74deb77a5d6648749c5358f5f26944fa~mv2.webp', 'aa'],
            direccion: 'av falsa',
            telefono: '12121',
            mail: 'falso@gmail.com',
            rubro: '',
            tipo: 'Comercio',
        },
    ]);

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
                <View style={style.carteleraContainer}>
                    <Text style={style.h1Cartelera}>Mi perfil</Text>
                    <View style={{ flexDirection: 'row' }}>
                        <TextInput

                            style={{
                                fontSize: 16,
                                marginBottom: 1,
                                backgroundColor: 'transparent',
                                height: 40,
                                flex: 0.99,

                            }}
                            underlineColor="transparent"
                        />
                        <View style={{ flex: 0.99 }}>
                            <SelectDropdown
                                data={filtros}
                                defaultValue="a"
                                onSelect={(selectedItem, index) => {
                                    console.log(selectedItem, index);
                                }}
                                buttonTextAfterSelection={(selectedItem, index) =>
                                    // text represented after item is selected
                                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                                    selectedItem}
                                rowTextForSelection={(item, index) =>
                                    // text represented for each item in dropdown
                                    // if data array is an array of objects then return item.property to represent item in dropdown
                                    item}
                            />
                        </View>

                    </View>
                    <View
                        style={{
                            borderBottomColor: '#2984f2',
                            borderBottomWidth: 1,
                        }}
                    />
                    <View style={style.carteleraItemContainer}>

                        {
                            publicaciones.map((publicacion) => (
                                <TouchableOpacity style={style.carteleraItem} onPress={() => navigation.navigate('PaginaProducto', { publicacion })}>
                                    <Image
                                        source={publicacion.img[0]}
                                        style={{
                                            width: 80, height: 80, resizeMode: 'stretch', justifyContent: 'center',
                                        }}
                                    />
                                    <Text>{publicacion.nombre}</Text>
                                    <Text style={{ textAlign: 'center' }}>{publicacion.descripcion}</Text>
                                </TouchableOpacity>
                            ))
                        }
                        {/*
                   <TouchableOpacity style={style.carteleraItem} onPress={() => navigation.navigate('PaginaProducto')}>
                            <Image
                                source={thumbnail}
                                style={{
                                    width: 80, height: 80, resizeMode: 'stretch', justifyContent: 'center',
                                }}
                            />
                            <Text>La Farola</Text>
                            <Text style={{ textAlign: 'center' }}>Lorem ipsum is simply dummy text of the printing an pesetting</Text>
                        </TouchableOpacity>
                   */}

                        <TouchableOpacity
                            onPress={() => navigation.navigate('NuevaPublicacion')}
                            style={style.primaryNavigationButton}
                        >
                            <Text style={style.primaryNavigationButtonText}>
                                Siguiente
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => navigation.navigate('CambiarContraseña')} />
                    </View>
                </View>
            </ScrollView>
        </>
    );
}

export default (Cartelera);
