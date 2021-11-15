/* eslint-disable no-buffer-constructor */
import React, { useState } from 'react';
import {
    View, Text, TouchableOpacity, Alert,
} from 'react-native';
import * as yup from 'yup';
import { Formik } from 'formik';
import { TextInput } from 'react-native-paper';
import base64 from 'react-native-base64';
import style from '../customProperties/Styles';
import MiVecindario from '../components/MiVecindario';
import { cambiarPassword } from '../controllers/usuarios';

function CambiarContraseña(props) {
    const { navigation, route } = props;
    const { params } = route;
    const [onLoading, setOnLoading] = useState();

    const initialValues = {
        password: '',
        confirmPassword: '',
        claveRecuperacion: '',
    };

    const { documento } = JSON.parse(base64.decode(params.authToken).toString());

    const validationSchema = yup.object().shape({
        password: yup
            .string()
            .required('*Por favor ingrese una contraseña.')
            .min(8, ({ min }) => `La contraseña debe contener como mínimo ${min} caracteres`),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password'), null], '*Las contraseñas deben coincidir.'),
    });
    const validatePassword = (values) => {
        let error = '';
        const passwordRegex = /(?=.*[0-9])/;
        if (!values) {
            error = '*Requerida';
        } else if (values.length < 8) {
            error = '*La contraseña debe contener al menos 8 caracteres.';
        } else if (!passwordRegex.test(values)) {
            error = '*Contraseña inválida. Debe contener al menos un número.';
        }
        return error;
    };

    const validateConfirmPassword = (pass, value) => {
        let error = '';
        if (pass && value) {
            if (pass !== value) {
                error = 'Password not matched';
            }
        }
        return error;
    };

    const onSubmit = async function (values) {
        setOnLoading(true);
        try {
            console.log(values);
            const res = await cambiarPassword({
                documento,
                password: values.password,
                claveRecuperacion: '',
            });

            if (res && res.usuario) {
                console.log(`reeees: ${res.usuario}`);
                Alert.alert('La contraseña fue restablecida con éxito.');
                navigation.navigate('Perfil');
            } else {
                Alert.alert(res.error);
            }
        } catch (e) {
            console.log(`ERROR AL INTENAR INICIAR SESION POR PRIMERA VEZ FRONT END${e}`);
        } finally { setOnLoading(false); }
    };

    return (
        <>
            <MiVecindario noPerfil />
            <Formik
                validationSchema={validationSchema}
                initialValues={initialValues}
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
                }) => (
                    <View style={style.formsContainer}>
                        <Text style={style.subtitle1}>
                            Cambiar contraseña
                        </Text>

                        <Text style={style.subtitle2}>
                            Por favor, establezca la nueva contraseña
                        </Text>
                        <TextInput
                            style={style.primaryTextInput}
                            validate={validatePassword}
                            placeholder="Contraseña"
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            secureTextEntry

                        />

                        {(errors.password && touched.password)
                            && (
                                <Text style={style.errors}>
                                    {' '}
                                    {errors.password}
                                </Text>
                            )}

                        <TextInput
                            style={style.primaryTextInput}
                            validate={(value) => validateConfirmPassword(values.password, value)}
                            placeholder="Confirmar Contraseña"
                            onChangeText={handleChange('confirmPassword')}
                            onBlur={handleBlur('confirmPassword')}
                            value={values.confirmPassword}
                            secureTextEntry
                        />

                        {(errors.confirmPassword && touched.confirmPassword)
                            && (
                                <Text style={style.errors}>
                                    {' '}
                                    {errors.confirmPassword}
                                </Text>
                            )}

                        <TouchableOpacity
                            onPress={handleSubmit}
                            // onPress={() => navigation.navigate('Menu')}
                            style={style.primaryNavigationButton}
                        >
                            {onLoading ? (
                                <Text style={style.primaryNavigationButtonText}>
                                    Cargando
                                </Text>
                            ) : (
                                <Text style={style.primaryNavigationButtonText}>
                                    Aceptar
                                </Text>
                            )}
                        </TouchableOpacity>

                    </View>
                )}
            </Formik>
        </>
    );
}

export default (CambiarContraseña);
