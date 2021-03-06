import { combineReducers } from 'redux';

import newsReducer from '../news/NewsReducer';
import articleReducer from '../articles/ArticleReducer';

/**
 * Combined reducers.
 */
const allReducers = combineReducers( {
    news: newsReducer,
    articles: articleReducer
} );

export default allReducers;
