import { createStore } from 'redux';
import { rootReducer } from './reducers';

export const store = createStore(rootReducer);

export * as actionCreators from './action-creators/action-creators';
