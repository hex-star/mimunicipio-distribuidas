import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-paper';
import base64 from 'react-native-base64';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserProfile = (props) => {
    const { authToken, setAuthToken } = props;

    const handlePress = () => {
        AsyncStorage.removeItem('authToken');
        setAuthToken('');
    };

    if (authToken) {
        const perfil = JSON.parse(base64.decode(authToken));

        return (
            <View style={{ flexDirection: 'row' }}>
               {/*<Text>{perfil.email}</Text>*/} 
                <Button icon="account-circle-outline" />
                <Button icon="logout" onPress={handlePress} />
            </View>
        );
    }

    return (<></>);
};

export default UserProfile;
