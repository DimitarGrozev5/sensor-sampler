import { View, Text, StyleSheet, ScrollView } from 'react-native';

type Props = {
  deviceId: string;
  sampleRate: number;
  transmitionRate: number;
  url: string;
  transmitionFeedback: string;

  gpsError: string;
  sensorsError: string[];
  log: string[];
};

const SamplingView: React.FC<Props> = ({
  deviceId,
  sampleRate,
  transmitionRate,
  url,
  transmitionFeedback,
  gpsError,
  sensorsError,
  log,
}) => {
  return (
    <View>
      <Text>Device Id: {deviceId}</Text>
      <Text>Sample Rate: {sampleRate}ms</Text>
      <Text>Transmition Rate: {transmitionRate}ms</Text>
      <Text>Sending to: {url}</Text>
      <Text>{transmitionFeedback}</Text>
      {gpsError && <Text style={styles.error}>Issue with GPS: {gpsError}</Text>}
      {sensorsError.length > 0 && (
        <Text style={styles.error}>
          Issue with sensors: {sensorsError.join(', ')}
        </Text>
      )}

      <Text>POST log</Text>
      <ScrollView style={styles.log}>
        {log.map((line, index) => (
          <Text key={index}>{line}</Text>
        ))}
      </ScrollView>
    </View>
  );
};

export default SamplingView;

const styles = StyleSheet.create({
  error: {
    color: 'red',
  },
  log: {
    flex: 1,
  },
});
