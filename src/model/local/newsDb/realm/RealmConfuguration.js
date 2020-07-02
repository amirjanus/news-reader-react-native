import RmNews from './models/RmNews';
import RmArticle from './models/RmArticle';

const configuration = {
    schema: [
        RmNews,
        RmArticle,
    ],
    deleteRealmIfMigrationNeeded: true,
};

export default configuration;
