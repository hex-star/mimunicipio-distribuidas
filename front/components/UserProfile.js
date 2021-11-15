import React from 'react';
import {
    View, Text, Image, TouchableOpacity,
} from 'react-native';
import { Button } from 'react-native-paper';
import base64 from 'react-native-base64';


const UserProfile = (props) => {

    const { navigation } = props;
    const handlePress = () => {
        setAuthToken('');
        navigation.navigate('HomeScreen');
    };

    if (params.authToken) {
        // const perfil = JSON.parse(base64.decode(authToken);

        return (
            <View style={{ flexDirection: 'row' }}>
                {/* <Text>{perfil.email}</Text> */}
                {/* <TouchableOpacity onPress={() => props.navigation.navigate('Perfil')}>
                    <Image
                        style={{
                            width: 40, height: 40, marginRight: 15, resizeMode: 'stretch', justifyContent: 'center',
                        }}
                        source={avatar}
                    />
                </TouchableOpacity> */}
                <Button icon="logout" onPress={handlePress} />
            </View>
        );
    }

    return (<></>);
};

export default UserProfile;
