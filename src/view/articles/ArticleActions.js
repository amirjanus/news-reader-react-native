import newsService from '../../service/NewsService';

export const ActionTypes = {
    REQUEST_ARTICLES: 'REQUEST_POSTS',
    RECEIVE_ARTICLES: 'RECEIVE_POSTS',
    INDEX_CHANGED: 'INDEX_CHANGED',
};

/**
 * Action to notify store that the user has requested articles.
 * @returns {{type: string, articles: []}}
 */
function requestArticles() {
    return {
        type: ActionTypes.REQUEST_ARTICLES,
        articles: [],
    };
}

/**
 * Action to send article data to the store.
 * @param articles List of articles.
 * @returns {{type: string, articles: *}}
 */
function receiveArticles( articles ) {
    return {
        type: ActionTypes.RECEIVE_ARTICLES,
        articles: articles,
    };
}

/**
 * Action to send index of article selected in previous screen to the store.
 * @param index Index of selected article.
 * @returns {{index: *, type: string}}
 */
function indexChanged( index ) {
    return {
        type: ActionTypes.INDEX_CHANGED,
        index: index,
    };
}

/**
 * Starts process of getting articles data.
 * @param articleId ID of article that was selected in previous screen.
 */
export function getArticles( articleId) {
    return async function( dispatch ) {
        dispatch( requestArticles() );

        try {
            let articles = await newsService.getCachedNews( 'bbc-news' );

            let index = articles.findIndex( item => item.id === articleId );

            dispatch( indexChanged( index ) );
            dispatch( receiveArticles( articles ) );
        } catch ( e ) {
            console.log( 'Error' );
        }
    };
}
