export declare type SimpleStoreState = Record<string, any>;
export declare type SimpleStoreListenerCallback<T> = (_newState: T) => void;
export declare type SimpleStoreSelector<T, U> = (state: T) => U;
export declare type EnhancedSimpleStoreState<T> = T & {
    _set: (value: Partial<T>) => void;
};
export interface ReactSimpleStore<T> {
    get: () => T;
    set: (value: Partial<T>) => void;
    useStore: () => EnhancedSimpleStoreState<T>;
}
export declare const simpleStore: <T = SimpleStoreState>(defaultValue: T) => ReactSimpleStore<T>;
