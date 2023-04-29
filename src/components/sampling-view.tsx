import { View, Text } from 'react-native';

type Props = {
  deviceId: string;
  sampleRate: number;
  transmitionRate: number;
  url: string;
};

const SamplingView: React.FC<Props> = ({
  deviceId,
  sampleRate,
  transmitionRate,
  url,
}) => {
  return (
    <View>
      <Text>Device Id: {deviceId}</Text>
      <Text>Sample Rate: {sampleRate}ms</Text>
      <Text>Transmition Rate: {transmitionRate}ms</Text>
      <Text>Sending to: {url}</Text>
    </View>
  );
};

export default SamplingView;
