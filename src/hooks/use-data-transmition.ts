import { useEffect } from 'react';
import { SensorBuffer } from './use-buffer';

export const useDataTransmition = (
  running: boolean,
  transmitionRate: number,
  pullBatchBuffer: () => SensorBuffer[]
) => {
  useEffect(() => {
    if (running) {
      const timer = setInterval(() => {
        const buffer = pullBatchBuffer();
        console.log(buffer.length);
      }, transmitionRate);

      return () => {
        clearInterval(timer);
      };
    }
  }, [running, transmitionRate, pullBatchBuffer]);
};
