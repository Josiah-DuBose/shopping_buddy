import React from 'react';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import MainPage from './components/MainPage.js';
import ProfilePage from './components/ProfilePage.js';

const AppNavigator = createStackNavigator(
	{
  		Home: MainPage,
  		Profile: ProfilePage,
	},
	{
		initialRouteName: "Home"
	}
);

const AppContainer = createAppContainer(AppNavigator);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
