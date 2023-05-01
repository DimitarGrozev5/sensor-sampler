import { useEffect, useState } from 'react';
import { Barometer, Gyroscope, Accelerometer } from 'expo-sensors';

import { SampleBufferUpdateFn } from './use-buffer';

export const useDeviceSensors = (
  running: boolean,
  update: SampleBufferUpdateFn,
  sampleRate: number
) => {
  const [error, setError] = useState<string[]>([]);

  // Check if sensor is available
  useEffect(() => {
    Barometer.isAvailableAsync().then((result) => {
      if (!result) {
        setError((err) => [...err, 'Barometer sensor is not available']);
      }
    });
    Gyroscope.isAvailableAsync().then((result) => {
      if (!result) {
        setError((err) => [...err, 'Gyroscope sensor is not available']);
      }
    });
    Accelerometer.isAvailableAsync().then((result) => {
      if (!result) {
        setError((err) => [...err, 'Accelerometer sensor is not available']);
      }
    });
  }, []);

  // Set sample rate
  useEffect(() => {
    const rate = Math.max(200, sampleRate);
    Barometer.setUpdateInterval(rate);
  }, [sampleRate]);

  useEffect(() => {
    let stop = false;
    if (running) {
      // Define a variable to store the location subscription
      const baroSub = Barometer.addListener((meas) => {
        // If the sensor is not set to *running*, remove the subscription
        if (stop) {
          if (baroSub) {
            baroSub.remove();
          }
          return;
        }

        // Update the sample buffer if the sensor is set to *running*
        const now = new Date().getTime();
        update('barometricSensor', {
          timestamp: now,
          value: { ...meas },
        });
      });

      const gyroSub = Gyroscope.addListener((meas) => {
        // If the sensor is not set to *running*, remove the subscription
        if (stop) {
          if (gyroSub) {
            gyroSub.remove();
          }
          return;
        }

        // Update the sample buffer if the sensor is set to *running*
        const now = new Date().getTime();
        update('gyroscopeSensor', {
          timestamp: now,
          value: { ...meas },
        });
      });

      const accSub = Accelerometer.addListener((meas) => {
        // If the sensor is not set to *running*, remove the subscription
        if (stop) {
          if (accSub) {
            accSub.remove();
          }
          return;
        }

        // Update the sample buffer if the sensor is set to *running*
        const now = new Date().getTime();
        update('accelerometerSensor', {
          timestamp: now,
          value: { ...meas },
        });
      });

      return () => {
        stop = true;
      };
    }
  }, [running, update]);

  return error;
};
