import React from 'react';
import {
  View, Text, TouchableOpacity, Image,
} from 'react-native';
import { withTheme } from 'react-native-paper';
import logo from '../assets/miVecindarioHome.png';
import style from '../customProperties/Styles';

function MainScreen(props) {
  const { theme, navigation } = props;
  const { colors, fonts } = theme;

  return (
    <View style={style.homeContainer}>
      <Image source={logo} />
      <Text style={{color:'#fff',fontSize:30,marginTop:10}}>MiVecindario</Text>
      <Text style={{ color: colors.primary }}>Texto con color</Text>

      <TouchableOpacity style={style.invitadoButton } >
        <Text style={{
          color: 'white', fontSize: 15,
        }}
        >
          Continuar como invitado
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={style.buttonLogIn } onPress={() => navigation.navigate('Login')}>
        <Text style={{
          color: colors.primary, fontSize: 15, borderColor: 'white', borderWidth: 2, borderRadius: 10, padding: 5,
        },style.primaryText}
        >
          Iniciar sesion
        </Text>
      </TouchableOpacity>
      <Text style={style.whiteFont } onPress={() => navigation.navigate('Registrar')}>¿No estas registrado? Registrate aca</Text>
      <Text style={ style.whiteFontFooter }>Una aplicacion del municipio de posadas</Text>
    </View>
  );
}

export default withTheme(MainScreen);
