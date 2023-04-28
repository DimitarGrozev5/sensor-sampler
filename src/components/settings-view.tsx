import { useEffect, useMemo, useState } from 'react';

import { View, Text } from 'react-native';
import DeviceInfo from 'react-native-device-info';

type Props = {};

const SettingsView: React.FC<Props> = () => {
  const [deviceId, setDeviceId] = useState('');
  useEffect(() => {
    (async () => {
      const id = await DeviceInfo.getUniqueId();
      setDeviceId(id);
    })();
  }, []);

  return (
    <View>
      <Text>Device ID: {deviceId}</Text>
    </View>
  );
};

export default SettingsView;
