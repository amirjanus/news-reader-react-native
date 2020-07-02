import newsRepository from '/src/model/NewsRepository';

class NewsService {

    constructor( newsRepository ) {
        this._newsRepository = newsRepository;
    }

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

    async getCachedNews( source ) {
        return await this._newsRepository.getCachedArticles( source );
    }

    subtractMinutesFromDate( amount ) {
        const date = new Date();

        date.setMinutes( date.getMinutes() - amount );

        return date;
    }

}

const newsService = new NewsService( newsRepository );

Object.freeze( newsService );

export default newsService;
