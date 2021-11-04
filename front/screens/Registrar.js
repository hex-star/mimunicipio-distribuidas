/* eslint-disable no-console */
import React from 'react';
import {
    ScrollView, Text, TouchableOpacity, Alert,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from 'yup';
import MiVecindario from '../components/MiVecindario';
import style from '../customProperties/Styles';
import { registrar } from '../controllers/usuarios';

function Registrar(props) {
    const { navigation } = props;

    const initialValues = {
        email: '',
        documento: '',

    };

    const loginValidationSchema = yup.object().shape({

        documento: yup
            .number()
            .min(8, ({ min }) => `El documento debe contener como mínimo ${min} caracteres`)
            .positive('El documento no puede ser negativo')
            .integer('El documento debe ser un número entero')
            .required('El documento es requerido'),
        email: yup
            .string()
            .email('Por favor ingrese un emal válido')
            .required('El email es requerido'),

    });

    const onSubmit = async function (values) {
        console.log('esto funciona');
        try {
            console.log(values);
            const res = await registrar(values);
            if (res && res.usuario) {
                Alert.alert('Solicitud confirmada', 'Su solicitud de cuenta fue enviada correctamente. La clave de acceso será enviada al correo electrónico informado.');
                navigation.navigate('Login');
                return;
            } else {
                if(res && res.error) {
                    Alert.alert('Error','El vecino debe estar registrado en el Municipio.')
                    return;
                }else{
                    Alert.alert('Error desconocido.','')
                }
            }
        } catch (e) {
            console.log(e);
        }
    };

    return (
        <>
            <MiVecindario noPerfil />
            <Formik
                validationSchema={loginValidationSchema}
                initialValues={initialValues}
                onSubmit={(values) => {
                    console.log(values);
                    onSubmit(values);
                    // Abrir Pantalla de confirmación
                    // navigation.navigate('Menu');
                }}
            >
                {({
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    errors,
                    touched,
                    values,
                    isValid,
                }) => (
                    <ScrollView style={style.formsContainer}>
                        <Text style={style.subtitle1}>
                            Formulario de registro
                        </Text>
                        <Text style={style.subtitle2}>
                            Por favor, ingresá tus datos para registrarte
                        </Text>

                        <TextInput
                            name="documento"
                            style={style.primaryTextInput}
                            placeholder="Documento de identidad"
                            onChangeText={handleChange('documento')}
                            onBlur={handleBlur('documento')}
                            value={values.documento}
                        />
                        {(errors.documento && touched.documento)
                            && (
                                <Text style={style.errors}>
                                    {' '}
                                    {errors.documento}
                                </Text>
                            )}
                        <TextInput
                            name="email"
                            style={style.primaryTextInput}
                            placeholder="Email"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            keyboardType="email-address"
                        />
                        {(errors.email && touched.email)
                            && (
                                <Text style={style.errors}>
                                    {' '}
                                    {errors.email}
                                </Text>
                            )}

                        <TouchableOpacity
                            onPress={handleSubmit}
                            // onPress={() => navigation.navigate('Menu')}
                            style={style.primaryNavigationButton}
                        >
                            <Text style={style.primaryNavigationButtonText}>
                                Crear cuenta
                            </Text>
                        </TouchableOpacity>
                        <Text style={style.subtitle2} onPress={() => Alert.alert('Términos', 'Podrá obtener más detalles de nuestros términos en https://www.municipiodeposadas.com.ar')}>
                            Al crear una cuenta, aceptas nuestros Términos
                        </Text>

                    </ScrollView>
                )}
            </Formik>
        </>
    );
}
export default Registrar;
