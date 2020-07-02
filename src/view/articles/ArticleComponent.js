import React, { Component } from 'react';
import { View, Text, Image, ScrollView, StyleSheet } from 'react-native';
import { Dimensions } from 'react-native';

import Carousel from 'react-native-snap-carousel';

import commonStyles from '../common/styles';

function ArticlesCarouselItem( props ) {
    return (
        <ScrollView>
            <Image
                style={styles.articleImage}
                source={{ uri: props.item.urlToImage }}
                loadingIndicatorSource={require('../../assets/images/ic_image_loading.png')}/>
            <View style={[styles.articleTextContainer]}>
                <Text style={styles.articleTitle}>
                    {props.item.title}</Text>
                <Text style={[styles.articleDescription, commonStyles.secondaryTextLight]}>
                    {props.item.description}</Text>
            </View>
        </ScrollView> );
}

class ArticleComponent extends Component {
    componentDidMount() {
        this.props.getArticles( this.props.route.params.id );
    }

    render() {
        return (
            <View style={[{ flex: 1 }, commonStyles.screenBackground]}>
                <Carousel
                    data={this.props.articles}
                    renderItem={( { item } ) =>
                        <ArticlesCarouselItem
                            item={item}
                            index={this.props.index}/>}
                    sliderWidth={Dimensions.get( 'window' ).width}
                    itemWidth={Dimensions.get( 'window' ).width}
                    firstItem={this.props.index}
                    inactiveSlideScale={1}
                    inactiveSlideOpacity={1}/>
            </View>
        );
    }
}

const styles = StyleSheet.create( {
    articleImage: {
        width: '100%',
        height: 230,
    },
    articleTextContainer: {
        margin: 20,
    },
    articleTitle: {
        fontSize: 24,
        marginBottom: 20,
    },
    articleDescription: {
        fontSize: 15,
    },
} );

export default ArticleComponent;
