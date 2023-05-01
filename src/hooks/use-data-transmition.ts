import { useCallback, useEffect, useRef, useState } from 'react';
import { SensorBuffer } from './use-buffer';
import { getDateString } from '../util/get-date-string';

export const useDataTransmition = (
  running: boolean,
  {
    transmitionRate,
    deviceId,
    url,
  }: {
    transmitionRate: number;
    deviceId: string | null;
    url: string;
  },
  pullBatchBuffer: () => SensorBuffer[]
) => {
  // State for user feedback
  const [feedback, setFeedback] = useState('');

  // State for HTTP Logs
  const [log, setLog] = useState<string[]>([]);
  const clearLog = useCallback(() => setLog([]), []);

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
    if (running && deviceId) {
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

        // const keysOnly = buffer.map((b) =>
        //   Object.entries(b).flatMap(([k, v]) => (!!v ? k : []))
        // );
        // console.log(keysOnly);

        const bufferToJSON = JSON.stringify({ deviceId, data: noNullBuffer });

        fetch(url, { body: bufferToJSON, method: 'POST' })
          .then((res) => {
            const now = getDateString(new Date());
            if (res.ok) {
              setLog((lg) => [
                ...lg,
                `[${now}]: Sent ${noNullBuffer.length} records`,
              ]);
            } else {
              throw new Error(`Status ${res.status}`);
            }
          })
          .catch((err) => {
            const now = getDateString(new Date());
            setLog((lg) => [
              ...lg,
              `[${now}]: Error sending data: ${err.message}`,
            ]);
          });

        setFeedback('Now sending...');
      }, transmitionRate);

      return () => {
        clearInterval(timer);
      };
    }
  }, [running, deviceId, transmitionRate, pullBatchBuffer]);

  return [feedback, log, clearLog] as const;
};
