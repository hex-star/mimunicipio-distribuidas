/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import {
    View, Text, TouchableOpacity, Alert,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from 'yup';
import MiVecindario from '../components/MiVecindario';
import style from '../customProperties/Styles';
import { login } from '../controllers/usuarios';
import useStickyState from '../utils/useStickyState';

function Login(props) {
    const { navigation } = props;
    const [authToken, setAuthToken] = useStickyState('', '', 'authToken');
    const [onLoading, setOnLoading] = useState(false);

    const initialValues = {
        email: '',
        password: '',
    };

    const validationSchema = yup.object().shape({
        email: yup.string().required('Por favor ingrese un email válido'),
        password: yup.string().required('Por favor ingrese una contraseña'),

    });

    const onSubmit = async function (values) {
        try {
            setOnLoading(true);

            const res = await login(values);
            if (res && res.error === 'Por favor actualice la contraseña.') {
                navigation.navigate('PrimerInicio');
                return;
            }
            if (res && res.error === 'Contraseña incorrecta') {
                Alert.alert('Contraseña o mail incorrecto');
            }

            if (res && res.token) {
                setAuthToken(res.token);
                // navigation.popToTop();
                navigation.navigate('Menu');
            } else {
                Alert.alert('Contraseña o mail incorrecto');
                setOnLoading(false);
            }
        } catch (e) {
            console.log(e);
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
                }) => (
                    <View style={style.formsContainer}>
                        <Text style={style.subtitle1}>
                            ¡Bienvenido a Mi Vecindario!
                        </Text>
                        <Text style={style.subtitle2}>
                            Por favor, Ingresá tus datos para continuar
                        </Text>
                        <TextInput
                            style={style.primaryTextInput}
                            placeholder="Email/Legajo"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                        />
                        <TextInput
                            style={style.primaryTextInput}
                            placeholder="Contraseña"
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            secureTextEntry
                        />

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
                            ¿No estás registrado? Registrate acá
                        </Text>

                    </View>
                )}
            </Formik>
        </>
    );
}
export default Login;
