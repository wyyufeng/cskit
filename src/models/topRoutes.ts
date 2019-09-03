import { takeLatest, call, put } from "redux-saga/effects";
import { Model } from "../type";

export default function createTopRoutesModel({
  dataProvider
}: {
  dataProvider: any;
}): Model {
  return {
    namespace: "toproutes",
    state: {
      isisLoading: false,
      records: []
    },
    reducer: {
      start: state => ({ ...state, isLoading: true }),
      success: (state, action) => ({
        ...state,
        ...{ isLoading: false, records: action.payload }
      }),
      failure: (_: any, action: any) => ({
        isLoading: false,
        error: action.error,
        records: []
      })
    },
    // 请求
    effect: (actions: any) => {
      function* worker() {
        try {
          const records = yield call(dataProvider);
          yield put(actions.success(records));
        } catch (error) {
          yield put(actions.failure(null, null, error));
        }
      }
      return function*() {
        yield takeLatest(actions.start().type, worker);
      };
    }
  };
}
