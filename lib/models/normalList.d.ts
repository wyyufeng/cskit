import { Model } from "../type";
export interface ListAction {
    type: string;
    payload: {
        currentPage: number;
        [other: string]: any;
    };
    error: any;
}
export interface ListData {
    records: Array<any>;
    pageCount: number;
    currentPage: number;
    totalNum: number;
    [other: string]: any;
}
export declare type ListDataProvider<O = {
    currentPage: number;
    [other: string]: any;
}> = (providerOption: O) => Promise<ListData>;
declare const _default: ({ dataProvider, namespace }: {
    dataProvider: ListDataProvider<{
        [other: string]: any;
        currentPage: number;
    }>;
    namespace: string;
}) => Model;
export default _default;
