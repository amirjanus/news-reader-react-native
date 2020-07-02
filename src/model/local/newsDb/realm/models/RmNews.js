/**
 * News schema for Realm database.
 * @type {{name: string, properties: {publishedAt: string, source: string, articles: string}, primaryKey: string}}
 */
const RmNews = {
    name: 'News',
    primaryKey: 'source',
    properties: {
        source: 'string',
        publishedAt: 'date',
        articles: 'Article[]',
    },
};

export default RmNews;
