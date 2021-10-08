import React from 'react';
import { View, Text } from 'react-native';
import { withTheme } from 'react-native-paper';

function MainScreen(props) {
  const { theme } = props;
  const { colors, fonts } = theme;
  return (
    <View>
      <Text style={fonts.title1}>Texto con fuente title1</Text>
      <Text style={{ color: colors.primary }}>Texto con color</Text>
    </View>
  );
}

export default withTheme(MainScreen);
