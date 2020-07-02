class NewsApiService {

    constructor() {
        this._address = 'https://newsapi.org/v1/articles';
        this.apiKey = '6946d0c07a1c4555a4186bfcade76398';
    }

    async getNews( source, sortBy ) {
        const uri = `${this._address}?source=${source}&sortBy=${sortBy}&apiKey=${this.apiKey}`;

        let response = await fetch( uri );

        return response.json();
    }

}

const newsApiService = new NewsApiService();

Object.freeze( newsApiService );

export default newsApiService;
