/**
 * Article schema for Realm database.
 * @type {{name: string, properties: {urlToImage: string, description: string, id: string, title: string}, primaryKey: string}}
 */
const RmArticle = {
    name: 'Article',
    primaryKey: 'id',
    properties: {
        id: 'string',
        title: 'string',
        description: 'string',
        urlToImage: 'string',
    },
};

export default RmArticle;
