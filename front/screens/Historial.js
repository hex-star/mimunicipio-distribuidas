/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import {
    View, Text, Image,
} from 'react-native';
import { List } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import base64 from 'react-native-base64';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MiVecindario from '../components/MiVecindario';
import style from '../customProperties/Styles';
import { listarDenuncias } from '../controllers/denuncias';
import { listarReclamos } from '../controllers/reclamos';

function Historial(props) {
    const { navigation } = props;
    const [expandedR, setExpandedR] = useState(false);
    const [expandedD, setExpandedD] = useState(false);
    const handlePressR = () => setExpandedR(!expandedR);
    const handlePressD = () => setExpandedD(!expandedD);
    const [denuncias, setDenuncias] = useState([]);
    const [reclamos, setReclamos] = useState([]);
    const [token, setToken] = useState(null);

    async function fetchDenuncias() {
        const async = await AsyncStorage.getItem('authToken');
        const token = JSON.parse(base64.decode(async));
        // console.log(token);
        setToken(token);
        if (token && token.tipo == 'inspector') {
            // TODO fetch de todos los reclamos
        }

        const res = await listarDenuncias();

        if (res.denuncias) {
            setDenuncias(res.denuncias);
            // console.log(typeof (res))
            console.log('*********************************');
            console.log(typeof (res.denuncias[0].movimientosDenuncia[0].fecha));
        }
    }

    async function fetchReclamos() {
        const async = await AsyncStorage.getItem('authToken');
        const token = JSON.parse(base64.decode(async));
        setToken(token);
        if (token && token.tipo == 'inspector') {
            // TODO fetch de todos los reclamos
        }

        const res = await listarReclamos();

        if (res.reclamos) {
            setReclamos(res.reclamos);
            console.log('//////////');
            console.log(reclamos);
        }
    }
    useEffect(() => {
        fetchDenuncias();
    }, []);
    useEffect(() => {
        fetchReclamos();
    }, []);

    const renderImage = function (item, i) {
        return (
            <Image
                style={{ height: 100, width: 100 }}
                source={{ uri: item.url }}
                key={i}
            />
        );
    };

    return (
        <ScrollView style={style.formsContainer}>
            <MiVecindario navigation={navigation} />
            <Text style={style.celesteText}>Historial</Text>
            {/** <TextInput style={style.primaryTextInput} />
                <View
                style={{
                    borderBottomColor: '#bcbcbc',
                    borderBottomWidth: 1,
                    marginTop: 2,
                }}
            /> */}

            <List.Section>

                <List.Accordion
                    title="Reclamos"
                    style={style.historialButton}
                    titleStyle={{
                        color: '#fff', marginLeft: 40, fontSize: 20, alignSelf: 'center',
                    }}
                    expanded={expandedR}
                    onPress={handlePressR}
                >
                    <View style={{ marginTop: 10 }}>

                        { (reclamos.length !== 0) ? (reclamos.map((reclamo) => (
                            <View style={{ marginTop: 10 }}>
                                <View style={{ backgroundColor: 'grey', flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{
                                        marginLeft: 7.5, color: '#000', fontSize: 17, fontWeight: 'bold',
                                    }}
                                    >
                                        Reclamo #
                                        {reclamo.idReclamo}
                                    </Text>
                                    <Text style={{ color: '#ffff', marginRight: 10, fontSize: 17 }}>
                                        Estado:
                                        {' '}
                                        {reclamo.estado}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'column', justifyContent: 'space-between', backgroundColor: '#cfcfcf' }}>

                                    <View style={{ marginLeft: 7 }}>

                                        {/* <Text style={style.h1}>Denunciante </Text>
                <Text>Nombre: Desconocido </Text> */}

                                        <Text />
                                    </View>
                                    <View style={{ marginBottom: 5, marginLeft: 7, flexWrap: 'wrap' }}>
                                        <Text>
                                            Rubro:
                                            {' '}
                                            {reclamo.desperfecto.rubro.descripcion}
                                        </Text>
                                        <Text>
                                            Desperfecto:
                                            {' '}
                                            {reclamo.desperfecto.descripcion}
                                        </Text>
                                        <Text>
                                            Fecha:
                                            {' '}
                                            {reclamo.movimientosReclamos[0].fecha.slice(0, 10)}
                                        </Text>
                                        <Text style={{ maxWidth: '100%' }}>
                                            Detalle:
                                            {' '}
                                            {reclamo.descripcion}
                                        </Text>
                                        {reclamo.imagenesReclamos ? (
                                            <ScrollView contentContainerStyle={{ flexGrow: 1 }} horizontal style={{ flexDirection: 'row', marginTop: 10 }}>
                                                {reclamo.imagenesReclamos.map((item, i) => renderImage(item, i))}
                                            </ScrollView>
                                        ) : (
                                            <></>
                                        )}
                                        <Text />
                                        <Text style={style.h1}>
                                            Derivaciones
                                        </Text>
                                        <Text style={{ maxWidth: '100%' }}>
                                            {reclamo.movimientosReclamos[0].causa}
                                            {' '}
                                            {' - Responsable:'}
                                            {' '}
                                            {reclamo.movimientosReclamos[0].responsable}
                                        </Text>

                                    </View>

                                </View>
                            </View>
                        ))) : (
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ alignSelf: 'center', fontSize: 20, marginTop: 5 }}>No hay reclamos.</Text>
                            </View>
                        )}

                    </View>
                </List.Accordion>

                <List.Accordion
                    title="Denuncias"
                    style={style.historialButton}
                    titleStyle={{
                        color: '#fff', marginLeft: 40, fontSize: 20, alignSelf: 'center',
                    }}
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
                    </View> */}

                    <View style={{ marginTop: 10 }}>

                        { (denuncias.length !== 0) ? (denuncias.map((denuncia) => (
                            <View style={{ marginTop: 10 }}>
                                <View style={{ backgroundColor: 'grey' }}>
                                    <Text style={{
                                        marginLeft: 7.5, color: '#000', fontSize: 17, fontWeight: 'bold',
                                    }}
                                    >
                                        Denuncia #
                                        {denuncia.idDenuncia}
                                    </Text>
                                </View>
                                <View style={{ flexDirection: 'column', justifyContent: 'space-between', backgroundColor: '#cfcfcf' }}>

                                    <View style={{ marginLeft: 7 }}>

                                        {/* <Text style={style.h1}>Denunciante </Text>
                                        <Text>Nombre: Desconocido </Text> */}

                                        <Text />
                                    </View>
                                    <View style={{ marginBottom: 5, marginLeft: 7, flexWrap: 'wrap' }}>
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
                                        <Text>
                                            Ninguna
                                        </Text>

                                    </View>

                                </View>
                            </View>
                        ))) : (
                            <View style={{ marginTop: 10 }}>
                                <Text style={{ alignSelf: 'center', fontSize: 20, marginTop: 5 }}>No hay denuncias.</Text>
                            </View>
                        )}

                    </View>

                </List.Accordion>
            </List.Section>

        </ScrollView>
    );
}

export default (Historial);
