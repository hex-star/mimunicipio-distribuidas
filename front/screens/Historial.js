import React, { useEffect, useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity,
} from 'react-native';
import { List } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import MiVecindario from '../components/MiVecindario';
import style from '../customProperties/Styles';
import { listarDenuncias } from '../controllers/denuncias';

function Historial() {
    const [showDenuncias, setshowDenuncias] = useState(false);
    const [expandedR, setExpandedR] = useState(true);
    const [expandedD, setExpandedD] = useState(true);
    const handlePressR = () => setExpandedR(!expandedR);
    const handlePressD = () => setExpandedD(!expandedD);
    const [den, setDenuncias] = useState([]);

    async function fetchDenuncias() {
        const res = await listarDenuncias();

        if (res) {
            setDenuncias(res);
            // console.log(typeof (res))
            console.log("*********************************")
            console.log(res.denuncias[0])
        }
    }

    useEffect(() => {
        fetchDenuncias()
    }, []);



    return (
        <ScrollView style={style.formsContainer}>
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

            {/*
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
         */ }
            <List.Section title="Accordions">

                <List.Accordion
                    title="Reclamos"
                    left={(props) => <List.Icon {...props} icon="folder" />}
                    expanded={expandedR}
                    onPress={handlePressR}
                >
                    <Text>No hay reclamos</Text>
                </List.Accordion>

                <List.Accordion
                    title="Denuncias"
                    left={(props) => <List.Icon {...props} icon="folder" />}
                    expanded={expandedD}
                    onPress={handlePressD}
                 

                >
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

                    <View style={{ marginTop: 10 }}>
                        <View style={{ backgroundColor: 'grey' }}><Text style={{ marginLeft: 7.5 }}>Acoso</Text></View>

                        {den && den.denuncias &&
                            den.denuncias.map((denuncia) => {
                                return (
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#cfcfcf' }}>

                                        <View style={{ marginLeft: 7 }}>
                                            <Text>Denuncia: #{denuncia.idDenuncia}  </Text>
                                            <Text>Denunciante </Text>
                                           
                                            <Text></Text>
                                        </View>
                                        <View style={{ marginRight: 7 }}>
                                            <Text>Denunciado</Text>
                                            <Text>Nombre: {denuncia.detalleDenuncias[0].nombreDenunciado}</Text>
                                            <Text>Fecha: {denuncia.movimientosDenuncia[0].fecha}</Text>
                                        </View>

                                    </View>
                                );

                            })}

                    </View>

                </List.Accordion>
            </List.Section>

        </ScrollView>
    );
}

export default (Historial);
