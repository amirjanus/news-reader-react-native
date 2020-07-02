import React, { Component } from 'react';
import {
    AppState,
    View,
    Text,
    Image,
    TouchableWithoutFeedback,
    FlatList,
    ActivityIndicator,
    Alert,
    StyleSheet,
} from 'react-native';

import navigationScreens from '../navigation/NavigationScreens';
import commonStyles from '../common/styles';

/**
 * Returns FlatList item component.
 * @param props Props.
 */
function ArticlesListItem( props ) {
    return (
        <TouchableWithoutFeedback
            onPress={() => {
                props.navigation.navigate( navigationScreens.ARTICLES, { id: props.item.id } );
            }}>
            <View
                style={styles.articleItem}>
                <Image
                    style={styles.articleItemImage}
                    source={{ uri: props.item.urlToImage }}
                    loadingIndicatorSource={require( '../../assets/images/ic_image_loading.png' )}/>
                <Text
                    style={[styles.articleTitle, commonStyles.primaryTextLight]}
                    numberOfLines={2}>
                    {props.item.title}
                </Text>
            </View>
        </TouchableWithoutFeedback> );
}

/**
 * Component for news screen.
 */
class NewsComponent extends Component {
    state = {
        appState: AppState.currentState,
        wasAlertShown: false,
    };

    componentDidMount() {
        this.props.getNews();

        AppState.addEventListener( 'change', this._handleAppStateChange );
    }

    componentWillUnmount() {
        AppState.removeEventListener( 'change', this._handleAppStateChange );
    }

    /**
     * Handler that will be called when app goes to background/foreground.
     * @private
     */
    _handleAppStateChange = nextAppState => {
        if ( this.state.appState.match( /inactive|background/ ) && nextAppState === 'active' ) {
            this.props.getNews();
        }

        this.setState( { appState: nextAppState } );
    };

    /**
     * Display alert screen.
     * @private
     */
    _showAlert() {
        Alert.alert(
            'Error',
            'Oops, there has been an error.',
            [{ text: 'OK' }],
        );
    }

    /**
     * Check if there was an error and display alert if it was.
     * @private
     */
    _checkForError() {
        if ( this.props.error && !this.state.wasAlertShown ) {
            this.state.wasAlertShown = true;

            this._showAlert();
        }
    }

    render() {
        this._checkForError();

        return (
            <View
                style={[{ flex: 1 }, commonStyles.screenBackground]}>
                <FlatList
                    data={this.props.articles}
                    renderItem={( { item } ) =>
                        <ArticlesListItem
                            item={item}
                            navigation={this.props.navigation}/>}/>
                <ActivityIndicator
                    style={styles.activityIndicator}
                    size='large'
                    color='#0001ff'
                    animating={this.props.isFetching}/>
            </View>
        );
    }
}

const styles = StyleSheet.create( {
    activityIndicator: {
        position: 'absolute',
        top: '50%',
        bottom: '50%',
        left: '50%',
        right: '50%',
    },
    articleItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    articleItemImage: {
        width: 88,
        height: 88,
    },
    articleTitle: {
        flex: 1,
        marginStart: 20,
        marginEnd: 20,
        fontSize: 20,
    },
} );

export default NewsComponent;
