import * as React from "react";
declare type FetchHandle<A = {
    currentPage: number;
    pageSize: number;
    [other: string]: any;
}> = (option: A) => any;
declare type ChildrenFunc<P = ReduxProps & {
    fetchHandle: FetchHandle;
}> = (props: P) => React.ReactNode;
export interface QueryListProps {
    children: ChildrenFunc;
    namespace: string;
    options: any;
}
export interface ReduxProps {
    pageCount: number;
    currentPage: number;
    records: Array<any>;
    totalNum: number;
}
declare class QueryList extends React.Component<QueryListProps & {
    fetchDispatcher: any;
} & ReduxProps> {
    static defaultProps: {
        namespace: string;
        records: never[];
        pageCount: number;
        totalNum: number;
        currentPage: number;
        isLoading: boolean;
    };
    componentDidMount(): void;
    callFetchDispatcher(): void;
    fetchHandle: FetchHandle;
    componentDidUpdate(prevProps: QueryListProps): void;
    render(): React.ReactNode;
}
declare const _default: import("react-redux").ConnectedComponentClass<typeof QueryList, Pick<QueryListProps & {
    fetchDispatcher: any;
} & ReduxProps, "namespace" | "children" | "options"> & QueryListProps>;
export default _default;
