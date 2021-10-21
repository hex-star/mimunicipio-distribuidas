import React, { Component } from 'react'
import { Text, View,TouchableOpacity,Image } from 'react-native'

import style from './../customProperties/Styles'
import cartelera from './../assets/cartelera.png'

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
                    <Image source={cartelera} />
                
                </TouchableOpacity>
                <Text>Cartelera</Text>
            </View>
            <View style={style.menuItem}  >
                <TouchableOpacity  style={style.menuImage} onPress={()=> navigation.navigate('Denuncia')}>
                    <Image source={cartelera} />
                
                </TouchableOpacity>
                <Text>Cartelera</Text>
            </View>
            <View style={style.menuItem}>
                <TouchableOpacity style={style.menuImage}>
                    <Image source={cartelera} />
                
                </TouchableOpacity>
                <Text>Cartelera</Text>
            </View>

        </View>
    );
}

export default Menu;