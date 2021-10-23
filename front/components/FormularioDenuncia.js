import React, { useState } from 'react';
import {
    Dimensions,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Marker } from 'react-native-maps';
import { format } from 'date-fns';
import { GOOGLE_PLACES_API_KEY } from '@env';
import Qs from 'qs';
import style from '../customProperties/Styles';
import MiVecindario from './MiVecindario';

function FormularioDenuncia(props) {
    const { navigation } = props;
    const [date, setDate] = useState();
    const [datePickerMode, setDatePickerMode] = useState('date');
    const [showDatePicker, setShowDatePicker] = useState(false);
    const [coordinates, setCoordinates] = useState();
    //   const [showMapPicker, setShowMapPicker] = useState(false);

    const onChange = (event, selectedDate) => {
        if (selectedDate !== undefined) {
            setDate(selectedDate);
        }

        if (datePickerMode === 'date') {
            setDatePickerMode('time');
        }

        if (datePickerMode === 'time') {
        // setDatePickerMode('date');
            setShowDatePicker(false);
        }

        if (selectedDate !== undefined) {
            setDate(selectedDate);
        }

        if (selectedDate === undefined) {
            setShowDatePicker(false);
        }
    };

    const onPressDateTimeButton = () => {
        setShowDatePicker(true);
    };

    // API google places
    // https://maps.googleapis.com/maps/api

    const getPlaceDetails = async function (data) {
        try {
            const request = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?${
                Qs.stringify({
                    key: GOOGLE_PLACES_API_KEY,
                    placeid: data.place_id,
                    language: 'es',
                })}`, {
                method: 'GET',
            });

            const response = await request.json();

            if (response) {
                // console.log(JSON.stringify(response));
                const { location } = response.result.geometry;
                setCoordinates([location.lat, location.lng]);

                const sitio = {
                    latitud: location.lat,
                    longitud: location.lng,
                    numero: response.result.address_components[0].short_name,
                    calle: response.result.address_components[1].short_name,
                    // entreCalleA: falta
                    // entreCalleB: falta
                    descripcion: response.result.name,
                    // aCargoDe: muy dificil de mapear
                    // apertura: muy dificil de mapear
                    // cierre: muy dificil de mapear
                    // comentarios: esto lo deberían poner en algun input los usuarios
                };

                console.log(JSON.stringify(sitio));
            }
        } catch (error) {
            console.log(error);
        }
    };

    //   const onPressMapButton = () => {
    //     setShowMapPicker(true);
    //   };

    return (
        <>
            <MiVecindario />
            <ScrollView
                style={style.formsContainer}
                keyboardShouldPersistTaps="handled"
            >
                <Text style={style.sectionTitle}>Crear nueva denuncia</Text>
                <Text style={style.formTooltip}>Nombre / Comercio</Text>
                <TextInput style={style.primaryTextInput} placeholder="Ingresá el nombre del vecino o comercio" />

                <Text style={style.formTooltip}>Dirección</Text>
                <View style={style.primaryTextInput}>
                    <GooglePlacesAutocomplete
                    // https://github.com/FaridSafi/react-native-google-places-autocomplete
                        placeholder="Buscar"
                        disableScroll
                        isRowScrollable={false}
                        currentLocationLabel="Ubicación actual"
                        onPress={(data = null) => {
                            getPlaceDetails(data);
                        }}
                        styles={{
                            textInputContainer: style.textInputContainer,
                        }}
                        timeout={1000}
                        query={{
                            key: GOOGLE_PLACES_API_KEY,
                            language: 'es',
                            components: 'country:arg',
                        }}
                    />
                </View>

                <View>
                    {coordinates && (
                    // https://github.com/react-native-maps/react-native-maps
                        <View style={{ flexDirection: 'row' }}>
                            <MapView
                                style={{
                                    width: (Dimensions.get('window').width - 4),
                                    height: 150,
                                    margin: 2,
                                }}
                                initialRegion={{
                                    latitude: coordinates[0],
                                    longitude: coordinates[1],
                                    latitudeDelta: 0.003,
                                    longitudeDelta: 0.0015,
                                }}
                            >
                                <Marker
                                    coordinate={{
                                        latitude: coordinates[0],
                                        longitude: coordinates[1],
                                    }}
                                />
                            </MapView>
                        </View>
                    )}
                </View>
                <Text style={style.formTooltip}>Comentarios del lugar</Text>
                <TextInput style={style.primaryTextInput} placeholder="Agregá cualquier detalle que creas necesario..." />

                <View style={{ flexDirection: 'row' }}>
                    <Text style={style.formTooltip}>Fecha y hora</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        style={style.primaryFormButton}
                        onPress={onPressDateTimeButton}
                    >
                        <Text style={style.primaryFormButtonText}>{(date === undefined) ? 'Seleccione' : `${format(date, 'dd MM yyyy, HH:mm')}`}</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    {showDatePicker && (
                        <DateTimePicker
                            testID="dateTimePicker"
                            value={(date || (new Date()))}
                            mode={datePickerMode}
                            is24Hour
                            display="default"
                            onChange={onChange}
                            locale="en"
                        />
                    )}
                </View>
                <Text style={style.formTooltip}>Comentanos tu problema</Text>
                <TextInput style={style.primaryTextInput} placeholder="Ingresa el motivo de la denuncia" />
                <Text style={style.formTooltip}>Subí los archivos de prueba</Text>
                <TextInput style={style.primaryTextInput} placeholder="Selecciona" />

                <TouchableOpacity
                    onPress={() => navigation.navigate('Menu')}
                    style={style.primaryNavigationButton}
                >
                    <Text style={style.primaryNavigationButtonText}>
                        Siguiente
                    </Text>
                </TouchableOpacity>

            </ScrollView>
        </>
    );
}

export default FormularioDenuncia;
