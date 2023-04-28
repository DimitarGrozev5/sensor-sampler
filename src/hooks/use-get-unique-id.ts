import { useEffect, useState } from 'react';
import uniqueId from 'react-native-unique-id';

export const useGetUniqueId = () => {
  const [deviceId, setDeviceId] = useState<string | null>(null);
  useEffect(() => {
    uniqueId().then((id) => setDeviceId(id));
  }, []);

  return deviceId;
};
