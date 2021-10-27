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

function Registrar(props) {
    const { navigation } = props;

    const initialValues = {
        nombre: '',
        apellido: '',
        documento: '',
        email: '',
        direccion: '',
        barrio: '',
    };

    const loginValidationSchema = yup.object().shape({
        nombre: yup
            .string()
            .required('El nombre es requerido'),
        apellido: yup
            .string()
            .min(1)
            .required('El apellido es requerido'),
        documento: yup
            .number()
            .min(7, ({ min }) => `El documento debe contener como mínimo ${min} caracteres`)
            .positive('El documento no puede ser negativo')
            .integer('El documento debe ser un número entero')
            .required('El documento es requerido'),
        email: yup
            .string()
            .email('Por favor ingrese un emal válido')
            .required('El email es requerido'),
        direccion: yup
            .string()
            .required('La dirección es requerida'),
        barrio: yup
            .string()
            .required('El barrio es requerido'),
    });
    return (
        <>
            <MiVecindario />
            <Formik
                validationSchema={loginValidationSchema}
                initialValues={initialValues}
                onSubmit={(values) => {
                    console.log(values);
                    // Abrir Pantalla de confirmación
                    // navigation.navigate('Menu');
                    Alert.alert('Solicitud confirmada', 'Su solicitud de cuenta fue enviada correctamente. La clave de acceso será enviada al correo electrónico informado.');
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
                            name="nombre"
                            style={style.primaryTextInput}
                            placeholder="Nombre"
                            onChangeText={handleChange('nombre')}
                            onBlur={handleBlur('nombre')}
                            value={values.nombre}
                        />
                        {(errors.nombre && touched.nombre)
                            && (
                                <Text style={style.errors}>
                                    {' '}
                                    {errors.nombre}
                                </Text>
                            )}
                        <TextInput
                            name="apellido"
                            style={style.primaryTextInput}
                            placeholder="Apellido"
                            onChangeText={handleChange('apellido')}
                            onBlur={handleBlur('apellido')}
                            value={values.apellido}
                        />
                        {(errors.apellido && touched.apellido)
                            && (
                                <Text style={style.errors}>
                                    {' '}
                                    {errors.apellido}
                                </Text>
                            )}
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
                        <TextInput
                            name="direccion"
                            style={style.primaryTextInput}
                            placeholder="Direccion"
                            onChangeText={handleChange('direccion')}
                            onBlur={handleBlur('direccion')}
                            value={values.direccion}
                        />
                        {(errors.direccion && touched.direccion)
                            && (
                                <Text style={style.errors}>
                                    {' '}
                                    {errors.direccion}
                                </Text>
                            )}
                        <TextInput
                            name="barrio"
                            style={style.primaryTextInput}
                            placeholder="Barrio"
                            onChangeText={handleChange('barrio')}
                            onBlur={handleBlur('barrio')}
                            value={values.barrio}
                        />
                        {(errors.barrio && touched.barrio)
                            && (
                                <Text style={style.errors}>
                                    {' '}
                                    {errors.barrio}
                                </Text>
                            )}
                        <TouchableOpacity
                            onPress={handleSubmit}
                            disabled={!isValid}
                            // onPress={() => navigation.navigate('Menu')}
                            style={style.primaryNavigationButton}
                        >
                            <Text style={style.primaryNavigationButtonText}>
                                Crear cuenta
                            </Text>
                        </TouchableOpacity>
                        <Text style={style.subtitle2} onPress={() => Alert.alert('Términos', 'Estos son los términos y condiciones vigentes para mayor detalle visite https://www.municipiodeposadas.com.ar')}>
                            Al crear una cuenta, aceptas nuestros Términos
                        </Text>

                    </ScrollView>
                )}
            </Formik>
        </>
    );
}
export default Registrar;
