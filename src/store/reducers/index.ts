import { combineReducers } from 'redux';
import { GameReducer } from './GameReducer';

export const rootReducer = combineReducers({ GameReducer });

export type RootState = ReturnType<typeof rootReducer>;
