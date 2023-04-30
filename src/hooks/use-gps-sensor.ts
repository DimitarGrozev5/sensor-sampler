import { useEffect, useRef, useState } from 'react';

import * as Location from 'expo-location';

import { SampleBufferUpdateFn } from './use-buffer';

export const useGPSSensor = (
  running: boolean,
  update: SampleBufferUpdateFn,
  sampleRate: number
) => {
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    let stop = false;

    if (running) {
      // Define a variable to store the location subscription
      let watchSub: Location.LocationSubscription | null = null;

      (async () => {
        // Check location permissions
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setErrorMsg(
            `Permission to access location was denied. Status: ${status}`
          );
          return;
        }

        // Setup a new subscription for location data
        watchSub = await Location.watchPositionAsync(
          {
            accuracy: Location.Accuracy.BestForNavigation,
            timeInterval: (sampleRate * 3) / 4,
          },
          (position) => {
            // If the sensor is not set to *running*, remove the subscription
            if (stop) {
              if (watchSub) {
                watchSub.remove();
              }
              return;
            }

            // Update the sample buffer if the sensor is set to *running*
            update('gpsSensor', {
              timestamp: position.timestamp,
              value: position.coords,
            });
            setErrorMsg('');
          }
        );
      })();

      return () => {
        stop = true;
      };
    }
  }, [running, update, sampleRate]);

  return errorMsg;
};
