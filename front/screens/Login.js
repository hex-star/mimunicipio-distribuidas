import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import MiVecindario from '../components/MiVecindario';
import style from '../customProperties/Styles';


const Login = () => (

     <View style={{
        flexDirection: 'column',
        flex: 1,
        justifyContent: 'center',
        marginLeft:10,
        marginRight:10
    }}>
        <MiVecindario/>
        <Text style={{alignSelf:'center',fontSize:20}}>¡Bienvenido a Mi Vecindario!</Text>
        <Text style={{alignSelf:'center',marginTop:20}}>Por favor, Ingresá tus datos para continuar</Text>
        <TextInput style={{marginTop:20,borderRadius:0}} placeholder="Email/Legajo" />
        <TextInput style={{marginTop:20,marginBottom:20}} placeholder="Contraseña" />
        <TouchableOpacity style={style.buttonPrimary} >
            <Text style={{
                color: 'white', fontSize: 15,alignSelf:'center'
            }}
            >
                Continuar como invitado
            </Text>
        </TouchableOpacity>
        <Text style={{alignSelf:'center',marginTop:20}}>Olvidé mi contraseña</Text>
        <Text style={{alignSelf:'center',marginTop:20}} onPress={() => navigation.navigate('Registrar')}>¿No estás registrado? Registraté acá</Text>

    </View>
);

export default Login;
