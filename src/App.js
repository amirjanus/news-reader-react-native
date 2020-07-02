import 'react-native-get-random-values';
import React, { Component } from 'react';

import { applyMiddleware, createStore } from 'redux';
import { Provider } from 'react-redux';
import thunkMiddleware from 'redux-thunk';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import NewsContainer from "./view/news/NewsContainer";

import navigationScreens from './view/navigation/NavigationScreens';
import allReducers from "./view/common";

let RootStack = createStackNavigator();

const store = createStore(
    allReducers,
    applyMiddleware(
        thunkMiddleware ),
);

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <NavigationContainer>
                    <RootStack.Navigator>
                        <RootStack.Screen
                            name={navigationScreens.NEWS_READER}
                            component={NewsContainer}/>
                    </RootStack.Navigator>
                </NavigationContainer>
            </Provider>
        );
    }
}
