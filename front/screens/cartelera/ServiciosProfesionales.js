/* eslint-disable prefer-template */
/* eslint-disable react/jsx-props-no-multi-spaces */
/* eslint-disable implicit-arrow-linebreak */
/* eslint-disable max-len */
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
import SelectDropdown from 'react-native-select-dropdown';
import style from '../../customProperties/Styles';
import MiVecindario from '../../components/MiVecindario';
import imagesUrls from '../../controllers/images';
import { crearSitio } from '../../controllers/sitios';
import { crearPublicacion } from '../../controllers/publicaciones';

function ServiciosProfesionales(props) {
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
    const rubros = ['Abogado/a', 'Auditor/a', 'Contador/a', 'Consultor/a', 'Doméstica', 'Mecánico/a'];
    const [rubroElegido, setRubroElegido] = useState('');
    const [expanded, setExpanded] = React.useState(true);

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

    const onSubmit = async function (values, rubro) {
        const imageUrls = await imagesUrls(photos);
        const aux = JSON.parse(base64.decode(await AsyncStorage.getItem('authToken')));
        const sitioRes = await crearSitio(sitio, values.comentariosLugar);
        const horarios = values.lunesA + ',' + values.lunesH + ',' + values.martesA + ',' + values.martesH + ',' + values.miercolesA + ',' + values.miercolesH + ',' + values.juevesA + ',' + values.juevesH + ',' + values.viernesA + ',' + values.viernesH + ',' + values.sabadoA + ',' + values.sabadoH + ',' + values.domingoA + ',' + values.domingoH;
        const res = await crearPublicacion({
            documento: aux.referencia,
            idSitio: sitioRes.idSitio,
            descripcion: values.descripcion,
            titulo: values.titulo,
            telefono: values.numero,
            mail: values.mail,
            horarios,
            rubro,
            imagenesPublicacion: imageUrls,
        });

        console.log(res);
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
                // console.log(JSON.stringify(response));
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

        // direccion: yup.string().required(),
        fecha: yup.date(),
        descripcion: yup.string().required('Por favor ingresa una descripcion'),
        titulo: yup.string().required('Por favor ingresa un titulo'),
    });

    return (
        <>
            <MiVecindario navigation={navigation} />
            <Formik
                initialValues={{
                    numero: '',
                    mail: '',
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
                    sabadoH: '',
                    domingoA: '',
                    domingoH: '',
                    direccion: '',
                    descripcion: '',
                    titulo: '',

                }}
                validationSchema={denunciaValidationSchema}
                onSubmit={(values) => {
                    onSubmit(values);
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

                            <Text style={style.formTooltip}>Medios de contacto</Text>
                            <TextInput
                                style={style.secondaryTextInput}
                                value={values.numero}
                                onBlur={handleBlur('numero')}
                                onChangeText={handleChange('numero')}
                                placeholder="Ingresa tu numero"
                                underlineColor="#2984f2"
                            />
                            <Text style={style.formTooltip}>Mail</Text>
                            <TextInput
                                style={style.secondaryTextInput}
                                value={values.mail}
                                onBlur={handleBlur('mail')}
                                onChangeText={handleChange('mail')}
                                placeholder="Ingresa tu mail"
                                underlineColor="#2984f2"
                            />

                            <List.Accordion
                                title="Horarios"
                                left={(props) => <List.Icon {...props} icon="clock" />}
                                expanded={expanded}
                                onPress={handlePress}
                            >

                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ alignSelf: 'center' }}>Lunes:</Text>
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
                                    <Text style={{ alignSelf: 'center' }}>Martes:</Text>
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
                                    <Text style={{ alignSelf: 'center' }}>Miercoles:</Text>
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
                                    <Text style={{ alignSelf: 'center' }}>Jueves:</Text>
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
                                    <Text style={{ alignSelf: 'center' }}>Viernes:</Text>
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
                                    <Text style={{ alignSelf: 'center' }}>Sabado:</Text>
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
                                    <Text style={{ alignSelf: 'center' }}>Domingo:</Text>
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

                            <Text style={style.formTooltip}>Rubro</Text>
                            <View style={{ justifyContent: 'center', alignItems: 'flex-start', left: -10 }}>

                                <SelectDropdown
                                    data={rubros}
                                    onChangeText={handleChange('rubro')}
                                    onSelect={(selectedItem, index) => {
                                        console.log(selectedItem, index);
                                        setRubroElegido(selectedItem);
                                    }}
                                    defaultButtonText="Seleccione"
                                    buttonTextAfterSelection={(selectedItem, index) =>
                                    // text represented after item is selected
                                    // if data array is an array of objects then return selectedItem.property to render after item is selected
                                        selectedItem}
                                    rowTextForSelection={(item, index) =>
                                    // text represented for each item in dropdown
                                    // if data array is an array of objects then return item.property to represent item in dropdown
                                        item}
                                />
                            </View>

                            <View
                                style={{
                                    borderBottomColor: '#2984f2',
                                    borderBottomWidth: 1,
                                }}
                            />

                            {(errors.nombre && touched.nombre)
                            && <Text style={style.errors}>{errors.nombre}</Text>}
                            <Text style={style.formTooltip}>Dirección</Text>
                            <View style={style.primaryTextInput}>
                                <GooglePlacesAutocomplete
                                // https://github.com/FaridSafi/react-native-google-places-autocomplete
                                    placeholder="Buscar"
                                    disableScroll
                                    isRowScrollable={false}
                                    currentLocationLabel="Ubicación actual"

                                    onPress={(data = null) => {
                                        console.log(data);
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
                                <Text style={style.formTooltip}>Titulo</Text>
                                <TextInput
                                    style={style.secondaryTextInput}
                                    value={values.titulo}
                                    onBlur={handleBlur('titulo')}
                                    onChangeText={handleChange('titulo')}
                                    placeholder="Ingresa el nombre del servicio"
                                    underlineColor="#2984f2"
                                />
                                {(errors.titulo && touched.titulo)
                                && <Text style={style.errors}>{errors.titulo}</Text>}
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
                            <Text style={style.formTooltip}>Subí fotos relacionadas al servicio</Text>
                            <TouchableOpacity
                                onPress={() => { navigation.navigate('ImageBrowser', { navigateBackTo: 'ServiciosProfesionales', maxImagenes: 5 }); }}
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
                                onPress={() => onSubmit(values, rubroElegido)}
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

export default ServiciosProfesionales;
