import React,{useEffect} from 'react';
import { View, Text, Image,TouchableOpacity } from 'react-native';
import logo from '../assets/miVecindario.png';
import avatar from '../assets/avatar.png'

function MiVecindario(props) {

    useEffect(() => {
        console.log(props)
    })
    return (
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ fontSize: 25, fontWeight: '400', margin: 20 }}>MiVecindario</Text>
                <Image source={logo} />
            </View>
            {!props.noPerfil &&

                <TouchableOpacity onPress={() => props.navigation.navigate('Perfil')}>
                    <Image
                        style={{
                            width: 40, height: 40, marginRight: 15, resizeMode: 'stretch', justifyContent: 'center',
                        }}
                        source={avatar}
                    />
                </TouchableOpacity>


            }
        </View>
    );
}

export default MiVecindario;
