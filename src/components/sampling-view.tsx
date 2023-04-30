import { View, Text, StyleSheet } from 'react-native';

type Props = {
  deviceId: string;
  sampleRate: number;
  transmitionRate: number;
  url: string;
  transmitionFeedback: string;

  gpsError: string;
};

const SamplingView: React.FC<Props> = ({
  deviceId,
  sampleRate,
  transmitionRate,
  url,
  transmitionFeedback,
  gpsError,
}) => {
  return (
    <View>
      <Text>Device Id: {deviceId}</Text>
      <Text>Sample Rate: {sampleRate}ms</Text>
      <Text>Transmition Rate: {transmitionRate}ms</Text>
      <Text>Sending to: {url}</Text>
      <Text>{transmitionFeedback}</Text>
      {gpsError && <Text style={styles.error}>Issue with GPS: {gpsError}</Text>}
    </View>
  );
};

export default SamplingView;

const styles = StyleSheet.create({
  error: {
    color: 'red',
  },
});
