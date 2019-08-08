/**
 * @format
 */

import React from 'react';
import { AppRegistry } from 'react-native';
import ReviewForm from './src/components/ReviewForm';
import { name as appName } from './app.jason';
import { Root } from 'native-base';
import { createBottomTabNavigator, createAppContainer } from "react-navigation";

const TabNavigator = createBottomTabNavigator({
    ReviewForm
});
const AppContainer = createAppContainer(TabNavigator);

const wrappedView = () => {
    return (
        <Root>
                <AppContainer />
        </Root>
    );
}

AppRegistry.registerComponent(appName, () => wrappedView);
