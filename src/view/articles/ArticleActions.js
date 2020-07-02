import newsService from '../../service/NewsService';

export const ActionTypes = {
    REQUEST_ARTICLES: 'REQUEST_POSTS',
    RECEIVE_ARTICLES: 'RECEIVE_POSTS',
    INDEX_CHANGED: 'INDEX_CHANGED',
};

function requestArticles() {
    return {
        type: ActionTypes.REQUEST_ARTICLES,
        articles: [],
    };
}

function receiveArticles( articles ) {
    return {
        type: ActionTypes.RECEIVE_ARTICLES,
        articles: articles,
    };
}

function indexChanged( index ) {
    return {
        type: ActionTypes.INDEX_CHANGED,
        index: index,
    };
}

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
