import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { appColors } from '../style/colors';
import Spacer from './layout/spacer';
import Button from './inputs/button';
import NumberInput from './inputs/number-input';

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
  return (
    <View>
      <Text>
        <Text style={styles.header}>Device ID:</Text> {deviceId}
      </Text>

      <Spacer gap={10} />

      <View>
        <Text style={styles.header}>Sampling rate (in miliseconds)</Text>
        <NumberInput value={sampleRate} onChange={setSampleRate} />
        {/* <TextInput
          style={styles.input}
          placeholder="Enter text here"
          value={sampleRate.toString()}
          onChangeText={handleRateChange(setSampleRate)}
        /> */}
      </View>
      <Spacer gap={10} />

      <View>
        <Text style={styles.header}>Transmition rate (in miliseconds)</Text>
        <NumberInput value={transmitionRate} onChange={setTransmitionRate} />
        {/* <TextInput
          style={styles.input}
          placeholder="Enter text here"
          value={transmitionRate.toString()}
          onChangeText={handleRateChange(setTransmitionRate)}
        /> */}
      </View>
      <Spacer gap={10} />

      <View>
        <Text style={styles.header}>Server URL</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter text here"
          value={url}
          onChangeText={setUrl}
        />
      </View>
      <Spacer gap={10} />

      <Text>
        Note: Barometer, Acceleromter and Gyro don't accept a sampling rate of
        less thatn 200ms; GPS will probably not update that often anyways;
      </Text>
      <Spacer gap={16} />

      <Text style={styles.header}>POST log</Text>
      <Button plain onPress={clearLog}>
        Clear log
      </Button>
      <ScrollView style={styles.log}>
        {log.length === 0 && <Text>Nothing to log yet</Text>}
        {log.map((line, index) => (
          <Text key={index}>{line}</Text>
        ))}
      </ScrollView>
    </View>
  );
};

export default SettingsView;

const styles = StyleSheet.create({
  header: {
    fontSize: 18,
    color: appColors.orange.main,
  },
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
