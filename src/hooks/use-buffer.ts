import { useCallback, useRef, useState } from 'react';

type MockSensor = {
  timestamp: number;
  value: number;
};

export type SensorBuffer = {
  mockSensor: MockSensor | null;
};

export type SampleBufferUpdateFn = <T extends keyof SensorBuffer>(
  sensor: T,
  value: SensorBuffer[T]
) => void;

export const useBuffers = () => {
  const sampleBuffer = useRef<SensorBuffer>({
    mockSensor: null,
  });

  const batchBuffer = useRef<SensorBuffer[]>([]);

  const updateSampleBuffer: SampleBufferUpdateFn = useCallback(
    (sensor, value) => {
      sampleBuffer.current[sensor] = value;
      // console.log('sample buffer updated');
    },
    []
  );

  const updateBatchBuffer = useCallback(() => {
    batchBuffer.current.push(sampleBuffer.current);
    // console.log('batch buffer updated');
  }, []);

  const pullBatchBuffer = useCallback(() => {
    const batchBufferCopy = batchBuffer.current.slice();
    batchBuffer.current = [];

    return batchBufferCopy;
  }, []);

  return [
    sampleBuffer,
    batchBuffer,
    updateSampleBuffer,
    updateBatchBuffer,
    pullBatchBuffer,
  ] as const;
};
