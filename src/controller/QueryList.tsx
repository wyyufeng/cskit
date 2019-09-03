import * as React from "react";
import { connect } from "react-redux";
import warning from "warning";


type FetchHandle<A = { currentPage: number, pageSize: number, [other: string]: any }> = (option: A) => any;
type ChildrenFunc<P = ReduxProps & { fetchHandle: FetchHandle }> = (props: P) => React.ReactNode;
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

let i = 0;
class QueryList extends React.Component<
    QueryListProps & {
        fetchDispatcher: any;
    } & ReduxProps
    > {
    static defaultProps = {
        namespace: `LIST_COMP${i++}`,
        records: [],
        pageCount: 0,
        totalNum: 0,
        currentPage: 1,
        isLoading: true,
    };
    componentDidMount() {
        this.callFetchDispatcher()
    }

    callFetchDispatcher() {

        const { fetchDispatcher, options = {}, namespace } = this.props;
        fetchDispatcher(namespace, { currentPage: 1, ...options });
    }

    fetchHandle: FetchHandle = ({ currentPage, ...options }) => {
        const { fetchDispatcher, namespace } = this.props;
        fetchDispatcher(namespace, { currentPage: currentPage, ...options });
    };
    componentDidUpdate(prevProps: QueryListProps) {
        // shadow eq
        if (
            prevProps.options !== this.props.options ||
            prevProps.namespace !== this.props.namespace

        ) {
            this.callFetchDispatcher()
        }
    };
    render() {
        const { records, pageCount, currentPage, totalNum } = this.props;
        return this.props.children({
            records,
            pageCount,
            currentPage,
            totalNum,
            fetchHandle: this.fetchHandle
        });
    }
}
const mapStateToProps = (state: any, ownProps: QueryListProps) => {
    if (process.env.NODE_ENV === "development") {
        warning(
            !(typeof state[ownProps.namespace] === "undefined"),
            `please ensure that you have used a model with namespace : ${
            ownProps.namespace
            } `
        );
    }
    return {
        records: state[ownProps.namespace].records,
        pageCount: state[ownProps.namespace].pageCount,
        totalNum: state[ownProps.namespace].totalNum,
        currentPage: state[ownProps.namespace].current,
        isLoading: state[ownProps.namespace].isLoading
    };
};

const mapDispatchToProps = (dispatch: any) => ({
    fetchDispatcher: (namespace: string, options: any) =>
        dispatch({
            type: `${namespace}/start`,
            payload: options
        }),
    dispatch
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(QueryList);
