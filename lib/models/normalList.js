import { call, put, takeLatest } from "redux-saga/effects";
export default ({ dataProvider, namespace }) => {
    return {
        namespace: namespace,
        state: {
            isLoading: false,
            pageCount: 0,
            pageSize: 0,
            records: [],
            currentPage: 1
        },
        reducer: {
            start: (state) => (Object.assign({}, state, { isLoading: true })),
            success: (_, action) => {
                return Object.assign({ isLoading: false }, action.payload);
            },
            failure: (state, action) => (Object.assign({}, state, { isLoading: false, error: action.error }))
        },
        effect: (actions) => {
            function* worker(action) {
                try {
                    const data = yield call(dataProvider, Object.assign({}, action.payload));
                    yield put(actions.success({
                        records: data.records,
                        pageCount: data.pageCount,
                        currentPage: data.currentPage,
                        totalNum: data.totalNum
                    }));
                }
                catch (error) {
                    yield put(actions.failure(null, null, error));
                }
            }
            return function* () {
                yield takeLatest(actions.start().type, worker);
            };
        }
    };
};
