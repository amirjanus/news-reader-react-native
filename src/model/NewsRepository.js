import newsDao from './local/newsDb/realm/NewsDao';
import newsApiService from '../model/remote/newsApi/NewsApiService';


import {
    rmArticleToArticleMapper,
    newsApiNewsToNewsMapper,
    newsToRmNewsMapper,
} from './mappers/NewsMapper';

/**
 * Repository for News and Article objects.
 */
class NewsRepository {

    constructor( newsDao, newsApiService ) {
        this._newsDao = newsDao;
        this._newsApiService = newsApiService;
    }

    /**
     * Saves news object in local database.
     * @param news Object to save.
     * @returns {Promise<void>}
     */
    async cacheNews( news ) {
        let rmNews = newsToRmNewsMapper( news );

        await this._newsDao.insert( rmNews );
    }

    /**
     * Returns news data from remote NewsApi.
     * @param source News source.
     * @returns {Promise<{source: *, articles: {urlToImage: string, description: *, title: *}[]}>} News object whit list of articles.
     */
    async getLatestNews( source ) {
        let articles = await this._newsApiService.getNews( source, 'top' );

        return newsApiNewsToNewsMapper( articles );
    }

    /**
     * Return list of articles from local database.
     * @param source News source.
     * @param date Only articles after this date will be returned from database.
     * @returns {Promise<{urlToImage: string, description: *, id: *, title: *}[]>} List of articles.
     */
    async getCachedArticlesByDate( source, date ) {
        let articles = await this._newsDao.getLatest( source, date );

        return articles.map( item => rmArticleToArticleMapper( item ) );
    }

    /**
     * Return list of articles from local database.
     * @param source News source.
     * @returns {Promise<*>} List of articles.
     */
    async getCachedArticles( source ) {
        let articles = await this._newsDao.get( source );

        return articles.map( item => rmArticleToArticleMapper( item ) );
    }

    /**
     * Deletes news and articles from database which match requested source.
     * @param source News source.
     * @returns {Promise<void>}
     */
    async deleteNews( source ) {
        await this._newsDao.delete( source );
    }

}

const newsRepository = new NewsRepository( newsDao, newsApiService );

Object.freeze( newsRepository );

export default newsRepository;
