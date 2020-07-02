/**
 * Maps RmArticle object to RmArticle object.
 * @param rmArticle Object to map.
 * @returns {{urlToImage: (string|string), description: *, id: *, title: *}} Mapped object.
 */
export function rmArticleToRmArticleMapper( rmArticle ) {
    return {
        id: rmArticle.id,
        title: rmArticle.title,
        description: rmArticle.description,
        urlToImage: rmArticle.urlToImage,
    };
}

/**
 * Maps RmArticle object to Article object.
 * @param rmArticle Object to map.
 * @returns {{urlToImage: (string|string), description: *, id: *, title: *}} Mapped object.
 */
export function rmArticleToArticleMapper( rmArticle ) {
    return {
        id: rmArticle.id,
        title: rmArticle.title,
        description: rmArticle.description,
        urlToImage: rmArticle.urlToImage,
    };
}

/**
 * Maps Article object to RmArticle object.
 * @param article Object to map.
 * @returns {{urlToImage: (string|string), description: *, title: *}} Mapped object.
 */
export function articleToRmArticleMapper( article ) {
    return {
        title: article.title,
        description: article.description,
        urlToImage: article.urlToImage,
    };
}

/**
 * Maps News object to RmNews object.
 * @param news Object to map.
 * @returns {{publishedAt: (string|string), source: *, articles: {urlToImage: string, description: *, title: *}[]}} Mapped object.
 */
export function newsToRmNewsMapper( news ) {
    return {
        source: news.source,
        publishedAt: news.publishedAt,
        articles: news.articles.map( item => articleToRmArticleMapper( item ) ),
    };
}

/**
 * Maps NewsApi Article object to Article object.
 * @param newsApiArticle Object to map.
 * @returns {{urlToImage: (string|string), description: *, title: *}} Mapped object.
 */
export function newsApiArticleToArticle( newsApiArticle ) {
    return {
        title: newsApiArticle.title,
        description: newsApiArticle.description,
        urlToImage: newsApiArticle.urlToImage,
    };
}

/**
 * Maps NewsApi News object to News object.
 * @param newsApiNews Object to map.
 * @returns {{source: *, articles: {urlToImage: string, description: *, title: *}[]}} Mapped object.
 */
export function newsApiNewsToNewsMapper( newsApiNews ) {
    return {
        source: newsApiNews.source,
        articles: newsApiNews.articles.map( item => newsApiArticleToArticle( item ) ),
    };
}
