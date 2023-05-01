import { useState } from 'react';

import { StatusBar as StatusBarComponent } from 'expo-status-bar';
import {
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  Text,
} from 'react-native';

import SettingsView from './src/components/settings-view';
import SamplingView from './src/components/sampling-view';
import { appColors } from './src/style/colors';
import { useGetUniqueId } from './src/hooks/use-get-unique-id';
import Button from './src/components/inputs/button';
import { useBuffers } from './src/hooks/use-buffer';
import { useMockSensor } from './src/hooks/use-mock-sensor';
import { useDataTransmition } from './src/hooks/use-data-transmition';
import { useTakeSamples } from './src/hooks/use-take-samples';
import { useGPSSensor } from './src/hooks/use-gps-sensor';
import { useDeviceSensors } from './src/hooks/use-device-senosrs';

export default function App() {
  const [setingsView, setSettingsView] = useState(true);

  const deviceId = useGetUniqueId();

  // State for settings
  const [sampleRate, setSampleRate] = useState(200);
  const [transmitionRate, setTransmitionRate] = useState(1000);
  const [url, setUrl] = useState(
    'https://www.toptal.com/developers/postbin/1682921773251-2660758406855'
  );

  // Sample buffer
  const [, , updateSampleBuffer, updateBatchBuffer, pullBatchBuffer] =
    useBuffers();

  // State for sampling
  const [running, setRunning] = useState(false);

  // Setup sensors
  // useMockSensor(running, updateSampleBuffer);
  const gpsError = useGPSSensor(running, updateSampleBuffer, sampleRate);
  const barometerError = useDeviceSensors(
    running,
    updateSampleBuffer,
    sampleRate
  );

  // Stup timers for taking samples from the sample buffer and transmiting them
  useTakeSamples(running, sampleRate, updateBatchBuffer);
  const [feedback, log, clearLog] = useDataTransmition(
    running,
    { transmitionRate, deviceId, url },
    pullBatchBuffer
  );

  const handleStartStop = () => {
    setSettingsView((sv) => !sv);
    setRunning((r) => !r);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {deviceId ? (
          <>
            {setingsView ? (
              <SettingsView
                deviceId={deviceId}
                sampleRate={sampleRate}
                setSampleRate={setSampleRate}
                transmitionRate={transmitionRate}
                setTransmitionRate={setTransmitionRate}
                url={url}
                setUrl={setUrl}
                log={log}
                clearLog={clearLog}
              />
            ) : (
              <SamplingView
                deviceId={deviceId}
                sampleRate={sampleRate}
                transmitionRate={transmitionRate}
                url={url}
                transmitionFeedback={feedback}
                gpsError={gpsError}
                sensorsError={barometerError}
                log={log}
              />
            )}
          </>
        ) : (
          <Text>Device ID is not set yet</Text>
        )}
      </View>
      <View style={styles.control}>
        <Button onPress={handleStartStop}>
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
    paddingHorizontal: 5,
  },
  control: {
    padding: 30,
  },
});
