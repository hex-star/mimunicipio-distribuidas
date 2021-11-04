import React, { useEffect, useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity,
} from 'react-native';
import { List } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import MiVecindario from '../components/MiVecindario';
import style from '../customProperties/Styles';
import { listarDenuncias } from '../controllers/denuncias';

function Historial(props) {
    const { navigation } = props
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
            console.log('*********************************');
            console.log(typeof (res.denuncias[0].movimientosDenuncia[0].fecha));
        }
    }

    useEffect(() => {
        fetchDenuncias();
    }, []);

    return (
        <ScrollView style={style.formsContainer}>
            <MiVecindario navigation={navigation} />
            <Text style={style.celesteText}>Historial</Text>
            <TextInput style={style.primaryTextInput}></TextInput>
            <View
                style={{
                    borderBottomColor: '#bcbcbc',
                    borderBottomWidth: 1,
                    marginTop: 2,
                }}
            />




            <List.Section>

                <List.Accordion
                    title="Reclamos"
                    style={style.historialButton}
                    titleStyle={{ color: '#fff', marginLeft: 40, fontSize: 20, alignSelf: 'center' }}
                    expanded={expandedR}
                    onPress={handlePressR}
                >
                    <Text style={{ alignSelf: 'center', fontSize: 20, marginTop: 5 }}>No hay reclamos</Text>
                </List.Accordion>

                <List.Accordion
                    title="Denuncias"
                    style={style.historialButton}
                    titleStyle={{ color: '#fff', marginLeft: 40, fontSize: 20, alignSelf: 'center' }}
                    expanded={expandedD}
                    onPress={handlePressD}

                >
                    {/* <View style={{ marginTop: 10 }}>
                        <View style={{ backgroundColor: 'grey' }}><Text style={{ marginLeft: 7.5 }}>Acoso</Text></View>
                        <View style={{ flexDirection: 'column', justifyContent: 'space-between', backgroundColor: '#cfcfcf' }}>
                            <View style={{ marginLeft: 7 }}>
                                <Text>Denuncia: #42</Text>
                                <Text>Denunciante</Text>
                                <Text>Nombre: Juan Carlos</Text>
                                <Text>Apellido: Rodriguez</Text>
                                <Text>Fecha</Text>
                                <Text>Dia : 22/06/2021</Text>
                                <Text>Hora : 3:35PM</Text>
                            </View>
                            <View style={{ marginLeft: 7 }}>
                                <Text>Denunciado</Text>
                                <Text>Nombre: Pablo</Text>
                                <Text>Detalle</Text>
                                <Text>Bla bla bla</Text>
                            </View>
                        </View>
                    </View>*/}

                    <View style={{ marginTop: 10 }}>


                        {den && den.denuncias
                            && den.denuncias.map((denuncia) => (
                                <View style={{ marginTop: 10 }}>
                                    <View style={{ backgroundColor: 'grey' }}><Text style={{ marginLeft: 7.5, color: '#000', fontSize: 17, fontWeight: 'bold' }}>Denuncia #{denuncia.idDenuncia}</Text></View>
                                    <View style={{ flexDirection: 'column', justifyContent: 'space-between', backgroundColor: '#cfcfcf' }}>

                                        <View style={{ marginLeft: 7 }}>

                                            <Text style={style.h1}>Denunciante </Text>
                                            <Text>Nombre: Desconocido </Text>

                                            <Text />
                                        </View>
                                        <View style={{ marginBottom:5,marginLeft: 7, flexWrap: 'wrap' }}>
                                            <Text style={style.h1}>Denunciado</Text>
                                            <Text>
                                                Nombre:
                                                {denuncia.detalleDenuncias[0].nombreDenunciado}
                                            </Text>
                                            <Text>
                                                Fecha:
                                                {denuncia.movimientosDenuncia[0].fecha.slice(0, 10)}
                                            </Text>
                                            <Text style={{ flexWrap: 'wrap' }}>
                                                Detalle:
                                                {denuncia.descripcion}
                                            </Text>
                                            <Text />
                                            <Text style={style.h1}>
                                                Derivaciones
                                            </Text>
                                            <Text >
                                                Ninguna
                                            </Text>
                                            
                                        </View>

                                    </View>
                                </View>
                            ))}

                    </View>

                </List.Accordion>
            </List.Section>

        </ScrollView>
    );
}

export default (Historial);
