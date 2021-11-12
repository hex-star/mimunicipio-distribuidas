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
    const { navigation } = props;
    const filtros = ['Almacén', 'Abogado', 'Bar', 'Estética'];
    // llama a los datos del perfil
    const fetchApi = async () => {
        try {

        } catch (e) {
            console.log(e);
        }
    };
    const [horarios, setHorarios] = useState('-Lunes: 9:00 - 19:00 hs' + '\n' + '-Martes: 9:00 - 19:00 hs ' + '\n' + '-Miercoles: Cerrado' + '\n' + '-Jueves: 9:00 - 22:00hs' + '\n' + '-Sábado: Cerrado' + '\n' + '-Domingo: Cerrado')
    const [nombre, setNombre] = useState('La Farola')
    const [descripcion, setDescripcion] = useState("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containig")
    const [img, setImg] = useState(logo)
    
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
                        source={img}
                        style={{
                            width: 80, height: 80, resizeMode: 'stretch', justifyContent: 'center', alignSelf: 'center'
                        }}
                    />
                    <Text style={{ color: '#000', fontSize: 20 }}>{nombre}</Text>
                    <Text style={{ color: '#000' }}>Horarios</Text>
                    <View>
                        <Text style={{ color: '#000' }}>{horarios}</Text>
                    </View>
                    <Text style={{ marginTop: 5 }}>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containig</Text>
                    <View style={style.carteleraItemContainer}>



                        <TouchableOpacity onPress={() => navigation.navigate('CambiarContraseña')} />
                    </View>
                </View>
            </ScrollView>
        </>
    );
}

export default (PaginaProducto);
