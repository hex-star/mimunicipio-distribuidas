/* eslint-disable no-sequences */
/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import {
    ScrollView,
    Text,
} from 'react-native';
import { List } from 'react-native-paper';
import style from '../../customProperties/Styles';
import MiVecindario from '../../components/MiVecindario';
import { listarRubros } from '../../controllers/reclamos';

function FormularioReclamo(props) {
    // eslint-disable-next-line no-unused-vars
    const { navigation, route } = props;
    const [rubros, setRubros] = useState(null);

    // const rubros = [
    //     {
    //         nombre: 'Alumbrado',
    //         icon: 'led-on',
    //         desperfectos: [
    //             'Limpieza de equipamiento de alumbrado',
    //             'Mayor iluminación en calle',
    //             'Reparación de luminaria',
    //         ],
    //         color: '#fafad2',
    //     },
    //     {
    //         nombre: 'Arbolado',
    //         icon: 'tree',
    //         desperfectos: [
    //             'Poda de árbol y despeje de luminaria',
    //             'Plantación de árbol',
    //             'Extracción de árbol',
    //         ],
    //         color: '#90ee90',
    //     },
    //     {
    //         nombre: 'Control edilicio, obras y catastro',
    //         icon: 'office-building',
    //         desperfectos: [
    //             'Edificios',
    //             'Registro de obras y catastro',
    //             'Construcciones e instalaciones',
    //         ],
    //         color: '#d3d3d3',
    //     },
    //     {
    //         nombre: 'Educación',
    //         icon: 'school',
    //         desperfectos: [
    //             'Patio/jardín',
    //             'Baños',
    //             'Filtraciones',
    //         ],
    //         color: '#1e90ff',
    //     },
    //     {
    //         nombre: 'Limpieza y recoleción',
    //         icon: 'trash-can',
    //         desperfectos: [
    //             'Cestos y Contenedores',
    //             'Limpieza de vía pública',
    //             'Residuos Voluminosos',
    //         ],
    //         color: '#90ee90',
    //     },
    //     {
    //         nombre: 'Parques y plazas',
    //         icon: 'pine-tree',
    //         desperfectos: [
    //             'Horario de apertura y cierre',
    //             'Tareas de guardiandes de plaza',
    //             'Otros elementos',
    //         ],
    //         color: '#90ee90',
    //     },
    //     {
    //         nombre: 'Pluviales',
    //         icon: 'waves',
    //         desperfectos: [
    //             'Calle anegada',
    //             'Calle inundada',
    //             'Alcantarillas / sumideros',
    //         ],
    //         color: '#0ff',
    //     },
    //     {
    //         nombre: 'Reciclado y protección ambiental',
    //         icon: 'recycle',
    //         desperfectos: [
    //             'Uso indebido del agua',
    //             'Elementos con impacto ambiental',
    //             'Establecimientos con impacto ambiental',
    //         ],
    //         color: '#90ee90',
    //     },
    //     {
    //         nombre: 'Seguridad',
    //         icon: 'shield-star',
    //         desperfectos: [
    //             'Presencial policial',
    //         ],
    //         color: '#4b0082',
    //     },
    //     {
    //         nombre: 'Tránsito y transporte',
    //         icon: 'bus',
    //         desperfectos: [
    //             'Denuncia vial',
    //             'Cruce peligroso',
    //             'Subtes',
    //         ],
    //         color: '#191970',
    //     },
    // ];

    // creo el llamado a la api
    const fetchApi = async () => {
        // llamar a la api listarRubros
        const res = await listarRubros();
        console.log(res);
        // almaceno los datos
        setRubros(res.rubros);
    };

    useEffect(() => {
        fetchApi();
    }, []);

    return (
        <>
            <MiVecindario navigation={navigation} />
            <Text style={{
                color: '#34bdeb',
                fontSize: 25,
                paddingLeft: 20,
            }}
            // TODO - No usa Styles por el paddingLeft
            >
                Crear nuevo reclamo

            </Text>
            <ScrollView
                style={style.formsContainer}
                keyboardShouldPersistTaps="handled"
            >
                {/* <Searchbar
                    placeholder="¿Con qué se relaciona tu reclamo?"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                    style={{ wordwrap: 'break-word' }}
                /> */}
                {/* TODO MOSTRAR SOLO EL ACORDEON DEL RUBRO DEL INSPECTOR */}
                {
                    // && válida si no es nulo para renderizar.
                    rubros && rubros.map((rubro) => (
                        <List.Accordion
                            titleNumberOfLines={3}
                            title={rubro.descripcion}
                            left={() => <List.Icon style={{ borderRadius: 50 }} />}
                        >
                            {rubro.desperfectos.map((desperfecto) => (
                                <List.Item titleNumberOfLines={3} style={{ flexWrap: 'wrap' }} title={desperfecto.descripcion} onPress={() => navigation.navigate('Reclamo#2', { rubroD: rubro.descripcion, desperfectoD: desperfecto.descripcion, desperfectoI: desperfecto.idDesperfecto })} />
                            ))}
                        </List.Accordion>
                    ))
                }
            </ScrollView>
        </>
    );
}

export default FormularioReclamo;
