import { View, Text } from 'react-native';

type Props = {
  deviceId: string;
  sampleRate: number;
  transmitionRate: number;
  url: string;
  transmitionFeedback: string;
};

const SamplingView: React.FC<Props> = ({
  deviceId,
  sampleRate,
  transmitionRate,
  url,
  transmitionFeedback,
}) => {
  return (
    <View>
      <Text>Device Id: {deviceId}</Text>
      <Text>Sample Rate: {sampleRate}ms</Text>
      <Text>Transmition Rate: {transmitionRate}ms</Text>
      <Text>Sending to: {url}</Text>
      <Text>{transmitionFeedback}</Text>
    </View>
  );
};

export default SamplingView;
