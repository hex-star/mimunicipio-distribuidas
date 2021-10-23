import React from 'react';
import { View, Text, Image } from 'react-native';
import logo from '../assets/miVecindario.png';

const MiVecindario = () => (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ fontSize: 25, fontWeight: '400', margin: 20 }}>MiVecindario</Text>
        <Image source={logo} />
    </View>
);

export default MiVecindario;
