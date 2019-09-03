import * as React from 'react';
import CSPreset from '../preset/preset';
export default class QueryOne extends React.Component {
    constructor() {
        super(...arguments);
        this.state = {
            data: {},
            error: null,
            isLoading: false
        };
    }
    componentDidMount() {
        this.callDataProvider();
    }
    callDataProvider() {
        const { resource } = this.props;
        let dataProvider = this.props.dataProvider;
        if (typeof dataProvider === 'undefined') {
            const service = this.context.service;
            const type = this.props.type;
            dataProvider = service(type);
        }
        this.setState({ isLoading: true });
        try {
            dataProvider(resource).then(data => {
                this.setState({ isLoading: false, data: data });
            }).catch(err => {
                this.setState({
                    isLoading: false,
                    error: err
                });
            });
        }
        catch (error) {
            this.setState({
                isLoading: false,
                error
            });
        }
    }
    render() {
        return this.props.children(Object.assign({}, this.state));
    }
}
QueryOne.contextType = CSPreset;
