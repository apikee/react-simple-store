import { useEffect, useState } from "react";

type CustomEventDetail<T> = {
  detail: { changes: Partial<T> & { [key: string]: any }; _state: T };
};

export type SimpleStoreState = Record<string, any>;
export type SimpleStoreListenerCallback<T> = (_newState: T) => void;
export type SimpleStoreSelector<T, U> = (state: T) => U;
export type EnhancedSimpleStoreState<T> = T & {
  _set: (value: Partial<T>) => void;
};
export interface ReactSimpleStore<T> {
  get: () => T;
  set: (value: Partial<T>) => void;
  useStore: () => EnhancedSimpleStoreState<T>;
}

const assert = (condition: boolean, message?: string) => {
  if (!condition) throw new Error(message || "Assertion failed");
};

export const simpleStore = <T = SimpleStoreState>(
  defaultValue: T
): ReactSimpleStore<T> => {
  assert(
    typeof defaultValue === "object" &&
      !Array.isArray(defaultValue) &&
      defaultValue !== null,
    "react-simple-store: default value has to be object"
  );

  const eventName = "react-simple-store-set";
  let _state: T = defaultValue;

  const _invokeListeners = (changes: Partial<T>) => {
    document.dispatchEvent(new CustomEvent(eventName, { detail: { changes } }));
  };

  const _setCallback = (value: Partial<T>): void => {
    assert(
      typeof value === "object" && !Array.isArray(value) && value !== null,
      "react-simple-store: new value has to be object"
    );

    _state = { ..._state, ...value };
    _invokeListeners(value);
  };

  const _createProxyCopy = () => {
    return { ..._state, _set: _setCallback };
  };

  const _createProxy = (cb: (property: string) => void) => {
    return new Proxy(_createProxyCopy() as any, {
      get(a, b) {
        cb(b as string);
        return a[b];
      },
    });
  };

  return {
    get: (): T => {
      return _state;
    },

    set: _setCallback,

    useStore: (): EnhancedSimpleStoreState<T> => {
      const listeners: string[] = [];

      const addListener = (property: string) => {
        if (!listeners.includes(property)) listeners.push(property);
      };

      const [value, setValue] = useState<T>(_createProxy(addListener));

      const callback = (detail: CustomEventDetail<T>["detail"]): void => {
        const { changes } = detail;
        const toChange: { [key: string]: any } = {};

        for (let key of Object.keys(changes)) {
          if (listeners.includes(key)) {
            toChange[key] = changes[key];
          }
        }

        if (Object.keys(toChange).length > 0) {
          setValue(_createProxy(addListener));
        }
      };

      useEffect(() => {
        document.addEventListener(eventName, (e) => {
          const { detail } = e as unknown as CustomEventDetail<T>;
          callback(detail);
        });
      }, []);

      return value as EnhancedSimpleStoreState<T>;
    },
  };
};
