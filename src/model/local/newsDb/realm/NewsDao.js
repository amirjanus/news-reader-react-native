import Realm from 'realm';

import { rmArticleToRmArticleMapper } from '/src/model/mappers/NewsMapper';

import configuration from './RealmConfuguration';
import RmNews from './models/RmNews';

class NewsDao {

    constructor( configuration ) {
        this._configuration = configuration;
    }

    async insert( rmNews ) {
        rmNews.articles.forEach( item => item );

        let realm = await Realm.open( this._configuration );

        realm.write( () => {
            realm.create( RmNews.name, rmNews, true );
        } );

        realm.close();
    }

    async get( source ) {
        let realm = await Realm.open( this._configuration );

        let news = realm.objectForPrimaryKey( RmNews.name, source );

        let articles = news?.articles ?? [];

        let articlesCopy = articles.map( item => rmArticleToRmArticleMapper( item ) );

        realm.close();

        return articlesCopy;
    }

    async getLatest( source, time ) {
        let realm = await Realm.open( this._configuration );

        let news = realm
            .objects( RmNews.name )
            .filtered( 'source = $0 AND publishedAt > $1', source, time );

        let articles = news[ 0 ]?.articles ?? [];

        let articlesCopy = articles.map( item => rmArticleToRmArticleMapper( item ) );

        realm.close();

        return articlesCopy;
    }

    async delete( source ) {
        let realm = await Realm.open( this._configuration );

        let news = realm.objectForPrimaryKey( RmNews.name, source );

        realm.write( () => {
            if ( news?.articles ) {
                realm.delete( news.articles );
            }

            if ( news ) {
                realm.delete( news );
            }
        } );

        realm.close();
    }

}

const newsDao = new NewsDao( configuration );

Object.freeze( newsDao );

export default newsDao;
