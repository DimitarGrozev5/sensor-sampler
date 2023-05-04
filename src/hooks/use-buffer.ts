import { useCallback, useRef, useState } from 'react';

type MockSensor = {
  timestamp: number;
  value: number;
};

type GPSSensor = {
  timestamp: number;
  value: {
    accuracy: number | null;
    altitude: number | null;
    altitudeAccuracy: number | null;
    heading: number | null;
    latitude: number;
    longitude: number;
    speed: number | null;
  };
};

type BarometerSensor = {
  timestamp: number;
  value: {
    pressure: number;
    relativeAltitude?: number;
  };
};
type GyroscopeSensor = {
  timestamp: number;
  value: {
    x: number;
    y: number;
    z: number;
  };
};
type AccelerometerSensor = {
  timestamp: number;
  value: {
    x: number;
    y: number;
    z: number;
  };
};

export type SensorBuffer = {
  mockSensor: MockSensor | null;
  gpsSensor: GPSSensor | null;
  barometricSensor: BarometerSensor | null;
  gyroscopeSensor: GyroscopeSensor | null;
  accelerometerSensor: AccelerometerSensor | null;
};

const nullBuffer: SensorBuffer = {
  mockSensor: null,
  gpsSensor: null,
  barometricSensor: null,
  gyroscopeSensor: null,
  accelerometerSensor: null,
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

  const getBatchBuffer = useCallback(() => {
    const batchBufferCopy = batchBuffer.current.slice();
    const samplesLength = batchBufferCopy.length;

    const commit = () => {
      batchBuffer.current.splice(0, samplesLength);
    };

    return [batchBufferCopy, commit] as const;
  }, []);

  return [
    sampleBuffer,
    batchBuffer,
    updateSampleBuffer,
    updateBatchBuffer,
    pullBatchBuffer,
    getBatchBuffer,
  ] as const;
};
