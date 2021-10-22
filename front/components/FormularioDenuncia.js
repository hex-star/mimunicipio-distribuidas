import React, { useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, Button,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import style from '../customProperties/Styles';
import logo from '../assets/miVecindario.png';
import MiVecindario from './MiVecindario';
import DocumentPickerCustom from './DocumentPickerCustom';
import RNGooglePlacePicker from 'react-native-google-place-picker';

function FormularioDenuncia() {
    const [date, setDate] = useState(new Date(1598051730000));
    const [mode, setMode] = useState('date');
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    };

    const showMode = (currentMode) => {
        setShow(true);
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    const showTimepicker = () => {
        showMode('time');
    };

    const onClick = () => {
       
        RNGooglePlacePicker.show((response) => {
            if (response.didCancel) {
              console.log('User cancelled GooglePlacePicker');
            }
            else if (response.error) {
              console.log('GooglePlacePicker Error: ', response.error);
            }
            else {
              this.setState({
                location: response
              });
            }
          })
    };

    return (
        <View style={{
            flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center', marginBottom: 20, marginLeft: 30, marginRight: 30,
        }}
        >
      
            <Text style={style.blueFont}>Crear nueva denuncia</Text>
            <Text style={style.greyFont}>Nombre / Comercio</Text>
            <TextInput placeholderTextColor="#000" style={{ marginTop: 0, padding: 0 }} placeholder="Ingresá el nombre del vecino o comercio" />
            <View style={{ borderBottomColor: '#03c6fc', borderWidth: 0.5, alignSelf: 'stretch' }} />
            <Text style={style.greyFont} onPress={onClick}>Dirección</Text>
            <TextInput placeholderTextColor="#000" style={{ marginTop: 0, marginBottom: 0, padding: 2 }} placeholder="Nombre de calle" />
            <View style={{ borderBottomColor: '#03c6fc', borderWidth: 0.5, alignSelf: 'stretch' }} />
            <Text style={style.greyFont}>Numero</Text>
            <TextInput placeholderTextColor="#000" style={{ marginTop: 0, marginBottom: 0, padding: 2 }} placeholder="Numero de calle" />
            <View style={{ borderBottomColor: '#03c6fc', borderWidth: 0.5, alignSelf: 'stretch' }} />
    
            <View style={{ flexDirection: 'row', alignItems: 'center',justifyContent:'center' }}>

                <View>
                    <Text style={{alignSelf:'center', color:'#6e6e6e',fontSize:12,marginTop:10}}>Fecha</Text>
                    <Button title={date.getDate().toString() + '/' + date.getMonth().toString() + '/' + date.getFullYear().toString()} onPress={showDatepicker} />
                </View>
                <View style={{marginLeft:20}}>
                    <Text  style={{alignSelf:'center', color:'#6e6e6e',fontSize:12,marginTop:10}}>Hora</Text>
                    <Button title={date.getHours().toString() + ':' + date.getMinutes().toString()} onPress={showTimepicker} />
                </View>
            </View>
            <View style={{ borderBottomColor: '#03c6fc', borderWidth: 0.5, alignSelf: 'stretch',marginTop:15 }} />

  

            
            <View>
                {show && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date}
                        mode={mode}
                        is24Hour
                        display="default"
                        onChange={onChange}
                        onConfirm={showTimepicker}
                        locale='en'
                    />
                )}
            </View>
            <Text style={style.greyFont}>Comentanos tu problema</Text>
            <TextInput placeholderTextColor="#000" style={{ marginTop: 0, padding: 2 }} placeholder="Ingresa el motivo de la denuncia" />
            <View style={{ borderBottomColor: '#03c6fc', borderWidth: 0.5, alignSelf: 'stretch' }} />
            <Text style={style.greyFont}>Subí los archivos de prueba</Text>
            <TextInput placeholderTextColor="#000" numberOfLines={2} multiline style={{ marginTop: 0, marginBottom: 0, padding: 2 }} placeholder="Selecciona" />
            <View style={{
                borderBottomColor: '#03c6fc', borderWidth: 0.5, alignSelf: 'stretch', marginBottom: 10,
            }}
            />
            <TouchableOpacity
                onPress={() => navigation.navigate('Menu')}
                style={{
                    backgroundColor: '#1A4472',
                    borderColor: '#1A4472',
                    borderWidth: 2,
                    borderRadius: 5,
                    padding: 5,
                    alignSelf: 'center',
                    width: 200,
                }}
            >
                <Text style={{
                    color: 'white', fontSize: 15, alignSelf: 'center',
                }}
                >
                    Siguiente
                </Text>
            </TouchableOpacity>

        </View >
    );
}

export default FormularioDenuncia;
