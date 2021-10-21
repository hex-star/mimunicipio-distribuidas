import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import style from '../customProperties/Styles';
import logo from '../assets/miVecindario.png';
import MiVecindario from './MiVecindario';
import DatePicker from 'react-native-datepicker'
import { useState } from 'react';

function FormularioDenuncia() {
    const [date, setDate] = useState("2016-05-15")

    return <View style={{ flexDirection: 'column', alignItems: 'flex-start', marginBottom: 30, marginLeft: 30 }}>

        <Text style={style.blueFont}>Crear nueva denuncia</Text>
        <TextInput style={{  marginTop: 20,  borderColor:'#000',borderWidth:1,padding:2 }} placeholder="Nombre / Comercio" />
        <TextInput style={{ marginTop: 20, marginBottom: 20,  borderColor:'#000',borderWidth:1,padding:2 }} placeholder="Dirección" />
        <DatePicker format="DD-MM-YYYY" mode="date" date={date} onDateChange={(date) => { setDate(date) }} />
        <TextInput style={{ marginTop: 20,   borderColor:'#000',borderWidth:1,padding:2}} placeholder="Comentanos tu problema" />
        <TextInput numberOfLines={2}  multiline={true} style={{ marginTop: 20, marginBottom: 20,  borderColor:'#000',borderWidth:1,padding:2 }} placeholder="Subí los archivos de prueba" />
        <TouchableOpacity onPress={() => navigation.navigate('Menu')} style={{
            backgroundColor: '#1A4472',
            borderColor: '#1A4472',
            borderWidth: 2,
            borderRadius: 5,
            padding: 5, alignSelf: 'center',
            width:200
        }} >
            <Text style={{
                color: 'white', fontSize: 15, alignSelf: 'center'
            }}
            >
                Siguiente
            </Text>
        </TouchableOpacity>

    </View>
}

export default FormularioDenuncia;
