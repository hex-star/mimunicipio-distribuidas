import React from 'react';
import {
  View, Text, TouchableOpacity, Image,
} from 'react-native';
import { withTheme } from 'react-native-paper';
import logo from '../assets/favicon.png';
import style from '../customProperties/Styles';

function MainScreen(props) {
  const { theme, navigation } = props;
  const { colors, fonts } = theme;

  return (
    <View style={style.homeContainer}>
      <Image source={logo} />
      <Text style={fonts.title1}>MiVecindario</Text>
      <Text style={{ color: colors.primary }}>Texto con color</Text>

      <TouchableOpacity style={style.buttonPrimary } onPress={() => navigation.navigate('Registrar')}>
        <Text style={{
          color: 'white', fontSize: 15,
        }}
        >
          Continuar como invitado
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={{ marginTop: 5, backgroundColor: 'white' }} onPress={() => navigation.navigate('Registrar')}>
        <Text style={{
          color: colors.primary, fontSize: 15, borderColor: 'white', borderWidth: 2, borderRadius: 10, padding: 5,
        },style.primaryText}
        >
          Iniciar sesion
        </Text>
      </TouchableOpacity>
      <Text style={{ marginTop: 20 }}>¿No estas registrado? Registrate aca</Text>
      <Text style={{ marginTop: 20 }}>Una aplicacion del municipio de posadas</Text>
    </View>
  );
}

export default withTheme(MainScreen);
