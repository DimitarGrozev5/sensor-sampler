import { useEffect } from 'react';

export const useTakeSamples = (
  running: boolean,
  sampleRate: number,
  updateBatchBuffer: () => void
) => {
  useEffect(() => {
    if (running) {
      const timer = setInterval(() => {
        updateBatchBuffer();
      }, sampleRate);

      return () => {
        clearInterval(timer);
      };
    }
  }, [running, sampleRate, updateBatchBuffer]);
};
