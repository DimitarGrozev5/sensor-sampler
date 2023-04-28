import { useEffect, useState } from 'react';

import { View, Text, StyleSheet, TextInput } from 'react-native';
import { useGetUniqueId } from '../hooks/use-get-unique-id';
import { appColors } from '../style/colors';
import Spacer from './layout/spacer';

type Props = {
  deviceId: string;
  sampleRate: number;
  setSampleRate: (r: number) => void;
  transmitionRate: number;
  setTransmitionRate: (r: number) => void;
  url: string;
  setUrl: (u: string) => void;
};

const SettingsView: React.FC<Props> = ({
  deviceId,
  sampleRate,
  setSampleRate,
  transmitionRate,
  setTransmitionRate,
  url,
  setUrl,
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
});
