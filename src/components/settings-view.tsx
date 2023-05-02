import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native';
import { appColors } from '../style/colors';
import Spacer from './layout/spacer';
import Button from './inputs/button';
import NumberInput from './inputs/number-input';
import { LogEntry } from '../hooks/use-data-transmition';

type Props = {
  deviceId: string;
  sampleRate: number;
  setSampleRate: (r: number) => void;
  transmitionRate: number;
  setTransmitionRate: (r: number) => void;
  url: string;
  setUrl: (u: string) => void;
  log: LogEntry[];
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
      </View>
      <Spacer gap={10} />

      <View>
        <Text style={styles.header}>Transmition rate (in miliseconds)</Text>
        <NumberInput value={transmitionRate} onChange={setTransmitionRate} />
      </View>
      <Spacer gap={10} />

      <View>
        <Text style={styles.header}>Server URL</Text>
        <View style={styles.inputContrainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter text here"
            value={url}
            onChangeText={setUrl}
          />
          <Button onPress={() => setUrl('https://')} plain>
            X
          </Button>
        </View>
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
        {log.length === 0 && <Text>No log yet</Text>}
        {log.map((line) => (
          <Text key={line.timestamp}>{line.log}</Text>
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
  inputContrainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: appColors.beige.light,
    borderWidth: 1,
    borderColor: appColors.orange.main,
  },
  input: {
    padding: 5,
    flex: 1,
  },
  log: {
    flex: 1,
  },
});
