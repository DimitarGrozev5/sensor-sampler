import { useEffect, useState } from 'react';

import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { appColors } from '../style/colors';
import Spacer from './layout/spacer';
import Button from './inputs/button';

type Props = {
  deviceId: string;
  sampleRate: number;
  setSampleRate: (r: number) => void;
  transmitionRate: number;
  setTransmitionRate: (r: number) => void;
  url: string;
  setUrl: (u: string) => void;
  log: string[];
  clearLog: () => void;
};

const SettingsView: React.FC<Props> = ({
  deviceId,
  sampleRate,
  setSampleRate,
  transmitionRate,
  setTransmitionRate,
  url,
  setUrl,
  log,
  clearLog,
}) => {
  const handleRateChange =
    (setter: (val: number) => void) => (newVal: string) => {
      const value = parseInt(newVal);

      if (Number.isNaN(value) || value < 1) return;
      setter(value);
    };
  return (
    <View>
      <Text>Device ID: {deviceId}</Text>

      <Spacer gap={8} />

      <View>
        <Text>Sampling rate (in miliseconds)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter text here"
          value={sampleRate.toString()}
          onChangeText={handleRateChange(setSampleRate)}
        />
      </View>
      <Spacer gap={8} />

      <View>
        <Text>Transmition rate (in miliseconds)</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter text here"
          value={transmitionRate.toString()}
          onChangeText={handleRateChange(setTransmitionRate)}
        />
      </View>
      <Spacer gap={8} />

      <View>
        <Text>Server URL</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter text here"
          value={url}
          onChangeText={setUrl}
        />
      </View>
      <Spacer gap={8} />

      <Text>
        Note: Barometer, Acceleromter and Gyro don't accept a sampling rate of
        less thatn 200ms
      </Text>
      <Spacer gap={16} />

      <Button onPress={clearLog}>Clear log</Button>
      <Text>POST log</Text>
      <ScrollView style={styles.log}>
        {log.map((line, index) => (
          <Text key={index}>{line}</Text>
        ))}
      </ScrollView>
    </View>
  );
};

export default SettingsView;

const styles = StyleSheet.create({
  input: {
    backgroundColor: appColors.beige.light,
    borderWidth: 1,
    borderColor: appColors.orange.main,
    padding: 5,
  },
  log: {
    flex: 1,
  },
});
