import newsService from "../../service/NewsService";

export const ActionTypes = {
    REQUEST_NEWS: "REQUEST_NEWS",
    RECEIVE_NEWS: "RECEIVE_NEWS",
    ERROR: 'ERROR'
};

/**
 * Action to notify store that the user has requested news.
 * @returns {{type: string, articles: []}}
 */
function requestNews() {
    return {
        type: ActionTypes.REQUEST_NEWS,
        articles: [],
    };
}

/**
 * Action to send article data to the store.
 * @param articles List of articles.
 * @returns {{type: string, error: boolean, articles: *}}
 */
function receiveNews( articles ) {
    return {
        type: ActionTypes.RECEIVE_NEWS,
        articles: articles,
        error: false,
    };
}

/**
 * Action to send error data to the store.
 * @returns {{type: string, error: boolean, articles: []}}
 */
function error() {
    return {
        type: ActionTypes.ERROR,
        articles: [],
        error: true,
    };
}

/**
 * Starts process of getting news data.
 */
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
