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
