import * as React from 'react'
import CSPreset from '../preset/preset';

export type DataProvider<R = string> = (resource: R) => Promise<{
    data: any,
    error?: any
}>;
export interface QueryOneProps {
    dataProvider: DataProvider;
    resource: string;
    children: ChildrenFunc,
    type?: string
}

export type ChildrenFunc<P = QueryOneState> = (props: P) => React.ReactNode
export interface QueryOneState {
    isLoading: boolean;
    data: any;
    error: any;
}
export default class QueryOne extends React.Component<QueryOneProps, QueryOneState> {
    state = {
        data: {},
        error: null,
        isLoading: false
    }

    static contextType = CSPreset
    componentDidMount() {
        this.callDataProvider()
    }
    callDataProvider() {
        const { resource } = this.props;
        let dataProvider = this.props.dataProvider;
        if (typeof dataProvider === 'undefined') {
            const service = this.context.service;
            const type = this.props.type;
            dataProvider = service(type)
        }
        this.setState({ isLoading: true })
        try {
            dataProvider(resource).then(data => {
                this.setState({ isLoading: false, data: data })
            }).catch(err => {
                this.setState({
                    isLoading: false,
                    error: err
                })
            })
        } catch (error) {
            this.setState({
                isLoading: false,
                error
            })
        }

    }

    render() {
        return this.props.children({ ...this.state })
    }
}
