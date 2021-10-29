import React, { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity,
} from 'react-native';
import MiVecindario from '../components/MiVecindario';
import style from '../customProperties/Styles';

function Historial() {
    const [showDenuncias, setshowDenuncias] = useState(false);
    return (
        <View style={style.formsContainer}>
            <MiVecindario />
            <Text style={style.celesteText}>Historial</Text>
            <TextInput style={style.primaryTextInput}>aaaaa</TextInput>
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
                        <View style={{ backgroundColor: 'grey' }}><Text style={{ marginLeft: 7.5 }}>Acoso</Text></View>
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#cfcfcf' }}>
                            <View style={{ marginLeft: 7 }}>
                                <Text>Denuncia: #42</Text>
                                <Text>Denunciante</Text>
                                <Text>Nombre: Juan Carlos</Text>
                                <Text>Apellido: Rodriguez</Text>
                                <Text>Fecha</Text>
                                <Text>Dia : 22/06/2021</Text>
                                <Text>Hora : 3:35PM</Text>
                            </View>
                            <View style={{ marginRight: 7 }}>
                                <Text>Denunciado</Text>
                                <Text>Nombre: Pablo</Text>
                                <Text>Detalle</Text>
                                <Text>Bla bla bla</Text>
                            </View>
                        </View>

                    </View>
                )}

        </View>
    );
}

export default (Historial);
