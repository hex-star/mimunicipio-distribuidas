import React from 'react';
import {
    View, Text, TouchableOpacity, Alert,
} from 'react-native';
import { TextInput } from 'react-native-paper';
import { Formik } from 'formik';
import MiVecindario from '../components/MiVecindario';
import style from '../customProperties/Styles';

function Contraseña() {
    const initialValues = {
        email: '',
    };

    return (
        <>
            <MiVecindario />
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => {
                    console.log(values);
                    Alert.alert('Solicitud confirmada', 'Revise su cuenta de correo electrónico para proceder con el recupero de contraseña');
                    // eslint-disable-next-line indent
                      ;
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
                            Recuperar contraseña
                        </Text>
                        <Text style={style.subtitle2}>
                            Por favor, Ingresá los datos para recuperar tu contraseña
                        </Text>
                        <TextInput
                            style={style.primaryTextInput}
                            placeholder="Email/Legajo"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                        />
                        <TouchableOpacity
                            onPress={handleSubmit}
                            // onPress={() => navigation.navigate('Menu')}
                            style={style.primaryNavigationButton}
                        >
                            <Text style={style.primaryNavigationButtonText}>
                                Aceptar
                            </Text>
                        </TouchableOpacity>

                    </View>
                )}
            </Formik>
        </>
    );
}
export default Contraseña;
