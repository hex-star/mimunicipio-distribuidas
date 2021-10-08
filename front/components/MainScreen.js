import React from 'react';
import { View, Text } from 'react-native';
import { withTheme } from 'react-native-paper';

function MainScreen(props) {
  const { theme } = props;
  const { colors } = theme;
  return (
    <View>
      <Text style={{ color: colors.primary }}>Hellasas world</Text>
    </View>
  );
}

export default withTheme(MainScreen);
