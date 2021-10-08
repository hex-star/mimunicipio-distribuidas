import React from 'react'
import { View, Text } from 'react-native'
//import { useTheme } from 'react-native-paper';
import { withTheme } from 'react-native-paper';

 function TopBar(props) {
    const { colors, fonts } = props.theme;
    return (
        <View>
            <Text style={fonts.title1} >dasassd world</Text>
        </View>
    )
}

export default withTheme(TopBar);