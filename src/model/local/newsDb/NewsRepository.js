import newsDao from './realm/NewsDao';
import newsApiService from '/src/model/remote/newsApi/NewsApiService';

import { v4 as uuidv4 } from 'uuid';

import {
    rmArticleToArticleMapper,
    newsApiNewsToNewsMapper,
    newsToRmNewsMapper,
} from '/src/model/mappers/NewsMapper';

class NewsRepository {

    constructor( newsDao, newsApiService ) {
        this._newsDao = newsDao;
        this._newsApiService = newsApiService;
    }

    async cacheNews( news ) {
        let rmNews = newsToRmNewsMapper( news );

        rmNews.articles.forEach( item => item.id = uuidv4() );

        await this._newsDao.insert( rmNews );
    }

    async getLatestNews( source ) {
        let articles = await this._newsApiService.getNews( source, 'top' );

        return newsApiNewsToNewsMapper( articles );
    }

    async getCachedArticlesByDate( source, date ) {
        let articles = await this._newsDao.getLatest( source, date );

        return articles.map( item => rmArticleToArticleMapper( item ) );
    }

    async getCachedArticles( source ) {
        let articles = await this._newsDao.get( source );

        return articles.map( item => rmArticleToArticleMapper( item ) );
    }

    async deleteNews( source ) {
        await this._newsDao.delete( source );
    }

}

const newsRepository = new NewsRepository( newsDao, newsApiService );

Object.freeze( newsRepository );

export default newsRepository;
