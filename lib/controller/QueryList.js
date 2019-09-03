var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import * as React from "react";
import { connect } from "react-redux";
import warning from "warning";
let i = 0;
class QueryList extends React.Component {
    constructor() {
        super(...arguments);
        this.fetchHandle = (_a) => {
            var { currentPage } = _a, options = __rest(_a, ["currentPage"]);
            const { fetchDispatcher, namespace } = this.props;
            fetchDispatcher(namespace, Object.assign({ currentPage: currentPage }, options));
        };
    }
    componentDidMount() {
        this.callFetchDispatcher();
    }
    callFetchDispatcher() {
        const { fetchDispatcher, options = {}, namespace } = this.props;
        fetchDispatcher(namespace, Object.assign({ currentPage: 1 }, options));
    }
    componentDidUpdate(prevProps) {
        // shadow eq
        if (prevProps.options !== this.props.options ||
            prevProps.namespace !== this.props.namespace) {
            this.callFetchDispatcher();
        }
    }
    ;
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
QueryList.defaultProps = {
    namespace: `LIST_COMP${i++}`,
    records: [],
    pageCount: 0,
    totalNum: 0,
    currentPage: 1,
    isLoading: true,
};
const mapStateToProps = (state, ownProps) => {
    if (process.env.NODE_ENV === "development") {
        warning(!(typeof state[ownProps.namespace] === "undefined"), `please ensure that you have used a model with namespace : ${ownProps.namespace} `);
    }
    return {
        records: state[ownProps.namespace].records,
        pageCount: state[ownProps.namespace].pageCount,
        totalNum: state[ownProps.namespace].totalNum,
        currentPage: state[ownProps.namespace].current,
        isLoading: state[ownProps.namespace].isLoading
    };
};
const mapDispatchToProps = (dispatch) => ({
    fetchDispatcher: (namespace, options) => dispatch({
        type: `${namespace}/start`,
        payload: options
    }),
    dispatch
});
export default connect(mapStateToProps, mapDispatchToProps)(QueryList);
