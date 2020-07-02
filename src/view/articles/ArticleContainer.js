import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getArticles } from './ArticleActions';
import ArticleComponent from './ArticleComponent';

function mapStateToProps( state ) {
    return {
        articles: state.articles.items,
        index: state.articles.index,
    };
}

function mapDispatchToProps( dispatch ) {
    return bindActionCreators( { getArticles: getArticles }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( ArticleComponent );
