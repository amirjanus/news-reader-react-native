import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { getArticles } from './ArticleActions';
import ArticleComponent from './ArticleComponent';

/**
 * Maps data from the store to ArticleComponent component.
 */
function mapStateToProps( state ) {
    return {
        articles: state.articles.items,
        index: state.articles.index,
    };
}

/**
 * Map actions to ArticleComponent component.
 */
function mapDispatchToProps( dispatch ) {
    return bindActionCreators( { getArticles: getArticles }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( ArticleComponent );
