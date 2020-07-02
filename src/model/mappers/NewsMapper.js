export function rmArticleToRmArticleMapper( rmArticle ) {
    return {
        id: rmArticle.id,
        title: rmArticle.title,
        description: rmArticle.description,
        urlToImage: rmArticle.urlToImage,
    };
}

export function rmArticleToArticleMapper( rmArticle ) {
    return {
        id: rmArticle.id,
        title: rmArticle.title,
        description: rmArticle.description,
        urlToImage: rmArticle.urlToImage,
    };
}

export function articleToRmArticleMapper( article ) {
    return {
        title: article.title,
        description: article.description,
        urlToImage: article.urlToImage,
    };
}

export function newsToRmNewsMapper( news ) {
    return {
        source: news.source,
        publishedAt: news.publishedAt,
        articles: news.articles.map( item => articleToRmArticleMapper( item ) ),
    };
}

export function newsApiArticleToArticle( newsApiArticle ) {
    return {
        title: newsApiArticle.title,
        description: newsApiArticle.description,
        urlToImage: newsApiArticle.urlToImage,
    };
}

export function newsApiNewsToNewsMapper( newsApiNews ) {
    return {
        source: newsApiNews.source,
        articles: newsApiNews.articles.map( item => newsApiArticleToArticle( item ) ),
    };
}
