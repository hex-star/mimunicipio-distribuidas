import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import MiVecindario from '../components/MiVecindario';
import style from '../customProperties/Styles';

function Login(props) {
    const { navigation } = props;

    const initialValues = {
        email: '',
        password: '',
    };

    return (
        <>
            <MiVecindario noPerfil={true} />
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => {
                    console.log(values);
                    navigation.navigate('Menu');
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
                            <Text style={style.primaryNavigationButtonText}>
                                Ingresar
                            </Text>
                        </TouchableOpacity>
                        <Text style={style.subtitle2}>
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
