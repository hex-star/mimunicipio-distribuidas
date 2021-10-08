import React from 'react'
import { View, Text } from 'react-native'
//import { useTheme } from 'react-native-paper';
import { Title, withTheme } from 'react-native-paper';

 function TopBar(props) {
    const { colors,fonts } = props.theme;
    return (
        <View>
            <Text  style={{ color: colors.iconColor,font:fonts.title }} >dasassd world</Text>
        </View>
    )
}

export default withTheme(TopBar);