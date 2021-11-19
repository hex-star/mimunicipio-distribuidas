import React, { useEffect, useState } from 'react';
import {
    Alert,
    Dimensions,
    ScrollView,
    Text,
    TouchableOpacity,
    View,
    Image,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useIsFocused } from '@react-navigation/native';
import MapView, { Marker } from 'react-native-maps';
import { GOOGLE_PLACES_API_KEY } from '@env';
import Qs from 'qs';
import base64 from 'react-native-base64';
import * as yup from 'yup';
import { Formik } from 'formik';
import style from '../../customProperties/Styles';
import MiVecindario from '../../components/MiVecindario';
import imagesUrls from '../../controllers/images';
import { crearSitio } from '../../controllers/sitios';
import { crearDenuncia } from '../../controllers/denuncias';

function FormularioReclamo(props) {
    const state = useState();
    const { navigation, route } = props;
    const { params } = route;
    const [photos, setPhotos] = useState([]);
    const [sitio, setSitio] = useState();
    const [loading, setLoading] = useState(false);
    const [coordinates, setCoordinates] = useState();
    const isFocused = useIsFocused();

    const { documento } = JSON.parse(base64.decode(params.authToken).toString());

    useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            if (params) {
                setPhotos(params.photos);
            }
        };
        bootstrapAsync();
    }, [props, isFocused, state]);

    const { rubro, desperfecto } = params;

    const onSubmit = async function (values) {
        setLoading(true);
        try {
            const imageUrls = await imagesUrls(photos);

            const sitioRes = await crearSitio(sitio, values.comentariosLugar);

            const res = await crearDenuncia({
                documento,
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
        // nombre: yup.string().required('Por favor ingresá un nombre valido'),
        // direccion: yup.string().required(),
        fecha: yup.date(),
        descripcion: yup.string().required('Por favor ingresa comentarios acerca del problema'),
    });

    return (
        <>
            <MiVecindario navigation={navigation} />
            <Formik
                initialValues={{
                    nombre: '',
                    direccion: '',
                    comentariosLugar: '',
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

                        <Text style={style.sectionTitle}>Crear nueva reclamo</Text>
                        <Text style={{
                            backgroundColor: '#00008b', color: '#fff', fontWeight: 'bold', padding: '10px',
                        }}
                        >
                            { rubro }

                        </Text>
                        <Text style={{
                            backgroundColor: '#00008b', color: '#fff', fontWeight: 'bold', padding: '10px',
                        }}
                        >
                            { desperfecto }

                        </Text>
                        <Text style={style.formTooltip}>Dirección</Text>
                        <View style={style.primaryTextInput}>
                            <GooglePlacesAutocomplete
                                // https://github.com/FaridSafi/react-native-google-places-autocomplete
                                placeholder="Ingresar una dirección"
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
                        <Text style={style.formTooltip}>Comentanos tu problema</Text>
                        <TextInput
                            style={style.primaryTextInput}
                            value={values.descripcion}
                            onBlur={handleBlur('descripcion')}
                            onChangeText={handleChange('descripcion')}
                            placeholder="Ingresa el motivo de tu reclamo"
                            underlineColor="#2984f2"
                        />
                        {(errors.descripcion && touched.descripcion)
                            && <Text style={style.errors}>{errors.descripcion}</Text>}
                        <Text style={style.formTooltip}>Subí los archivos de prueba</Text>
                        <TouchableOpacity
                            onPress={() => { navigation.navigate('ImageBrowser', { maxImagenes: 7 }); }}
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
                            ) }

                        </TouchableOpacity>
                    </ScrollView>
                )}

            </Formik>
        </>
    );
}

export default FormularioReclamo;
