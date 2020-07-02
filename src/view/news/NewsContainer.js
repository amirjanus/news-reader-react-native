import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import NewsComponent from './NewsComponent';
import { getNews } from "./NewsActions";

function mapStateToProps( state ) {
    return {
        articles: state.news.items,
        isFetching: state.news.isFetching,
        error: state.news.error,
    };
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( { getNews: getNews }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( NewsComponent );
