import { useCallback, useEffect, useRef, useState } from 'react';
import { SensorBuffer } from './use-buffer';
import { getDateString } from '../util/get-date-string';

export type LogEntry = { log: string; timestamp: number };

export const useSyncDataTransmition = (
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
  getBatchBuffer: () => readonly [SensorBuffer[], () => void]
) => {
  // State for user feedback
  const [feedback, setFeedback] = useState('');

  // State for HTTP Logs
  const [log, setLog] = useState<LogEntry[]>([]);
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
      let timer: NodeJS.Timeout;
      let intervalStart = new Date().getTime();
      let cancelFetch = false;

      const sendData = () => {
        // Set start time to track how long the fetch request takes
        const now = new Date();
        intervalStart = now.getTime();

        // Pull data from the batch buffer
        const [buffer, commitPull] = getBatchBuffer();

        // Remove null values for sensors
        const noNullBuffer = buffer.map((b) =>
          Object.entries(b).reduce((buff, [sensor, value]) => {
            if (value !== null) {
              return { ...buff, [sensor]: value };
            }
            return buff;
          }, {} as Partial<SensorBuffer>)
        );

        const bufferToJSON = JSON.stringify({
          deviceId,
          data: noNullBuffer,
        });

        fetch(url, { body: bufferToJSON, method: 'POST' })
          .then((res) => {
            const now = new Date();
            if (res.ok) {
              // Update the log
              setLog((lg) => [
                ...lg,
                {
                  timestamp: now.getTime(),
                  log: `[${getDateString(now)}]: Sent ${
                    noNullBuffer.length
                  } records`,
                },
              ]);

              // Remove the data that is sent from the batch buffer
              commitPull();
            } else {
              throw new Error(`Status ${res.status}`);
            }
          })
          .catch((err) => {
            const now = new Date();
            // Update the log
            setLog((lg) => [
              ...lg,
              {
                timestamp: now.getTime(),
                log: `[${getDateString(now)}]: Error sending data: ${
                  err.message
                }`,
              },
            ]);
          })
          .finally(() => {
            if (cancelFetch) {
              return;
            }
            // Start new timeout for next batch
            // If the last fetch took more than the transmition rate, run next fetch immediatly
            // If the last fetch took less than the transmition rate, start a timeout
            const now = new Date();
            const timePastedFromLastInterval = now.getTime() - intervalStart;
            intervalStart = now.getTime();

            if (timePastedFromLastInterval >= transmitionRate) {
              timer = setTimeout(sendData, 0);
            } else {
              timer = setTimeout(
                sendData,
                transmitionRate - timePastedFromLastInterval
              );
            }
          });

        setFeedback('Now sending...');
      };

      timer = setTimeout(sendData, transmitionRate);

      return () => {
        clearTimeout(timer);
        cancelFetch = true;

        const [buffer] = getBatchBuffer();

        setLog((lg) => [
          ...lg,
          {
            timestamp: new Date().getTime(),
            log: `[${getDateString(new Date())}]: ${
              buffer.length
            } records are not sent yet. Stopping transmition.`,
          },
        ]);
      };
    }
  }, [running, deviceId, transmitionRate, getBatchBuffer]);

  // useEffect(() => {
  //   if (running && deviceId) {
  //     let timer: NodeJS.Timeout;
  //     let intervalStart = new Date().getTime();
  //     let cancelFetch = false;

  //     const sendData = () => {
  //       // Set start time to track how long the fetch request takes
  //       const now = new Date();
  //       intervalStart = now.getTime();

  //       setTimeout(() => {
  //         if (cancelFetch) {
  //           return;
  //         }
  //         console.log('done');

  //         // Start new timeout for next batch
  //         // If the last fetch took more than the transmition rate, run next fetch immediatly
  //         // If the last fetch took less than the transmition rate, start a timeout
  //         const now = new Date();
  //         const timePastedFromLastInterval = now.getTime() - intervalStart;
  //         intervalStart = now.getTime();

  //         if (timePastedFromLastInterval >= transmitionRate) {
  //           timer = setTimeout(sendData, 0);
  //         } else {
  //           timer = setTimeout(
  //             sendData,
  //             transmitionRate - timePastedFromLastInterval
  //           );
  //         }
  //       }, Math.floor(Math.random() * (3000 - 200 + 1) + 200));
  //     };

  //     timer = setTimeout(sendData, transmitionRate);

  //     return () => {
  //       clearTimeout(timer);
  //       cancelFetch = true;
  //     };
  //   }
  // }, [running, deviceId, transmitionRate, getBatchBuffer]);

  return [feedback, log, clearLog] as const;
};
