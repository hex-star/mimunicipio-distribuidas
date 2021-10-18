import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image,
} from 'react-native';
import { withTheme } from 'react-native-paper';

function MainScreen(props) {
  const { theme } = props;
  const { colors, fonts } = theme;
  return (
    <View style={style.itemContainer}>
      <Image source={require('../assets/favicon.png')} />
      <Text style={fonts.title1}>MiVecindario</Text>
      <Text style={{ color: colors.primary }}>Texto con color</Text>

      <TouchableOpacity onPress={() => props.navigation.navigate('Registrar')}>
        <Text style={{
          color: 'white', fontSize: 15, borderColor: 'white', borderWidth: 2, borderRadius: 10, padding: 5,
        }}
        >
          Continuar como invitado
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={{ marginTop: 5, backgroundColor: 'white' }} onPress={() => props.navigation.navigate('Registrar')}>
        <Text style={{
          color: colors.primary, fontSize: 15, borderColor: 'white', borderWidth: 2, borderRadius: 10, padding: 5,
        }}
        >
          Iniciar sesion
        </Text>
      </TouchableOpacity>
      <Text style={{ marginTop: 20 }}>¿No estas registrado? Registrate aca</Text>
      <Text style={{ marginTop: 20 }}>Una aplicacion del municipio de posadas</Text>
    </View>
  );
}

const style = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    margin: 10,
    backgroundColor: '#4169E1',
  },
  container: {
    flex: 0.5,
    flexDirection: 'row',
    justifyContent: 'flex-start', // replace with flex-end or center
    borderBottomWidth: 1,
    borderBottomColor: '#000',
  },
  container2: {
    flex: 0.5,
    flexDirection: 'row',
    alignItems: 'flex-start', // replace with flex-end or center
  },
  itemTitle: {
    color: '#ffffff',
    paddingLeft: 10,
    paddingTop: 10,
  },
  itemDescription: {
    color: '#ffffff',
    paddingLeft: 10,
    paddingBottom: 10,
  },
});

export default withTheme(MainScreen);
