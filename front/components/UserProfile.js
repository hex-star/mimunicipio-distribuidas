import React from 'react';
import { View, Text,Image,TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import base64 from 'react-native-base64';
import AsyncStorage from '@react-native-async-storage/async-storage';
import avatar from '../assets/avatar.png'

const UserProfile = (props) => {
    const { authToken, setAuthToken } = props;

    const handlePress = () => {
        AsyncStorage.removeItem('authToken');
        setAuthToken('');
    };

    if (authToken) {
       // const perfil = JSON.parse(base64.decode(authToken));

        return (
            <View style={{ flexDirection: 'row' }}>
               {/*<Text>{perfil.email}</Text>*/} 
               {/*<TouchableOpacity onPress={() => props.navigation.navigate('Perfil')}>
                    <Image
                        style={{
                            width: 40, height: 40, marginRight: 15, resizeMode: 'stretch', justifyContent: 'center',
                        }}
                        source={avatar}
                    />
                </TouchableOpacity>*/}
                <Button icon="logout" onPress={handlePress} />
            </View>
        );
    }

    return (<></>);
};

export default UserProfile;
