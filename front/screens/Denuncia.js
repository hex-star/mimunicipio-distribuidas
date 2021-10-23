import React from 'react';
import { View } from 'react-native';
import FormularioDenuncia from '../components/FormularioDenuncia';

function Denuncia(props) {
    return (
        <View>
            <FormularioDenuncia props={props} />
        </View>
    );
}

export default (Denuncia);
