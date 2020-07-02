import { combineReducers } from 'redux';

import newsReducer from '../news/NewsReducer';

const allReducers = combineReducers( {
    news: newsReducer,
} );

export default allReducers;
