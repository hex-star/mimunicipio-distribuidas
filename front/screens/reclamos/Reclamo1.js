import React from 'react';
import {
    ScrollView,
    Text,
} from 'react-native';
import { List } from 'react-native-paper';
import style from '../../customProperties/Styles';
import MiVecindario from '../../components/MiVecindario';

function FormularioReclamo(props) {
    // eslint-disable-next-line no-unused-vars
    const { navigation, route } = props;

    const rubros = [
        {
            nombre: 'Alumbrado',
            icon: 'led-on',
            desperfectos: [
                'Limpieza de equipamiento de alumbrado',
                'Mayor iluminación en calle',
                'Reparación de luminaria',
            ],
            color: '#fafad2',
        },
        {
            nombre: 'Arbolado',
            icon: 'tree',
            desperfectos: [
                'Poda de árbol y despeje de luminaria',
                'Plantación de árbol',
                'Extracción de árbol',
            ],
            color: '#90ee90',
        },
        {
            nombre: 'Control edilicio, obras y catastro',
            icon: 'office-building',
            desperfectos: [
                'Edificios',
                'Registro de obras y catastro',
                'Construcciones e instalaciones',
            ],
            color: '#d3d3d3',
        },
    ];

    return (
        <>
            <MiVecindario navigation={navigation} />
            <ScrollView
                style={style.formsContainer}
                keyboardShouldPersistTaps="handled"
            >

                <Text style={style.sectionTitle}>Crear nuevo reclamo</Text>
                {/* <Searchbar
                    placeholder="¿Con qué se relaciona tu reclamo?"
                    onChangeText={onChangeSearch}
                    value={searchQuery}
                    style={{ wordwrap: 'break-word' }}
                /> */}
                {/* TODO MOSTRAR SOLO EL ACORDEON DEL RUBRO DEL INSPECTOR */}
                {
                    rubros.map((rubro) => (
                        <List.Accordion
                            titleNumberOfLines={3}
                            title={rubro.nombre}
                            left={() => <List.Icon style={{ backgroundColor: rubro.color, borderRadius: '50px' }} icon={rubro.icon} />}
                        >
                            {rubro.desperfectos.map((desperfecto) => (
                                <List.Item titleNumberOfLines={3} style={{ flexWrap: 'wrap' }} title={desperfecto} onPress={() => navigation.navigate('Reclamo#2', { rubro: rubro.nombre, desperfecto })} />
                            ))}
                        </List.Accordion>
                    ))
                }

                {/* <List.Accordion
                    title="Alumbrado"
                    left={(props) => <List.Icon style={{ backgroundColor: '#fafad2', borderRadius: '50px' }} {...props} icon="led-on" />}
                >
                    <List.Item title="Limpieza de equipamiento de alumbrado" />
                    <List.Item title="Mayor iluminación en calle" />
                    <List.Item title="Reparación de luminaria" />
                </List.Accordion>
                <List.Accordion
                    title="Arbolado"
                    left={(props) => <List.Icon style={{ backgroundColor: '#90ee90', borderRadius: '50px' }} {...props} icon="tree" />}
                >
                    <List.Item title="Poda de árbol y despeje de luminaria" />
                    <List.Item title="Plantación de árbol" />
                    <List.Item title="Extracción de árbol" />
                </List.Accordion>
                <List.Accordion
                    title="Control edilicio, obras y catastro"
                    left={(props) => <List.Icon style={{ backgroundColor: '#d3d3d3', borderRadius: '50px' }} {...props} icon="office-building" />}
                >
                    <List.Item title="Edificios" />
                    <List.Item title="Registro de obras y catastro" />
                    <List.Item title="Construcciones e instalaciones" />
                </List.Accordion>
                <List.Accordion
                    title="Educación"
                    left={(props) => <List.Icon style={{ backgroundColor: '#1e90ff', borderRadius: '50px' }}{...props} icon="school" />}
                >
                    <List.Item title="Patio/jardín" />
                    <List.Item title="Baños" />
                    <List.Item title="Filtraciones" />
                </List.Accordion> */}

            </ScrollView>
        </>
    );
}

export default FormularioReclamo;
