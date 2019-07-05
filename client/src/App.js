import React from 'react';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import ListsPage from './screens/ListsPage.js';
import ListPage from './screens/ListPage.js';
import ProfilePage from './screens/ProfilePage.js';
import Auth from './screens/Auth.js';
import AuthLoadingScreen from './screens/AuthLoadingScreen.js';

const HomeRoutes = createStackNavigator({
	Profile: ProfilePage,
	Lists: ListsPage,
	List: ListPage
});

const InitialRoute = createStackNavigator({ Login: Auth });

export default createAppContainer(createSwitchNavigator(
  	{
    	AuthLoading: AuthLoadingScreen,
    	App: HomeRoutes,
    	Auth: InitialRoute,
  	},
  	{
    	initialRouteName: 'AuthLoading',
  	}
));
