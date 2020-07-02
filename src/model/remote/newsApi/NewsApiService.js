import keys from "../../../../keys";

/**
 * Class for interacting with remote NewsApi.
 */
class NewsApiService {

    constructor( apiKey ) {
        this._url = 'https://newsapi.org/v1/articles';
        this._apiKey = apiKey;
    }

    /**
     * Returns news data from remote NewsApi.
     * @param source News source.
     * @param sortBy Articles sorting order.
     * @returns {Promise<any>}
     */
    async getNews( source, sortBy ) {
        const uri = `${this._url}?source=${source}&sortBy=${sortBy}&apiKey=${this._apiKey}`;

        let response = await fetch( uri );

        return response.json();
    }

}

const newsApiService = new NewsApiService( keys.newsApi );

Object.freeze( newsApiService );

export default newsApiService;
