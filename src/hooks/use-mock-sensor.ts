import { useEffect } from 'react';
import { SampleBufferUpdateFn } from './use-buffer';

export const useMockSensor = (
  running: boolean,
  update: SampleBufferUpdateFn
) => {
  useEffect(() => {
    if (running) {
      const interval = setInterval(() => {
        const now = new Date().getTime();
        const random = Math.random();
        update('mockSensor', { timestamp: now, value: random });
      }, 100);

      return () => {
        clearInterval(interval);
      };
    }
  }, [running, update]);
};
