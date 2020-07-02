import RmNews from './models/RmNews';
import RmArticle from './models/RmArticle';

/**
 * Configuration object for Realm database.
 * @type {{schema: [
 * {name: string, properties: {publishedAt: string, source: string, articles: string}, primaryKey: string},
 * {name: string, properties: {urlToImage: string, description: string, id: string, title: string}, primaryKey: string}
 * ],
 * deleteRealmIfMigrationNeeded: boolean}}
 */
const configuration = {
    schema: [
        RmNews,
        RmArticle,
    ],
    deleteRealmIfMigrationNeeded: true,
};

export default configuration;
