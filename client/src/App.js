import React from 'react';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import ProfilePage from './screens/ProfilePage';
import ListPage from './screens/ListPage';
import ListsPage from './screens/ListsPage';
import AuthPage from './screens/AuthPage';
import AuthLoadingScreen from './screens/AuthLoadingScreen';

const HomeRoutes = createStackNavigator(
    {
        Lists: ListsPage,
        Profile: ProfilePage,
	    List: ListPage
    },
    {
        initialRouteName: 'Lists',
    }
);

const InitialRoute = createStackNavigator({ Login: AuthPage });

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
