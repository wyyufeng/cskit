import * as React from 'react'
import { connect } from 'react-redux';
import warning from "warning";

type ChildrenFunc<P = ReduxProps> = (props: P) => React.ReactNode;

export interface QueryOneProps {
    namespace: string,
    options: any
    children: ChildrenFunc
}
export interface ReduxProps {
    data: any,
    isLoading: boolean,
    error: any
}
export class QueryOne extends React.Component<QueryOneProps & ReduxProps & { fetchDispatcher: any, }> {
    componentDidMount() {
        this.callFetchDispatcher()
    }
    componentDidUpdate(prevProps: QueryOneProps) {
        // 需要确保options是不同的对象
        if (prevProps.namespace !== this.props.namespace || prevProps.options !== this.props.options) {
            this.callFetchDispatcher()
        }
    }
    callFetchDispatcher() {
        const { fetchDispatcher, options = {}, namespace } = this.props;
        fetchDispatcher(namespace, options);
    }
    render() {
        const { data, isLoading, error } = this.props;
        return this.props.children({ data, isLoading, error })
    }
}

const mapStateToProps = (state: any, ownProps: QueryOneProps) => {
    const namespace = ownProps.namespace;
    if (process.env.NODE_ENV === "development") {
        warning(
            !(typeof state[namespace] === "undefined"),
            `please ensure that you have used a model with namespace : ${
            ownProps.namespace
            } `
        );
    }
    return {
        data: state[namespace].data,
        isLoading: state[namespace].isLoading,
        error: state[namespace].error
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        fetchDispatcher: (namespace: string, options: any) => {
            dispatch({
                type: `${namespace}/start`,
                payload: options
            })
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(QueryOne)
