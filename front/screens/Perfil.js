import React, { useState } from 'react';
import {
    View, Text, Image, TextInput, TouchableOpacity
} from 'react-native';
import style from '../customProperties/Styles';
import MiVecindario from '../components/MiVecindario';
import logo from '../assets/avatar.png';
import { ScrollView } from 'react-native-gesture-handler';

function Perfil(props) {
    const [nombre, setNombre] = useState("pepe")
    const [apellido, setApellido] = useState("santos")
    const [documento, setDocumento] = useState("111111111111")
    const [direccion, setDireccion] = useState("av falsa")
    const [isInspector, setIsInspector] = useState(false)
    //INSPECTOR
    const [legajo, setLegajo] = useState("111");
    const [fecha, setFecha] = useState("10/09/2021")
    const [rubro, setRubro] = useState("Alumbrado")


    const { navigation } = props;

    return (
        <>
            <ScrollView>
                <MiVecindario noPerfil={true} />
                <View style={style.formsContainer}>
                    <Text style={style.sectionTitle}>Mi perfil</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
                        <Image
                            style={{
                                width: 80, height: 80, resizeMode: 'stretch', justifyContent: 'center',
                            }}
                            source={logo}
                        />
                    </View>
                    {isInspector && <View>
                        <Text style={style.formTooltip}>Legajo</Text>
                        <Text style={ style.textPerfil } >{legajo}</Text>
                        <View style={{ borderBottomColor: '#24b6ff', borderBottomWidth: 0.5 }} /></View>}



                    <Text style={style.formTooltip}>Nombre</Text>
                    <Text style={ style.textPerfil } >{nombre}</Text>
                    <View style={{ borderBottomColor: '#24b6ff', borderBottomWidth: 0.5 }} />
                    <Text style={style.formTooltip}>Apellido</Text>
                    <Text style={ style.textPerfil }  >{apellido}</Text>
                    <View style={{ borderBottomColor: '#24b6ff', borderBottomWidth: 0.5 }} />
                    {isInspector && <View>
                        <Text style={style.formTooltip}>Fecha de ingreso</Text>
                        <Text style={ style.textPerfil }  >{fecha}</Text>
                        <View style={{ borderBottomColor: '#24b6ff', borderBottomWidth: 0.5 }} />
                        <Text style={style.formTooltip}>Rubro</Text>
                        <Text style={ style.textPerfil }  >{rubro}</Text>
                        <View style={{ borderBottomColor: '#24b6ff', borderBottomWidth: 0.5 }} />
                    </View>}
                    {!isInspector &&
                        <View>

                            <Text style={style.formTooltip}>Documento</Text>
                            <Text value="123"style={ style.textPerfil }  >{documento}</Text>
                            <View style={{ borderBottomColor: '#24b6ff', borderBottomWidth: 0.5 }} />
                            <Text style={style.formTooltip}>Dirección</Text>
                            <Text style={ style.textPerfil }  >{direccion}</Text>
                            <View style={{ borderBottomColor: '#24b6ff', borderBottomWidth: 0.5, marginBottom: 10 }} />
                        </View>}



                    <TouchableOpacity onPress={() => navigation.navigate('')}>
                        <Text style={style.subtitle2}>Cambiar Contraseña</Text>

                    </TouchableOpacity>
                </View>
            </ScrollView>
        </>
    );
}

export default (Perfil);
