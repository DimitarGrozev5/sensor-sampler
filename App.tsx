import { useState } from 'react';

import { StatusBar as StatusBarComponent } from 'expo-status-bar';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

import SettingsView from './src/components/settings-view';
import SamplingView from './src/components/sampling-view';
import { appColors } from './src/style/colors';
import { useGetUniqueId } from './src/hooks/use-get-unique-id';
import Button from './src/components/inputs/button';

export default function App() {
  const [setingsView, setSettingsView] = useState(true);

  const deviceId = useGetUniqueId();

  const [sampleRate, setSampleRate] = useState(1000);
  const [transmitionRate, setTransmitionRate] = useState(10000);
  const [url, setUrl] = useState('https://');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {setingsView && deviceId ? (
          <SettingsView
            deviceId={deviceId}
            sampleRate={sampleRate}
            setSampleRate={setSampleRate}
            transmitionRate={transmitionRate}
            setTransmitionRate={setTransmitionRate}
            url={url}
            setUrl={setUrl}
          />
        ) : (
          <SamplingView />
        )}
      </View>
      <View style={styles.control}>
        <Button onPress={() => setSettingsView((sv) => !sv)}>
          {setingsView ? 'Start sampling' : 'Stop sampling'}
        </Button>
      </View>
      <StatusBarComponent style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    flex: 1,
    backgroundColor: appColors.beige.main,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  control: {
    padding: 30,
  },
});
