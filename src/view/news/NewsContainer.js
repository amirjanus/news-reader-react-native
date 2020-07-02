import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import NewsComponent from './NewsComponent';
import { getNews } from "./NewsActions";

/**
 * Maps data from the store to NewsComponent component.
 */
function mapStateToProps( state ) {
    return {
        articles: state.news.items,
        isFetching: state.news.isFetching,
        error: state.news.error,
    };
}

/**
 * Map actions to NewsComponent component.
 */
function mapDispatchToProps( dispatch ) {
    return bindActionCreators( { getNews: getNews }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( NewsComponent );
