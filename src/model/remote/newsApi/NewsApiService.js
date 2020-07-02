import keys from "../../../../keys";

class NewsApiService {

    constructor( apiKey ) {
        this._url = 'https://newsapi.org/v1/articles';
        this._apiKey = apiKey;
    }

    async getNews( source, sortBy ) {
        const uri = `${this._url}?source=${source}&sortBy=${sortBy}&apiKey=${this._apiKey}`;

        let response = await fetch( uri );

        return response.json();
    }

}

const newsApiService = new NewsApiService( keys.newsApi );

Object.freeze( newsApiService );

export default newsApiService;
