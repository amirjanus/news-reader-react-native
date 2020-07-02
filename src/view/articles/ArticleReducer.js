import { ActionTypes } from './ArticleActions';

let initialState = {
    isFetching: false,
    didInvalidate: false,
    index: 0,
    items: [],
};

export default function articles( state = initialState, action ) {
    switch ( action.type ) {
        case ActionTypes.REQUEST_ARTICLES:
            return Object.assign( {}, state, {
                isFetching: true,
                didInvalidate: false,
                items: action.articles,
            } );

        case ActionTypes.RECEIVE_ARTICLES:
            return Object.assign( {}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.articles,
                source: action.source,
            } );

        case ActionTypes.INDEX_CHANGED:
            return Object.assign( {}, state, {
                index: action.index,
            } );

        default:
            return state;
    }
}
