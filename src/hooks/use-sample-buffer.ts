import { useCallback, useState } from 'react';

type MockSensor = {
  timestamp: number;
  value: number;
};

type SampleBuffer = {
  mockSensor: MockSensor | null;
};

export type SampleBufferUpdateFn = <T extends keyof SampleBuffer>(
  sensor: T,
  value: SampleBuffer[T]
) => void;

export const useSampleBuffer = () => {
  const [sampleBuffer, setSampleBuffer] = useState<SampleBuffer>({
    mockSensor: null,
  });

  const updateSampleBuffer: SampleBufferUpdateFn = useCallback(
    (sensor, value) => {
      setSampleBuffer((prev) => ({ ...prev, [sensor]: value }));
      console.log('sample buffer updated');
    },
    []
  );

  return [sampleBuffer, updateSampleBuffer] as const;
};
