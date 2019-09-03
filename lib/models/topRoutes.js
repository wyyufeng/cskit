import { takeLatest, call, put } from "redux-saga/effects";
export default function createTopRoutesModel({ dataProvider }) {
    return {
        namespace: "toproutes",
        state: {
            isisLoading: false,
            records: []
        },
        reducer: {
            start: state => (Object.assign({}, state, { isLoading: true })),
            success: (state, action) => (Object.assign({}, state, { isLoading: false, records: action.payload })),
            failure: (_, action) => ({
                isLoading: false,
                error: action.error,
                records: []
            })
        },
        // 请求
        effect: (actions) => {
            function* worker() {
                try {
                    const records = yield call(dataProvider);
                    yield put(actions.success(records));
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
}
