import React, { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, Image, Alert,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import arrowDown from './../assets/arrowDown.png'
import MiVecindario from '../components/MiVecindario';
import style from '../customProperties/Styles';
import clip from '../assets/clip.png';

function Historial() {
    const [showDenuncias, setshowDenuncias] = useState(false);

    const search = () =>{
        
    }

    return (
        <ScrollView>
            <View style={style.formsContainer}>
                <MiVecindario />
                <Text style={style.celesteText}>Historial</Text>
                <TextInput style={style.primaryTextInput} onChange={search}></TextInput>
                <View
                    style={{
                        borderBottomColor: '#bcbcbc',
                        borderBottomWidth: 1,
                        marginTop: 2,
                    }}
                />
                <TouchableOpacity
                    style={style.historialButton}
                >
                    <Text style={style.primaryHistorialButtonText}>
                        Reclamos
                    </Text>

                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => setshowDenuncias(!showDenuncias)}
                    style={style.historialButton}
                >
                    <Text style={style.primaryHistorialButtonText}>
                        Denuncias
                    </Text>

                </TouchableOpacity>

                {showDenuncias
                    && (
                        <View style={{ marginTop: 10 }}>
                            <View style={{ backgroundColor: '#999999', flexDirection: 'row', justifyContent: 'space-between', padding: 2 }}>
                                <Text style={{ marginLeft: 7.5 }}>Acoso</Text>
                                <Image source={arrowDown} style={{ height: 20, width: 20, marginRight: 3 }} />
                            </View>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#dbd9d9' }}>
                                <View style={{ margin: 7 }}>
                                    <Text style={style.historialHeader}>Denuncia: #42</Text>
                                    <Text style={style.historialHeader}>Denunciante</Text>
                                    <Text style={style.historialText}>Nombre: Juan Carlos</Text>
                                    <Text style={style.historialText}>Apellido: Rodriguez</Text>
                                    <View style={{ marginTop: 5 }} />
                                    <Text style={style.historialHeader}>Fecha</Text>
                                    <Text style={style.historialText}>Dia : 22/06/2021</Text>
                                    <Text style={style.historialText}>Hora : 3:35PM</Text>
                                    <View style={{ marginTop: 5 }} />
                                    <Text style={style.historialHeader}>Evidencia (opcional)</Text>
                                    <TouchableOpacity title=""><Image source={clip} style={{ height: 20, width: 20,marginTop:2 }} /></TouchableOpacity>
                                    <View style={{ marginTop: 5 }} />
                                    <Text style={style.historialHeader}>Estado</Text>
                                    <Text style={style.historialText}>Pendiente</Text>
                                </View>
                                <View style={{ margin: 7 }}>
                                    <View style={{ marginTop: 20 }} />
                                    <Text style={style.historialHeader}>Denunciado</Text>
                                    <Text style={style.historialText}>Nombre: Pablo</Text>
                                    <Text style={style.historialText}>Apellido: Quintono</Text>
                                    <View style={{ marginTop: 5 }} />
                                    <Text style={style.historialHeader}>Detalle</Text>
                                    <Text style={style.historialText}>Bla bla bla</Text>
                                </View>
                            </View>

                        </View>
                    )}

            </View>
        </ScrollView>
    );
}

export default (Historial);
