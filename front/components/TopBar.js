import React from 'react';
import { Appbar, withTheme } from 'react-native-paper';

function TopBar() {
  return (
    <Appbar.Header>
      <Appbar.BackAction />
      <Appbar.Content title="Title" subtitle="Subtitle" />
      <Appbar.Action icon="magnify" />
      <Appbar.Action icon="dots-vertical" />
    </Appbar.Header>
  );
}

export default withTheme(TopBar);
