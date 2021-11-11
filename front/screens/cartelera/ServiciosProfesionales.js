/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import {
    Alert,
    Button,
    Dimensions,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    Image,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import base64 from 'react-native-base64';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIsFocused } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { ImageBrowser } from 'expo-image-picker-multiple';
import { format, isValid } from 'date-fns';
import { GOOGLE_PLACES_API_KEY } from '@env';
import Qs from 'qs';
import * as ImagePicker from 'expo-image-picker';
import * as yup from 'yup';
import { Formik } from 'formik';
import SelectDropdown from 'react-native-select-dropdown';
import style from '../../customProperties/Styles';
import MiVecindario from '../../components/MiVecindario';
import imagesUrls from '../../controllers/images';
import { crearSitio } from '../../controllers/sitios';
import { crearDenuncia } from '../../controllers/denuncias';

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
    const rubros = ['Abogado', 'Auditor', 'Contador', 'Consultor'];
    const [rubroElegido, setRubroElegido] = useState('');

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

    const onSubmit = async function (values) {
        setLoading(true);
        try {
            const imageUrls = await imagesUrls(photos);

            const sitioRes = await crearSitio(sitio, values.comentariosLugar);

            const res = await crearDenuncia({
                documento: documentoUsuario,
                idSitio: sitioRes.idSitio,
                descripcion: values.descripcion,
                nombreDenunciado: values.nombre,
                imagenesDenuncia: imageUrls,
            });

            if (res.denuncia) {
                navigation.navigate('Confirmacion', { tipo: 'denuncia', id: res.denuncia.idDenuncia });
            }
        } catch (e) {
            Alert.alert('Ha habido un error generando tu denuncia');
            console.log(e);
        } finally {
            setLoading(false);
        }
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
        nombre: yup.string().required('Por favor ingresá un nombre valido'),
        // direccion: yup.string().required(),
        fecha: yup.date(),
        descripcion: yup.string().required('Por favor ingresa comentarios acerca del problema'),
    });

    return (
        <>
            <MiVecindario navigation={navigation} />
            <Formik
                initialValues={{
                    contacto: '',
                    horarios:'',
                    nombre: '',
                    direccion: '',
                    descripcion: '',
                    fecha: '',
                    descripcion: '',
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
                    <ScrollView
                        style={style.formsContainer}
                        keyboardShouldPersistTaps="handled"
                    >

                        <Text style={style.sectionTitle}>Crear nueva denuncia</Text>
                        <Text style={style.formTooltip}>Medios de contacto</Text>
                        <TextInput
                            style={style.secondaryTextInput}
                            value={values.contacto}
                            onBlur={handleBlur('contacto')}
                            onChangeText={handleChange('contacto')}
                            placeholder="Ingresa tu numero"
                            underlineColor="#2984f2"
                        />
                        <Text style={style.formTooltip}>Horarios</Text>
                        <TextInput
                            style={style.secondaryTextInput}
                            value={values.horarios}
                            onBlur={handleBlur('horarios')}
                            onChangeText={handleChange('horarios')}
                            placeholder="Horarios"
                            underlineColor="#2984f2"
                        />
                         <Text style={style.formTooltip}>Rubro</Text>
                        <View style={{ justifyContent: 'center', alignItems: 'flex-start', left: -10 }}>
                       
                            <SelectDropdown
                                data={rubros}

                                onSelect={(selectedItem, index) => {
                                    console.log(selectedItem, index);
                                    setRubroElegido(selectedItem);
                                }}
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
                        <Text style={style.formTooltip}>Subí los archivos de prueba</Text>
                        <TouchableOpacity
                            onPress={() => { navigation.navigate('ImageBrowser'); }}
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
                            onPress={() => onSubmit(values)}
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
                )}

            </Formik>
        </>
    );
}

export default ServiciosProfesionales;
