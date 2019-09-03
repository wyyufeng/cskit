import * as React from 'react';
import CSPreset from '../preset/preset';
export default class SQueryList extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            isLoading: false,
            records: [],
            error: null
        };
    }
    callDataProvider() {
        this.setState({ isLoading: true });
        let dataProvider = this.props.dataProvider;
        if (typeof dataProvider === 'undefined') {
            const service = this.context.service;
            const type = this.props.type;
            dataProvider = service(type);
        }
        try {
            dataProvider().then(data => {
                this.setState({
                    records: data.redords,
                    isLoading: false
                });
            });
        }
        catch (error) {
            this.setState({ isLoading: false, error });
        }
    }
    render() {
        return this.props.children(Object.assign({}, this.state));
    }
}
SQueryList.contextType = CSPreset;
