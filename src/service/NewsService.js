import newsRepository from '../model/NewsRepository';

/**
 * News service implements business logic for News and Article objects.
 */
class NewsService {

    constructor( newsRepository ) {
        this._newsRepository = newsRepository;
    }

    /**
     * Return list of latest articles.
     * @param source News source.
     * @returns {Promise<{urlToImage: string, description: *, id: *, title: *}[]|*>} List of articles.
     */
    async getLatestNews( source ) {
        const date = this.subtractMinutesFromDate( 5 );

        const articles = await this._newsRepository.getCachedArticlesByDate( source, date );

        if ( articles.length > 0 ) {
            return articles;
        }

        const news = await this._newsRepository.getLatestNews( source );
        news.publishedAt = new Date();

        await this._newsRepository.deleteNews( source );
        await this._newsRepository.cacheNews( news );

        return await this._newsRepository.getCachedArticles( source );
    }

    /**
     * Return list of articles from local database.
     * @param source News source.
     * @returns {Promise<*>} List of articles.
     */
    async getCachedNews( source ) {
        return await this._newsRepository.getCachedArticles( source );
    }

    /**
     * Subtracts amount of minutes from current data and returns it.
     * @param amount Amount of minutes to subtract.
     * @returns {Date} Subtracted date.
     */
    subtractMinutesFromDate( amount ) {
        const date = new Date();

        date.setMinutes( date.getMinutes() - amount );

        return date;
    }

}

const newsService = new NewsService( newsRepository );

Object.freeze( newsService );

export default newsService;
