import React, { Component } from 'react'
import { Text, View,TouchableOpacity,Image } from 'react-native'

import style from './../customProperties/Styles'
import cartelera from './../assets/cartelera.png'
import reclamo from './../assets/reclamo.png'
import denuncia from './../assets/denuncia.png'
import historial from './../assets/historial.png'

function Menu(props) {
    const {  navigation } = props;
    return (
        <View style={style.menuContainer}>

            <View style={style.menuItem}>
                <TouchableOpacity style={style.menuImage}>
                    <Image source={cartelera} />
                
                </TouchableOpacity>
                <Text>Cartelera</Text>
            </View>
            <View style={style.menuItem}>
                <TouchableOpacity style={style.menuImage}>
                    <Image source={reclamo} />
                
                </TouchableOpacity>
                <Text>Nuevo reclamo</Text>
            </View>
            <View style={style.menuItem}  >
                <TouchableOpacity  style={style.menuImage} onPress={()=> navigation.navigate('Denuncia')}>
                    <Image source={denuncia} />
                
                </TouchableOpacity>
                <Text>Nueva Denuncia</Text>
            </View>
            <View style={style.menuItem}>
                <TouchableOpacity style={style.menuImage}>
                    <Image source={historial} />
                
                </TouchableOpacity>
                <Text>Historial</Text>
            </View>

        </View>
    );
}

export default Menu;