import { useEffect, useState } from "react";

export type SimpleStoreState = Record<string, any>;
export type SimpleStoreListenerCallback<T> = (_newState: T) => void;
export type SimpleStoreSelector<T, U> = (state: T) => U;
export interface ReactSimpleStore<T> {
  get: T;
  set: (value: Partial<T>) => void;
  useStoreValue: <U>(selector: SimpleStoreSelector<T, U>) => U;
}

const assert = (condition: boolean, message?: string) => {
  if (!condition) throw new Error(message || "Assertion failed");
};

export const simpleStore = <T = SimpleStoreState>(defaultValue: T) => {
  assert(
    typeof defaultValue === "object" &&
      !Array.isArray(defaultValue) &&
      defaultValue !== null,
    "react-simple-store: default value has to be object"
  );

  let _state: T = defaultValue;
  const _listeners: SimpleStoreListenerCallback<T>[] = [];

  const _invokeListeners = () => {
    for (const listener of _listeners) listener(_state);
  };

  return {
    get: (): T => {
      return _state;
    },

    set: (value: Partial<T>): void => {
      assert(
        typeof value === "object" && !Array.isArray(value) && value !== null,
        "react-simple-store: new value has to be object"
      );

      _state = { ..._state, ...value };
      _invokeListeners();
    },

    useStoreValue: <U>(selector: SimpleStoreSelector<T, U>): U => {
      const [value, setValue] = useState<T>(_state);

      const callback = (_newState: T): void => {
        setValue((prevValue: T) => {
          if (selector(_newState as T) !== selector(prevValue)) {
            return _newState as T;
          }

          return prevValue;
        });
      };

      useEffect(() => {
        _listeners.push(callback);
      }, []);

      return selector(value);
    },
  };
};
