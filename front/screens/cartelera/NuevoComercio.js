/* eslint-disable prefer-template */
import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    Image,
} from 'react-native';
import { TextInput, List } from 'react-native-paper';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import base64 from 'react-native-base64';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { GOOGLE_PLACES_API_KEY } from '@env';
import Qs from 'qs';
import * as yup from 'yup';
import { Formik } from 'formik';
import style from '../../customProperties/Styles';
import MiVecindario from '../../components/MiVecindario';
import imagesUrls from '../../controllers/images';
import { crearSitio } from '../../controllers/sitios';
import { crearPublicacion } from '../../controllers/publicaciones';

function NuevoComercio(props) {
    const state = useState();
    const { navigation, route } = props;
    const { params } = route;
    const [photos, setPhotos] = useState([]);
    const [sitio, setSitio] = useState();
    // const [date, setDate] = useState();
    // const [datePickerMode, setDatePickerMode] = useState('date');
    // const [showDatePicker, setShowDatePicker] = useState(false);
    const [loading, setLoading] = useState(false);
    const [documentoUsuario, setDocumentoUsuario] = useState('');
    const [coordinates, setCoordinates] = useState();
    const isFocused = useIsFocused();
    const rubros = ['Promocion', 'Oferta'];
    const [rubroElegido, setRubroElegido] = useState('');
    const [expanded, setExpanded] = React.useState(true);
    const [direccion, setdireccion] = useState('');

    const handlePress = () => setExpanded(!expanded);

    useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            if (params) {
                setPhotos(params.photos);
            }
            setDocumentoUsuario(JSON.parse(base64.decode(await AsyncStorage.getItem('authToken'))).referencia);
        };
        bootstrapAsync();
    }, [props, isFocused, state]);

    const onSubmit = async function (values, direccion) {
        const imageUrls = await imagesUrls(photos);
        const aux = JSON.parse(base64.decode(await AsyncStorage.getItem('authToken')));
        const sitioRes = await crearSitio(sitio, values.comentariosLugar);
        const horarios = values.lunesA + ',' + values.lunesH + ',' + values.martesA + ',' + values.martesH + ',' + values.miercolesA + ',' + values.miercolesH + ',' + values.juevesA + ',' + values.juevesH + ',' + values.viernesA + ',' + values.viernesH + ',' + values.sabadoA + ',' + values.sabadoH + ',' + values.domingoA + ',' + values.domingoH;
        console.log(horarios);

        const res = await crearPublicacion({
            documento: aux.referencia,
            idSitio: sitioRes.idSitio,
            descripcion: values.descripcion,
            titulo: values.nombre,
            telefono: values.telefono,
            horarios,
            rubro: '',
            imagenesPublicacion: imageUrls,
        });
        navigation.navigate('Confirmacion', { tipo: 'publicacion', id: res.publicacion.idPublicacion });
    };

    // API google places
    // https://maps.googleapis.com/maps/api

    const getPlaceDetails = async function (data) {
        try {
            const request = await fetch(`https://maps.googleapis.com/maps/api/place/details/json?${Qs.stringify({
                key: GOOGLE_PLACES_API_KEY,
                placeid: data.place_id,
                language: 'es',
            })}`, {
                method: 'GET',
            });

            const response = await request.json();

            if (response) {
                const { location } = response.result.geometry;
                setCoordinates([location.lat, location.lng]);
                setSitio({
                    latitud: location.lat,
                    longitud: location.lng,
                    numero: response.result.address_components[0].short_name,
                    calle: response.result.address_components[1].short_name,
                    descripcion: response.result.name,
                });
            }
        } catch (error) {
            console.log(error);
        }
    };

    const renderImage = function (item, i) {
        return (
            <Image
                style={{ height: 115, width: 115 }}
                source={{ uri: item.uri }}
                key={i}
            />
        );
    };

    const denunciaValidationSchema = yup.object().shape({
        nombre: yup.string().required('Por favor ingresá un nombre valido'),
        // direccion: yup.string().required(),

        descripcion: yup.string().max(1000, 'La descripción puede contener como máximo 1000 caracteres').required('Por favor ingresa comentarios acerca del problema'),
    });

    return (
        <>
            <MiVecindario navigation={navigation} />
            <Formik
                initialValues={{
                    telefono: '',
                    nombre: '',
                    descripcion: '',
                    lunesA: '',
                    lunesH: '',
                    martesA: '',
                    martesH: '',
                    miercolesA: '',
                    miercolesH: '',
                    juevesA: '',
                    juevesH: '',
                    viernesA: '',
                    viernesH: '',
                    sabadoA: '',
                    sabadoH:'',
                    domingoA: '',
                    domingoH: '',
                    direccion: '',
                }}
                validationSchema={denunciaValidationSchema}
                onSubmit={(values, direccion) => {
                    onSubmit(values, direccion);
                }}
            >
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    values,
                    errors,
                    touched,
                    isValid,
                }) => (

                    <>
                        <Text style={style.sectionTitle}>Crear nueva publicación</Text>
                        <ScrollView
                            style={style.formsContainer}
                            keyboardShouldPersistTaps="handled"
                        >

                            <Text style={style.formTooltip}>Nombre del Comercio</Text>
                            <TextInput
                                style={style.secondaryTextInput}
                                value={values.nombre}
                                onBlur={handleBlur('nombre')}
                                onChangeText={handleChange('nombre')}
                                placeholder="Ingrese el nombre del comercio"
                                underlineColor="#2984f2"
                            />

                            {(errors.nombre && touched.nombre)
                            && <Text style={style.errors}>{errors.nombre}</Text>}
                            <Text style={style.formTooltip}>Medios de contacto</Text>
                            <TextInput
                                style={style.secondaryTextInput}
                                value={values.telefono}
                                onBlur={handleBlur('telefono')}
                                onChangeText={handleChange('telefono')}
                                placeholder="Ingresa tu numero"
                                underlineColor="#2984f2"
                            />

                            <List.Accordion
                                title="Horarios"
                                left={(props) => <List.Icon {...props} icon="clock" />}
                                expanded={expanded}
                                onPress={handlePress}
                            >

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ alignSelf: 'center',minWidth:70 }}>Lunes:</Text>
                                    <TextInput
                                        style={style.secondaryTextInput}
                                        value={values.lunesA}
                                        onBlur={handleBlur('lunesA')}
                                        onChangeText={handleChange('lunesA')}
                                        placeholder=""
                                        underlineColor="#2984f2"
                                    />
                                    <Text style={{ alignSelf: 'center' }}>a</Text>
                                    <TextInput
                                        style={style.secondaryTextInput}
                                        value={values.lunesH}
                                        onBlur={handleBlur('lunesH')}
                                        onChangeText={handleChange('lunesH')}
                                        placeholder=""
                                        underlineColor="#2984f2"
                                    />
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ alignSelf: 'center',minWidth:70 }}>Martes:</Text>
                                    <TextInput
                                        style={style.secondaryTextInput}
                                        value={values.martesA}
                                        onBlur={handleBlur('martesA')}
                                        onChangeText={handleChange('martesA')}
                                        placeholder=""
                                        underlineColor="#2984f2"
                                    />
                                    <Text style={{ alignSelf: 'center' }}>a</Text>
                                    <TextInput
                                        style={style.secondaryTextInput}
                                        value={values.martesH}
                                        onBlur={handleBlur('martesH')}
                                        onChangeText={handleChange('martesH')}
                                        placeholder=""
                                        underlineColor="#2984f2"
                                    />
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ alignSelf: 'center',minWidth:70 }}>Miercoles:</Text>
                                    <TextInput
                                        style={style.secondaryTextInput}
                                        value={values.miercolesA}
                                        onBlur={handleBlur('miercolesA')}
                                        onChangeText={handleChange('miercolesA')}
                                        placeholder=""
                                        underlineColor="#2984f2"
                                    />
                                    <Text style={{ alignSelf: 'center' }}>a</Text>
                                    <TextInput
                                        style={style.secondaryTextInput}
                                        value={values.miercolesH}
                                        onBlur={handleBlur('miercolesH')}
                                        onChangeText={handleChange('miercolesH')}
                                        placeholder=""
                                        underlineColor="#2984f2"
                                    />
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ alignSelf: 'center',minWidth:70 }}>Jueves:</Text>
                                    <TextInput
                                        style={style.secondaryTextInput}
                                        value={values.juevesA}
                                        onBlur={handleBlur('juevesA')}
                                        onChangeText={handleChange('juevesA')}
                                        placeholder=""
                                        underlineColor="#2984f2"
                                    />
                                    <Text style={{ alignSelf: 'center' }}>a</Text>
                                    <TextInput
                                        style={style.secondaryTextInput}
                                        value={values.juevesH}
                                        onBlur={handleBlur('juevesH')}
                                        onChangeText={handleChange('juevesH')}
                                        placeholder=""
                                        underlineColor="#2984f2"
                                    />
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ alignSelf: 'center',minWidth:70 }}>Viernes:</Text>
                                    <TextInput
                                        style={style.secondaryTextInput}
                                        value={values.viernesA}
                                        onBlur={handleBlur('viernesA')}
                                        onChangeText={handleChange('viernesA')}
                                        placeholder=""
                                        underlineColor="#2984f2"
                                    />
                                    <Text style={{ alignSelf: 'center' }}>a</Text>
                                    <TextInput
                                        style={style.secondaryTextInput}
                                        value={values.viernesH}
                                        onBlur={handleBlur('viernesH')}
                                        onChangeText={handleChange('viernesH')}
                                        placeholder=""
                                        underlineColor="#2984f2"
                                    />
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ alignSelf: 'center',minWidth:70 }}>Sabado:</Text>
                                    <TextInput
                                        style={style.secondaryTextInput}
                                        value={values.sabadoA}
                                        onBlur={handleBlur('sabadoA')}
                                        onChangeText={handleChange('sabadoA')}
                                        placeholder=""
                                        underlineColor="#2984f2"
                                    />
                                    <Text style={{ alignSelf: 'center' }}>a</Text>
                                    <TextInput
                                        style={style.secondaryTextInput}
                                        value={values.sabadoH}
                                        onBlur={handleBlur('sabadoH')}
                                        onChangeText={handleChange('sabadoH')}
                                        placeholder=""
                                        underlineColor="#2984f2"
                                    />
                                </View>
                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ alignSelf: 'center',minWidth:70 }}>Domingo:</Text>
                                    <TextInput
                                        style={style.secondaryTextInput}
                                        value={values.domingoA}
                                        onBlur={handleBlur('domingoA')}
                                        onChangeText={handleChange('domingoA')}
                                        placeholder=""
                                        underlineColor="#2984f2"
                                    />
                                    <Text style={{ alignSelf: 'center' }}>a</Text>
                                    <TextInput
                                        style={style.secondaryTextInput}
                                        value={values.domingoH}
                                        onBlur={handleBlur('domingoH')}
                                        onChangeText={handleChange('domingoH')}
                                        placeholder=""
                                        underlineColor="#2984f2"
                                    />
                                </View>

                            </List.Accordion>

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
                            <Text style={style.formTooltip}>Descripción</Text>
                            <TextInput
                                style={style.secondaryTextInput}
                                value={values.descripcion}
                                onBlur={handleBlur('descripcion')}
                                onChangeText={handleChange('descripcion')}
                                placeholder="Ingresa la descripcion del servicio"
                                underlineColor="#2984f2"
                            />

                            {(errors.descripcion && touched.descripcion)
                            && <Text style={style.errors}>{errors.descripcion}</Text>}
                            <Text style={style.formTooltip}>Subí las fotos</Text>
                            <TouchableOpacity
                                onPress={() => { navigation.navigate('ImageBrowser', { navigateBackTo: 'NuevoComercio', maxImagenes: 5 }); }}
                                style={style.primaryFormButton}
                            >
                                <Text style={style.primaryFormButtonText}>
                                    Seleccionar imágenes
                                </Text>

                            </TouchableOpacity>
                            {photos ? (
                                <View style={{ flexDirection: 'row', marginTop: 10 }}>
                                    {photos.map((item, i) => renderImage(item, i))}
                                </View>
                            ) : (
                                <></>
                            )}
                            <TouchableOpacity
                                onPress={() => onSubmit(values, direccion)}
                                style={style.primaryNavigationButton}
                                disabled={!isValid}
                            >
                                {loading ? (
                                    <Text style={style.primaryNavigationButtonText}>
                                        Cargando
                                    </Text>
                                ) : (
                                    <Text style={style.primaryNavigationButtonText}>
                                        Siguiente
                                    </Text>
                                )}

                            </TouchableOpacity>
                        </ScrollView>

                    </>
                )}

            </Formik>
        </>
    );
}

export default NuevoComercio;
