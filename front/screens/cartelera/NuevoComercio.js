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
import { TextInput,List } from 'react-native-paper';
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
    const [direccion, setdireccion] = useState('')

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

    const onSubmit = async function (values,direccion) {
      
        const imageUrls = await imagesUrls(photos);
        const sitioRes = await crearSitio(sitio, values.comentariosLugar);
        console.log(values)
        console.log(sitioRes)
        console.log(imageUrls)

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

        descripcion: yup.string().required('Por favor ingresa comentarios acerca del problema'),
    });

    return (
        <>
            <MiVecindario navigation={navigation} />
            <Formik
                initialValues={{
                    telefono: '',
               
                    nombre: '',
            
                    descripcion: '',
                   
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
                    domingoA: '',
                    domingoH: '',
                    direccion:'',
                }}
                validationSchema={denunciaValidationSchema}
                onSubmit={(values,direccion) => {
                    onSubmit(values,direccion);
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
                            <View style={{ flexDirection: 'row' }}>
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
                            <View style={{ flexDirection: 'row' }}>
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
                            <View style={{ flexDirection: 'row' }}>
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
                            <View style={{ flexDirection: 'row' }}>
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
                            onPress={() => onSubmit(values,direccion)}
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

export default NuevoComercio;
