import * as React from 'react';
declare type ChildrenFunc<P = ReduxProps> = (props: P) => React.ReactNode;
export interface QueryOneProps {
    namespace: string;
    options: any;
    children: ChildrenFunc;
}
export interface ReduxProps {
    data: any;
    isLoading: boolean;
    error: any;
}
export declare class QueryOne extends React.Component<QueryOneProps & ReduxProps & {
    fetchDispatcher: any;
}> {
    componentDidMount(): void;
    componentDidUpdate(prevProps: QueryOneProps): void;
    callFetchDispatcher(): void;
    render(): React.ReactNode;
}
declare const _default: import("react-redux").ConnectedComponentClass<typeof QueryOne, Pick<QueryOneProps & ReduxProps & {
    fetchDispatcher: any;
}, "namespace" | "children" | "options"> & QueryOneProps>;
export default _default;
