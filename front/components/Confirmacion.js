import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Image,
} from 'react-native';
import style from '../customProperties/Styles';
import logo from '../assets/ok_tick_icon.png';

function MainScreen(props) {
    const { navigation, route } = props;
    const { params } = route;
    const { tipo, id } = params;

    return (
        <>
            <View style={style.homeContainer}>
                <View style={{ justifyContent: 'center' }}>
                    <Image source={logo} resizeMode="stretch" style={{ width: 200, height: 200 }} />
                </View>
                <Text style={{
                    color: 'white',
                    alignSelf: 'center',
                    fontSize: 22,
                    marginVertical: 10,
                    marginLeft: 10,
                    textAlign: 'center',
                }}
                >
                    {`Se ha generado tu ${tipo} exitosamente`}
                </Text>
                <Text style={style.whiteSubtitle2}>{`Id ${tipo}: ${id}`}</Text>
                <TouchableOpacity
                    style={style.homeButtonPrimary}
                    onPress={() => navigation.navigate('Menu')}
                >
                    <Text style={style.homeButtonPrimaryText}>
                        Regresar al menú
                    </Text>
                </TouchableOpacity>
            </View>
        </>
    );
}

export default MainScreen;
