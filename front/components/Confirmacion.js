import React from 'react';
import {
    View,
    Text,
    TouchableOpacity,
} from 'react-native';
import style from '../customProperties/Styles';

function MainScreen(props) {
    const { navigation, route } = props;
    const { params } = route;
    const { tipo, id } = params;

    return (
        <>
            <View style={style.homeContainer}>
                <Text style={style.whiteSubtitle1}>{`Se ha generado tu ${tipo} exitosamente`}</Text>
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
