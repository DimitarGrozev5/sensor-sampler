import { useCallback, useRef, useState } from 'react';

type MockSensor = {
  timestamp: number;
  value: number;
};

export type SensorBuffer = {
  mockSensor: MockSensor | null;
};

const nullBuffer: SensorBuffer = {
  mockSensor: null,
};

export type SampleBufferUpdateFn = <T extends keyof SensorBuffer>(
  sensor: T,
  value: SensorBuffer[T]
) => void;

export const useBuffers = () => {
  // Sample Buffer stores the latest sensor data
  const sampleBuffer = useRef<SensorBuffer>({ ...nullBuffer });

  // batch buffer stores the samples that are taken, until the batch is transmited
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
    sampleBuffer.current = { ...nullBuffer };
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
