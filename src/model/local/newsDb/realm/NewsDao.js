import Realm from 'realm';

import { v4 as uuidv4 } from 'uuid';

import { rmArticleToRmArticleMapper } from '../../../mappers/NewsMapper';

import configuration from './RealmConfuguration';
import RmNews from './models/RmNews';

/**
 * DAO for News and Article objects data operations on Realm database.
 */
class NewsDao {

    constructor( configuration ) {
        this._configuration = configuration;
    }

    /**
     * Inserts news object in database.
     * @param rmNews Object to insert in database.
     * @returns {Promise<void>}
     */
    async insert( rmNews ) {
        rmNews.articles.forEach( item => item.id = uuidv4() );

        let realm = await Realm.open( this._configuration );

        realm.write( () => {
            realm.create( RmNews.name, rmNews, true );
        } );

        realm.close();
    }

    /**
     * Returns list of articles from database,
     * @param source News source by which to query database.
     * @returns {Promise<{urlToImage, description, id: *, title: *}[]>} List of articles.
     */
    async get( source ) {
        let realm = await Realm.open( this._configuration );

        let news = realm.objectForPrimaryKey( RmNews.name, source );

        let articles = news?.articles ?? [];

        let articlesCopy = articles.map( item => rmArticleToRmArticleMapper( item ) );

        realm.close();

        return articlesCopy;
    }

    /**
     * Returns list of articles from database,
     * @param source News source by which to query database.
     * @param time Only articles after this date will be returned from database.
     * @returns {Promise<{urlToImage, description, id: *, title: *}[]>} List of articles.
     */
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

    /**
     * Deletes news and articles from database which match requested source.
     * @param source News source by which to query database.
     * @returns {Promise<void>}
     */
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
