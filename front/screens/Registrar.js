import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TextInput } from 'react-native-paper';
import { Formik } from 'formik';
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

    return (
        <>
            <MiVecindario />
            <Formik
                initialValues={initialValues}
                onSubmit={(values) => {
                    console.log(values);
                    // Abrir Pantalla de confirmación
                    // navigation.navigate('Menu');
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
                            Formulario de registro
                        </Text>
                        <Text style={style.subtitle2}>
                            Por favor, ingresá tus datos para registrarte
                        </Text>
                        <TextInput
                            style={style.primaryTextInput}
                            placeholder="Nombre"
                            onChangeText={handleChange('nombre')}
                            onBlur={handleBlur('nombre')}
                            value={values.nombre}
                        />
                        <TextInput
                            style={style.primaryTextInput}
                            placeholder="Apellido"
                            onChangeText={handleChange('apellido')}
                            onBlur={handleBlur('apellido')}
                            value={values.apellido}
                        />
                        <TextInput
                            style={style.primaryTextInput}
                            placeholder="Documento de identidad"
                            onChangeText={handleChange('documento')}
                            onBlur={handleBlur('documento')}
                            value={values.documento}
                        />
                        <TextInput
                            style={style.primaryTextInput}
                            placeholder="Email"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                        />
                        <TextInput
                            style={style.primaryTextInput}
                            placeholder="Direccion"
                            onChangeText={handleChange('direccion')}
                            onBlur={handleBlur('direccion')}
                            value={values.direccion}
                        />
                        <TextInput
                            style={style.primaryTextInput}
                            placeholder="Barrio"
                            onChangeText={handleChange('barrio')}
                            onBlur={handleBlur('barrio')}
                            value={values.barrio}
                        />
                        <TouchableOpacity
                            onPress={handleSubmit}
                            // onPress={() => navigation.navigate('Menu')}
                            style={style.primaryNavigationButton}
                        >
                            <Text style={style.primaryNavigationButtonText}>
                                Crear cuenta
                            </Text>
                        </TouchableOpacity>
                        <Text style={style.subtitle2} onPress={() => navigation.navigate('')}>
                            Al crear una cuenta, aceptas nuestros Términos
                        </Text>

                    </View>
                )}
            </Formik>
        </>
    );
}
export default Registrar;
