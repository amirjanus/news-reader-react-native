import { ActionTypes } from "./NewsActions";

let initialState = {
    isFetching: false,
    didInvalidate: false,
    items: [],
    error: false,
};

/**
 * Changes store state in response to news actions.
 */
export default function newsReducer( state = initialState, action ) {
    switch ( action.type ) {
        case ActionTypes.REQUEST_NEWS:
            return Object.assign( {}, state, {
                articles: action.articles,
                isFetching: true,
                didInvalidate: false,
            } );

        case ActionTypes.RECEIVE_NEWS:
            return Object.assign( {}, state, {
                isFetching: false,
                didInvalidate: false,
                items: action.articles,
                source: action.source,
                error: action.error,
            } );

        case ActionTypes.ERROR:
            return Object.assign( {}, state, {
                isFetching: false,
                didInvalidate: false,
                items: [],
                error: action.error,
            } );

        default:
            return state;
    }
}
