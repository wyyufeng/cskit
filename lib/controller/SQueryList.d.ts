import * as React from 'react';
export interface SQueryListProps {
    dataProvider: () => Promise<any>;
    type: string;
    children: ChildrenFunc;
}
export interface SQueryListState {
    isLoading: boolean;
    records: Array<any>;
    error: any;
}
export declare type ChildrenFunc<P = SQueryListState> = (props: P) => React.ReactNode;
export default class SQueryList extends React.Component<SQueryListProps, SQueryListState> {
    state: {
        isLoading: boolean;
        records: never[];
        error: null;
    };
    static contextType: React.Context<{
        service: any;
    }>;
    callDataProvider(): void;
    render(): React.ReactNode;
}
