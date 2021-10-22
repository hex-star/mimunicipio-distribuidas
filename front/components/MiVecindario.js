import React from 'react';
import { View, Text, Image } from 'react-native';
import style from '../customProperties/Styles';
import logo from '../assets/miVecindario.png';

const MiVecindario = () => (
  <View style={{
    flexDirection: 'row', alignItems: 'center', marginBottom: 30, marginLeft: 10,
  }}
  >
    <Text style={{ fontSize: 25, fontWeight: '400' }}>MiVecindario</Text>
    <Image source={logo} />
  </View>
);

export default MiVecindario;
