import { useState } from 'react';

import { StatusBar } from 'expo-status-bar';
import { Settings, StyleSheet, Text, View } from 'react-native';

import SettingsView from './src/components/settings-view';
import SamplingView from './src/components/sampling-view';
import { appColors } from './src/style/colors';

export default function App() {
  const [setingsView, setSettingsView] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {setingsView ? <SettingsView /> : <SamplingView />}
      </View>
      <View>
        <Text>Start/Stop</Text>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: appColors.beige.A500,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
});
