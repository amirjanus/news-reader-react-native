import newsService from "../../service/NewsService";

export const ActionTypes = {
    REQUEST_NEWS: "REQUEST_NEWS",
    RECEIVE_NEWS: "RECEIVE_NEWS",
    ERROR: 'ERROR'
};

function requestNews() {
    return {
        type: ActionTypes.REQUEST_NEWS,
        articles: [],
    };
}

function receiveNews( articles ) {
    return {
        type: ActionTypes.RECEIVE_NEWS,
        articles: articles,
        error: false,
    };
}

function error() {
    return {
        type: ActionTypes.ERROR,
        articles: [],
        error: true,
    };
}

export function getNews() {
    return async function( dispatch ) {
        dispatch( requestNews() );

        try {
            let articles = await newsService.getLatestNews( 'bbc-news' );

            dispatch( receiveNews( articles ) );
        } catch ( e ) {
            dispatch( error() );
        }
    };
}
