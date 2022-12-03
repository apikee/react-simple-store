export declare type SimpleStoreState = Record<string, any>;
export declare type SimpleStoreListenerCallback<T> = (_newState: T) => void;
export declare type SimpleStoreSelector<T, U> = (state: T) => U;
export interface ReactSimpleStore<T> {
    get: T;
    set: (value: Partial<T>) => void;
    useStoreValue: <U>(selector: SimpleStoreSelector<T, U>) => U;
}
export declare const simpleStore: <T = SimpleStoreState>(defaultValue: T) => {
    get: () => T;
    set: (value: Partial<T>) => void;
    useStoreValue: <U>(selector: SimpleStoreSelector<T, U>) => U;
};
