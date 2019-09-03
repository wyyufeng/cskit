import * as React from 'react'
import CSPreset from '../preset/preset';

export interface SQueryListProps {
    dataProvider: () => Promise<any>
    type: string,
    children: ChildrenFunc
}
export interface SQueryListState {
    isLoading: boolean,
    records: Array<any>,
    error: any
}
export type ChildrenFunc<P = SQueryListState> = (props: P) => React.ReactNode

export default class SQueryList extends React.Component<SQueryListProps, SQueryListState> {
    state = {
        isLoading: false,
        records: [],
        error: null

    }
    static contextType = CSPreset

    callDataProvider() {
        this.setState({ isLoading: true })
        let dataProvider = this.props.dataProvider;
        if (typeof dataProvider === 'undefined') {
            const service = this.context.service;
            const type = this.props.type;
            dataProvider = service(type)
        }
        try {
            dataProvider().then(data => {
                this.setState({
                    records: data.redords,
                    isLoading: false
                })
            })
        } catch (error) {
            this.setState({ isLoading: false, error })
        }
    }
    render() {
        return this.props.children({ ...this.state })
    }
}
