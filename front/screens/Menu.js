import React, { useEffect } from 'react';
import {
    Text, View, TouchableOpacity, Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NetInfo from '@react-native-community/netinfo';
import MiVecindario from '../components/MiVecindario';
import style from '../customProperties/Styles';
import cartelera from '../assets/cartelera.png';
import reclamo from '../assets/reclamo.png';
import denuncia from '../assets/denuncia.png';
import historial from '../assets/historial.png';
import imagesUrls from '../controllers/images';
import { crearDenuncia } from '../controllers/denuncias';
import { crearSitio } from '../controllers/sitios';

function Menu(props) {
    const { navigation } = props;

    useEffect(() => {
        async function onSubmit() {
            const aux = async () => (await NetInfo.fetch()).isConnected;
            const connection = await aux();
            console.log(((await AsyncStorage.getItem('denunciasPendientes')).concat(']')));

            if (connection) {
                try {
                    //  const imageUrls = await imagesUrls(photos);
                    console.log('holal');
                    const values = JSON.parse((await AsyncStorage.getItem('denunciasPendientes')).concat(']'));

                   
                    if (values == null) {
                        return;
                    }
        
                    // const sitioRes = await crearSitio('a', values.comentariosLugar);
                    let i = 0;
                    while (values[i] != null) {
                        console.log(values[i])
                        // eslint-disable-next-line no-await-in-loop
                        const res = await crearDenuncia({
                            // documento: documentoUsuario,
                            //  idSitio: sitioRes.idSitio,
                            documento: "232323",
                            idSitio: 1,
                           // descripcion: values[i].descripcion,
                           // nombreDenunciado: values[i].nombre,
                           descripcion:"hola",
                           nombreDenunciado:"pepe",
                            imagenesDenuncia: 'asas',
                        });
                        i += 1;
                    }
                } catch (e) {
                    Alert.alert('Se ha producido un error al intentar cargar una denuncia');
                }
            }
        }
        onSubmit();
    }, []);

    return (
        <>
            <MiVecindario navigation={navigation} />
            <View style={{ flexDirection: 'column', height: '90%', justifyContent: 'center' }}>
                <View style={style.menuContainer}>
                    <View style={style.menuItem}>
                        <TouchableOpacity style={style.menuButtonDisabled}>
                            <Image style={style.menuImage} source={cartelera} />

                        </TouchableOpacity>
                        <Text style={style.menuText}>Cartelera</Text>
                    </View>
                    <View style={style.menuItem}>
                        <TouchableOpacity style={style.menuButtonDisabled}>
                            <Image style={style.menuImage} source={reclamo} />

                        </TouchableOpacity>
                        <Text style={style.menuText}>Nuevo reclamo</Text>
                    </View>
                </View>
                <View style={style.menuContainer}>
                    <View style={style.menuItem}>
                        <TouchableOpacity style={style.menuButton} onPress={() => navigation.navigate('Denuncia')}>
                            <Image style={style.menuImage} source={denuncia} />

                        </TouchableOpacity>
                        <Text style={style.menuText}>Nueva Denuncia</Text>
                    </View>
                    <View style={style.menuItem}>
                        <TouchableOpacity style={style.menuButton} onPress={() => navigation.navigate('Historial')}>
                            <Image style={style.menuImage} source={historial} />
                        </TouchableOpacity>
                        <Text style={style.menuText}>Historial</Text>
                    </View>
                    {/* <View style={style.menuItem}>
                        <TouchableOpacity style={style.menuButton}>
                            <Image style={style.menuImage} source={historial} />

                        </TouchableOpacity>
                        <Text style={style.menuText}>Historial</Text>
                    </View> */ }
                </View>

            </View>

        </>
    );
}

export default Menu;
