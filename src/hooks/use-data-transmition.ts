import { useEffect, useRef, useState } from 'react';
import { SensorBuffer } from './use-buffer';

export const useDataTransmition = (
  running: boolean,
  transmitionRate: number,
  pullBatchBuffer: () => SensorBuffer[]
) => {
  // State for user feedback
  const [feedback, setFeedback] = useState('');

  // When the feedback change from an empty string to a non-empty string,
  // the user feedback will be displayed for a few seconds
  useEffect(() => {
    const timeout = Math.min(transmitionRate / 2, 1000);
    if (feedback !== '') {
      const timer = setTimeout(() => {
        setFeedback('');
      }, timeout);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [feedback]);

  // Seting up a timer to pull data from the buffer and transmit it
  useEffect(() => {
    if (running) {
      const timer = setInterval(() => {
        const buffer = pullBatchBuffer();

        const noNullBuffer = buffer.map((b) =>
          Object.entries(b).reduce((buff, [sensor, value]) => {
            if (value !== null) {
              return { ...buff, [sensor]: value };
            }
            return buff;
          }, {} as Partial<SensorBuffer>)
        );

        const keysOnly = buffer.map((b) =>
          Object.entries(b).flatMap(([k, v]) => (!!v ? k : []))
        );

        console.log(keysOnly);

        setFeedback('Now sending...');
      }, transmitionRate);

      return () => {
        clearInterval(timer);
      };
    }
  }, [running, transmitionRate, pullBatchBuffer]);

  return feedback;
};
