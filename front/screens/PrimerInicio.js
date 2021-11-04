import React, { useState } from 'react';
import {
    View, Text, Image, TouchableOpacity, Alert,
} from 'react-native';

import * as yup from 'yup';
import { Formik } from 'formik';
import { TextInput } from 'react-native-paper';
import style from '../customProperties/Styles';
import MiVecindario from '../components/MiVecindario';

import { cambiarPassword } from '../controllers/usuarios';

function PrimerInicio(props) {
    const { navigation } = props;
    const [onLoading, setOnLoading] = useState('')

    const initialValues = {
        password: '',
        confirmPassword: '',
        documento: '',
    };

    const validationSchema = yup.object().shape({

        password: yup.string().required('Por favor ingrese una contraseña'),
        confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Las contraseñas deben coincidir'),
        documento: yup.number().positive().integer().required('Por favor ingrese su documento sin usar puntos'),
    });
    const validatePassword = values => {
        let error = "";
        const passwordRegex = /(?=.*[0-9])/;
        if (!values) {
            error = "*Required";
        } else if (values.length < 8) {
            error = "*Password must be 8 characters long.";
        } else if (!passwordRegex.test(values)) {
            error = "*Invalid password. Must contain one number.";
        }
        return error;
    };

    const validateConfirmPassword = (pass, value) => {

        let error = "";
        if (pass && value) {
            if (pass !== value) {
                error = "Password not matched";
            }
        }
        return error;
    };

    const onSubmit = async function (values) {
        try {
            console.log(values);

            const res = await cambiarPassword(values);

            if (res && res.usuario) {
                console.log("reeees: " + res.usuario)
                Alert.alert('La contraseña fue restablecida con exito.');
                navigation.navigate('Login')

            } else {
                Alert.alert(res.error)
            }
        } catch (e) {
            console.log(`ERROR AL INTENAR INICIAR SESION POR PRIMERA VEZ FRONT END${e}`);
        }
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
                    touched
                }) => (
                    <View style={style.formsContainer}>
                        <Text style={style.subtitle1}>
                            Primer inicio de sesion
                        </Text>
                        <Text style={style.subtitle2}>
                            Por favor establezca su contraseña
                        </Text>

                        <TextInput
                            style={style.primaryTextInput}
                            placeholder="Documento"
                            onChangeText={handleChange('documento')}
                            onBlur={handleBlur('documento')}
                            value={values.documento}
                            secureTextEntry
                        />
                        
                        {(errors.documento && touched.documento)
                            && (
                                <Text style={style.errors}>
                                    {' '}
                                    {errors.documento}
                                </Text>
                            )}



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
                            validate={value =>
                                validateConfirmPassword(values.password, value)}
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
                                    Siguiente
                                </Text>
                            )}
                        </TouchableOpacity>
                        <Text style={style.subtitle2} onPress={() => navigation.navigate('Contraseña')}>
                            Olvidé mi contraseña
                        </Text>
                        <Text style={style.subtitle2} onPress={() => navigation.navigate('Registrar')}>
                            ¿No estás registrado? Registraté acá
                        </Text>

                    </View>
                )}
            </Formik>
        </>
    );
}

export default (PrimerInicio);
