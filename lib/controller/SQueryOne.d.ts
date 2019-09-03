import * as React from 'react';
export declare type DataProvider<R = string> = (resource: R) => Promise<{
    data: any;
    error?: any;
}>;
export interface QueryOneProps {
    dataProvider: DataProvider;
    resource: string;
    children: ChildrenFunc;
    type?: string;
}
export declare type ChildrenFunc<P = QueryOneState> = (props: P) => React.ReactNode;
export interface QueryOneState {
    isLoading: boolean;
    data: any;
    error: any;
}
export default class QueryOne extends React.Component<QueryOneProps, QueryOneState> {
    state: {
        data: {};
        error: null;
        isLoading: boolean;
    };
    static contextType: React.Context<{
        service: any;
    }>;
    componentDidMount(): void;
    callDataProvider(): void;
    render(): React.ReactNode;
}
