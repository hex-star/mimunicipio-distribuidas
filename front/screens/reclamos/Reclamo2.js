/* eslint-disable react/jsx-props-no-multi-spaces */
/* eslint-disable no-lone-blocks */
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
import AsyncStorage from '@react-native-async-storage/async-storage';
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
import { crearReclamo } from '../../controllers/reclamos';

function FormularioReclamo(props) {
    const state = useState();
    const { navigation, route } = props;
    const { params } = route;
    const [photos, setPhotos] = useState([]);
    const [sitio, setSitio] = useState();
    const [loading, setLoading] = useState(false);
    const [coordinates, setCoordinates] = useState();
    const isFocused = useIsFocused();
    const { rubroD, desperfectoD, desperfectoI } = params;
    const [rubro, setRubro] = useState({ });

    // const { documento } = JSON.parse(base64.decode(params.authToken).toString());

    useEffect(() => {
        // Fetch the token from storage then navigate to our appropriate place
        const bootstrapAsync = async () => {
            if (params) {
                setPhotos(params.photos);
                if (params.rubroD) {
                    setRubro({ rubroD, desperfectoD, desperfectoI });
                }
            }
        };
        bootstrapAsync();
    }, [props, isFocused]);

    const onSubmit = async function (values) {
        setLoading(true);
        try {
            const imageUrls = await imagesUrls(photos);
            const sitioRes = await crearSitio(sitio, values.comentariosLugar);
            const documento = (JSON.parse(base64.decode(await AsyncStorage.getItem('authToken'))).referencia);
            const body = {
                documento: String(documento),
                idSitio: sitioRes.idSitio,
                idDesperfecto: rubro.desperfectoI,
                descripcion: values.descripcion,
                imagenesReclamo: imageUrls,
            };
            const res = await crearReclamo(body);
            if (res.reclamo) {
                navigation.navigate('Confirmacion', { tipo: 'reclamo', id: res.reclamo.idReclamo });
            }
        } catch (e) {
            Alert.alert('Ha habido un error generando tu reclamo');
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
        descripcion: yup.string().required('Por favor ingresa comentarios acerca del problema'),
    });

    return (
        <>
            <MiVecindario navigation={navigation} />
            <Formik
                initialValues={{
                    descripcion: '',
                    comentariosLugar: '',
                }}
                validationSchema={denunciaValidationSchema}
                onSubmit={(values) => {
                    onSubmit(values);
                }}
            >
                {({
                    handleChange,
                    handleBlur,
                    values,
                    errors,
                    touched,
                    isValid,
                }) => (
                    <>
                        <Text style={style.sectionTitle}>Crear nuevo reclamo</Text>
                        <ScrollView
                            style={style.formsContainer}
                            keyboardShouldPersistTaps="handled"
                        >

                            <Text style={{
                                backgroundColor: '#1A4472', color: '#fff', fontWeight: 'bold', fontSize: 18, padding: 10,
                            }}
                            >
                                {'Rubro: '}
                                {rubro.rubroD}

                            </Text>
                            <Text style={{
                                backgroundColor: '#1A4472', color: '#fff', fontWeight: 'bold', fontSize: 18, padding: 10,
                            }}
                            >
                                {' '}
                                {'Desperfecto: '}
                                {rubro.desperfectoD}

                            </Text>
                            <Text style={style.formTooltip}>Direcci??n</Text>
                            <View style={style.primaryTextInput}>
                                <GooglePlacesAutocomplete
                                // https://github.com/FaridSafi/react-native-google-places-autocomplete
                                    placeholder="Ingresar una direcci??n"
                                    disableScroll
                                    isRowScrollable={false}
                                    currentLocationLabel="Ubicaci??n actual"
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
                            <TextInput
                                style={style.secondaryTextInput}
                                value={values.comentariosLugar}
                                onBlur={handleBlur('comentariosLugar')}
                                onChangeText={handleChange('comentariosLugar')}
                                placeholder="Ingres?? mas info del lugar"
                                underlineColor="#2984f2"
                            />
                            <Text style={style.formTooltip}>Comentanos tu reclamo</Text>
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
                            <Text style={style.formTooltip}>Sub?? los archivos de prueba</Text>
                            <TouchableOpacity

                                onPress={() => { navigation.navigate('ImageBrowser', { navigateBackTo: 'Reclamo#2', maxImagenes: 7 }); }}
                                style={style.primaryFormButton}
                            >
                                <Text style={style.primaryFormButtonText}>
                                    Seleccionar im??genes
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

                    </>
                )}

            </Formik>
        </>
    );
}

export default FormularioReclamo;
