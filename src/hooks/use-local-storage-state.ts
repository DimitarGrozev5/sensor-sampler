import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type StoredState = {
  type: 'string' | 'number';
  value: string;
};

const getKey = (varName: string) => `localStorageState-${varName}`;

export const useLocalStorageState = <T extends string | number>(
  varName: string,
  initValue: T
) => {
  const [state, setState] = useState<T>(initValue);
  const [feedback, setFeedback] = useState<string>('');

  // Try to retrieve data from storage on first load
  useEffect(() => {
    (async () => {
      try {
        const value = await AsyncStorage.getItem(getKey(varName));

        // If there is data, set the state to that data
        if (value !== null) {
          const parsedValue: StoredState = JSON.parse(value);
          const storedState =
            parsedValue.type === 'number'
              ? (Number(parsedValue.value) as T)
              : (parsedValue.value as T);
          setState(storedState);
        } else {
          // If there is no data, set the local storage to the initData
          const dataToStore = JSON.stringify({
            type: typeof initValue,
            value: initValue.toString(),
          });
          await AsyncStorage.setItem(getKey(varName), dataToStore);
        }
        setFeedback('');
      } catch (e: unknown) {
        if (
          typeof e === 'object' &&
          e !== null &&
          'message' in e &&
          typeof e.message === 'string'
        ) {
          setFeedback(e.message);
        } else {
          setFeedback('Unknown error with saving state to local storage');
        }
      }
    })();
  }, [varName]);

  // When the state changes, store the data in local storage
  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const dataToStore = JSON.stringify({
          type: typeof state,
          value: state.toString(),
        });
        await AsyncStorage.setItem(getKey(varName), dataToStore);
        setFeedback('');
      } catch (e: unknown) {
        if (
          typeof e === 'object' &&
          e !== null &&
          'message' in e &&
          typeof e.message === 'string'
        ) {
          setFeedback(e.message);
        } else {
          setFeedback('Unknown error with saving state to local storage');
        }
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [state, varName]);

  return [state, setState, feedback] as const;
};
