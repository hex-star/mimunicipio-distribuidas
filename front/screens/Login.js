import React, { useState } from 'react';
import {
    View, Text, TouchableOpacity, Alert,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import * as yup from 'yup';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MiVecindario from '../components/MiVecindario';
import style from '../customProperties/Styles';
import { login } from '../controllers/usuarios';

function Login(props) {
    const { navigation } = props;
    const [onLoading, setOnLoading] = useState(false);

    const initialValues = {
        email: '',
        password: '',
    };

    const validationSchema = yup.object().shape({
        email: yup.string().required('Please enter a valid name'),
        password: yup.string().required('Por favor ingrese una contraseña'),

    });

    const onSubmit = async function (values) {
        try {
            setOnLoading(true);

            console.log(values);

            const res = await login(values);
            console.log(res);
            if (res && res.error === 'Por favor actualice la contraseña.') {
                console.log(`res status:${res}`);
                navigation.navigate('PrimerInicio');
                return;
            }
            if (res && res.error === 'Contraseña incorrecta'){
                Alert.alert("Contraseña o Mail incorrecto")
            }

            if (res && res.token) {
                console.log(res.token);
                await AsyncStorage.setItem('authToken', res.token);
                await AsyncStorage.setItem('documento', JSON.stringify(res.documento));
                navigation.popToTop();
            } else {
                Alert.alert("Contraseña o Mail incorrecto")
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
                            ¿No estás registrado? Registraté acá
                        </Text>

                    </View>
                )}
            </Formik>
        </>
    );
}
export default Login;
