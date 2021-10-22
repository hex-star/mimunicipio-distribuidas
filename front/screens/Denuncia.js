import React from 'react';
import { View, Text } from 'react-native';
import FormularioDenuncia from '../components/FormularioDenuncia';
import MiVecindario from '../components/MiVecindario';
import style from '../customProperties/Styles';

function Denuncia (props) {
  return (
  <View style={{marginTop:10}} >
      <MiVecindario/>
    <FormularioDenuncia/>
  </View>
);}



export default (Denuncia);
