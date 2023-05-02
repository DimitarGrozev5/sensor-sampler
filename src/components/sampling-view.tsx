import { View, Text, StyleSheet, ScrollView, FlatList } from 'react-native';
import { LogEntry } from '../hooks/use-data-transmition';
import { useRef } from 'react';

type Props = {
  deviceId: string;
  sampleRate: number;
  transmitionRate: number;
  url: string;
  transmitionFeedback: string;

  gpsError: string;
  sensorsError: string[];
  log: LogEntry[];
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
  const flatListRef = useRef<FlatList | null>(null);

  const handleContentSizeChange = () => {
    if (flatListRef.current && log.length > 0)
      flatListRef.current.scrollToEnd();
  };
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
      <FlatList
        style={styles.log}
        ref={flatListRef}
        data={log}
        renderItem={({ item }) => <Text>{item.log}</Text>}
        keyExtractor={(item) => item.timestamp.toString()}
        onContentSizeChange={handleContentSizeChange}
        onLayout={handleContentSizeChange}
      />
      {/* <ScrollView style={styles.log}>
        {log.map((line) => (
          <Text key={line.timestamp}>{line.log}</Text>
        ))}
      </ScrollView> */}
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
