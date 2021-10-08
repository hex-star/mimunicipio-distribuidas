import React from 'react'
import { View, Text } from 'react-native'
import { useTheme } from 'react-native-paper'
import { withTheme } from 'react-native-paper';

 function MainScreen(props) {
    const { colors } = useTheme();
    return (
        <View>
            <Text style={{ color: colors.primary}}>Hellasas world</Text>
        </View>
    )
}

export default withTheme(MainScreen);