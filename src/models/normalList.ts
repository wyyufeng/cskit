import { Model } from "../type";
import { call, put, takeLatest } from "redux-saga/effects";
export interface ListAction {
  type: string;
  payload: {
    currentPage: number;
    [other: string]: any;
  };
  error: any;
}

export interface ListData {
  records: Array<any>;
  pageCount: number;
  currentPage: number;
  totalNum: number;
  [other: string]: any;
}

export type ListDataProvider<
  O = { currentPage: number; [other: string]: any }
> = (providerOption: O) => Promise<ListData>;

export default ({
  dataProvider,
  namespace
}: {
  dataProvider: ListDataProvider;
  namespace: string;
}): Model => {
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
      start: (state: ListData) => ({ ...state, isLoading: true }),
      success: (_: ListData, action: ListAction) => {
        return {
          isLoading: false,
          ...action.payload
        };
      },
      failure: (state: ListData, action: ListAction) => ({
        ...state,
        isLoading: false,
        error: action.error
      })
    },
    effect: (actions: any) => {
      function* worker(action: ListAction) {
        try {
          const data = yield call(dataProvider, { ...action.payload });
          yield put(
            actions.success({
              records: data.records,
              pageCount: data.pageCount,
              currentPage: data.currentPage,
              totalNum: data.totalNum
            })
          );
        } catch (error) {
          yield put(actions.failure(null, null, error));
        }
      }
      return function*() {
        yield takeLatest(actions.start().type, worker);
      };
    }
  };
};
