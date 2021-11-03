import React,{useState} from 'react';
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
        claveRecuperacion: '',
        password: '',
        confirmPassword: '',
        documento: '',
    };

    const validationSchema = yup.object().shape({
        claveRecuperacion: yup.string().required('Please enter a valid name'),
        password: yup.string().required('Por favor ingrese una contraseña'),
        confirmPassword: yup.string().required('Por favor confirme una contraseña'),
        documento: yup.number().positive().integer().required('Por favor ingrese su documento sin usar puntos'),
    });

    const onSubmit = async function (values) {
        try {
            console.log(values);

            const res = await cambiarPassword(values);
  
            if (res && res.usuario) {
                console.log("reeees: " + res.usuario)
                Alert.alert('La contraseña fue restablecida con exito.');
                navigation.navigate('Login')
                
            }else{
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
                              <TextInput
                            style={style.primaryTextInput}
                            placeholder="Clave de Recuperacion"
                            onChangeText={handleChange('claveRecuperacion')}
                            onBlur={handleBlur('claveRecuperacion')}
                            value={values.claveRecuperacion}
                            secureTextEntry
                        />

                        <TextInput
                            style={style.primaryTextInput}
                            placeholder="Contraseña"
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            value={values.password}
                            secureTextEntry
                        />
                        <TextInput
                            style={style.primaryTextInput}
                            placeholder="Confirmar Contraseña"
                            onChangeText={handleChange('confirmPassword')}
                            onBlur={handleBlur('confirmPassword')}
                            value={values.confirmPassword}
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

export default (PrimerInicio);
