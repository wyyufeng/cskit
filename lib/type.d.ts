export interface Action {
    type: string;
    payload?: any;
    meta?: any;
}
export declare type ActionCreatore = (...args: any[]) => Action;
export interface Actions {
    [key: string]: ActionCreatore | Action;
}
export declare type Reducer<S = any, A = Action> = (state: S | undefined, action: A) => S;
export interface ReducerMap {
    [actionType: string]: Reducer;
}
export interface Model {
    state: any;
    namespace: string;
    reducer: ReducerMap;
    effect?: Function;
}
