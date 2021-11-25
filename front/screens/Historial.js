/* eslint-disable no-unused-expressions */
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
import { listarReclamos } from '../controllers/reclamos';
import { listarDenuncias, listarDenunciasUser } from '../controllers/denuncias';

function Historial(props) {
    const { navigation } = props;
    const [expandedR, setExpandedR] = useState(false);
    const [expandedD, setExpandedD] = useState(false);
    const handlePressR = () => setExpandedR(!expandedR);
    const handlePressD = () => setExpandedD(!expandedD);
    const [denuncias, setDenuncias] = useState([]);
    const [reclamos, setReclamos] = useState([]);
    const [token, setToken] = useState(null);
    const [tipo, setTipo] = useState();
    const [rubroI, setRubroI] = useState();

    async function fetchDenuncias() {
        setTipo(JSON.parse(base64.decode(await AsyncStorage.getItem('authToken'))).tipo);
        setRubroI(JSON.parse(base64.decode(await AsyncStorage.getItem('authToken'))).rubro);
        const async = await AsyncStorage.getItem('authToken');
        const token = await JSON.parse(base64.decode(async));
        setToken(token);
        var res = null;
        if (token && token.tipo == 'inspector') {
            // TODO fetch de todos los reclamos
            var res = await listarDenuncias();
        } else if (token && token.tipo == 'vecino') {
            var res = await listarDenunciasUser({
                documento: token.referencia,
            });
        }

        if (res && res.denuncias) {
            setDenuncias(res.denuncias);
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
        }
    }
    useEffect(() => {
        fetchReclamos();
        fetchDenuncias();
        console.log(rubroI);
        console.log(tipo);
    }, [rubroI]);

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
                            (tipo === 'vecino' || reclamo.desperfecto.rubro.descripcion === rubroI)
                            && (
                                <View style={{ marginTop: 10 }}>
                                    <View style={{ backgroundColor: 'grey', flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{
                                            marginLeft: 7.5, color: '#000', fontSize: 20, fontWeight: 'bold',
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
                                            <View style={{ flexDirection: 'row', maxWidth: '100%' }}>
                                                <Text style={style.historialPrimary}>
                                                    Rubro:
                                                    {' '}
                                                </Text>
                                                <Text style={style.historialSecondary}>
                                                    {reclamo.desperfecto.rubro.descripcion}
                                                </Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                                <Text style={style.historialPrimary}>
                                                    Desperfecto:
                                                    {' '}
                                                </Text>
                                                <View style={{ maxWidth: '100%' }}>
                                                    <Text style={style.historialSecondary}>
                                                        {reclamo.desperfecto.descripcion}
                                                    </Text>
                                                </View>
                                            </View>
                                            <View style={{ flexDirection: 'row', maxWidth: '100%' }}>
                                                <Text style={style.historialPrimary}>
                                                    Fecha:
                                                    {' '}
                                                </Text>
                                                <Text style={style.historialSecondary}>
                                                    {reclamo.movimientosReclamos[0].fecha.slice(0, 10)}
                                                </Text>
                                            </View>
                                            <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                                <Text style={style.historialPrimary}>
                                                    Detalle:
                                                    {' '}
                                                </Text>
                                                <Text style={style.historialSecondary}>
                                                    {reclamo.descripcion}
                                                </Text>
                                            </View>
                                            <Text style={style.historialPrimary}>Adjuntos</Text>
                                            {reclamo.imagenesReclamos.length !== 0 ? (
                                                <ScrollView contentContainerStyle={{ flexGrow: 1 }} horizontal style={{ flexDirection: 'row', marginTop: 10 }}>
                                                    {reclamo.imagenesReclamos.map((item, i) => renderImage(item, i))}
                                                </ScrollView>
                                            ) : (
                                                <Text style={style.historialSecondary}> No hay adjuntos</Text>
                                            )}
                                            <Text />
                                            <Text style={style.h1}>
                                                Derivaciones
                                            </Text>
                                            <View Style={{ flexDirection: 'row', maxWidth: '100%' }}>
                                                <Text style={style.historialSecondary}>
                                                    {reclamo.movimientosReclamos[0].causa}
                                                    {' '}
                                                    {' - Responsable:'}
                                                    {' '}
                                                    {reclamo.movimientosReclamos[0].responsable}
                                                </Text>
                                            </View>

                                        </View>

                                    </View>
                                </View>
                            )
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
                    <View style={{ marginTop: 10 }}>

                        { (denuncias.length !== 0 && tipo === 'vecino') ? (denuncias.map((denuncia) => (
                            <View style={{ marginTop: 10 }}>
                                <View style={{ flexDirection: 'row', backgroundColor: 'grey', justifyContent: 'space-between' }}>
                                    <Text style={{
                                        marginLeft: 7.5, color: '#000', fontSize: 20, fontWeight: 'bold',
                                    }}
                                    >
                                        Denuncia #
                                        {denuncia.idDenuncia}
                                    </Text>
                                    <Text
                                        style={{ color: '#ffff', marginRight: 10, fontSize: 17 }}
                                    >
                                        Estado:
                                        {' '}
                                        {denuncia.estado}
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
                                        <View style={{ flexDirection: 'row', maxWidth: '100%' }}>
                                            <Text style={style.historialPrimary}>
                                                Nombre:
                                                {' '}
                                            </Text>
                                            <Text style={style.historialSecondary}>
                                                {denuncia.detalleDenuncias[0].nombreDenunciado}
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', maxWidth: '100%' }}>
                                            <Text style={style.historialPrimary}>
                                                Fecha:
                                                {' '}
                                            </Text>
                                            <Text style={style.historialSecondary}>
                                                {denuncia.movimientosDenuncia[0].fecha.slice(0, 10)}
                                            </Text>
                                        </View>
                                        <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
                                            <Text style={style.historialPrimary}>
                                                Detalle:
                                                {' '}

                                            </Text>
                                            <Text style={style.historialSecondary}>
                                                {denuncia.descripcion}
                                            </Text>
                                        </View>
                                        <Text />
                                        <Text style={style.historialPrimary}>Adjuntos</Text>
                                        {denuncia.imagenesDenuncia.length !== 0 ? (
                                            <ScrollView contentContainerStyle={{ flexGrow: 1 }} horizontal style={{ flexDirection: 'row', marginTop: 10 }}>
                                                {denuncia.imagenesDenuncia.map((item, i) => renderImage(item, i))}
                                            </ScrollView>
                                        ) : (
                                            <Text style={style.historialSecondary}> No hay adjuntos</Text>
                                        )}
                                        <Text style={style.h1}>
                                            Derivaciones
                                        </Text>
                                        <View style={{ maxWidth: '100%' }}>
                                            <Text style={style.historialSecondary}>
                                                {denuncia.movimientosDenuncia[0].causa}
                                                {' '}
                                                {' - Responsable: '}
                                                {' '}
                                                {denuncia.movimientosDenuncia[0].responsable}
                                            </Text>
                                        </View>

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
