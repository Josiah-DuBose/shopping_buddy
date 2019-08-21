import React from 'react';
import {
    createSwitchNavigator,
    createStackNavigator,
    createAppContainer,
    createBottomTabNavigator
} from 'react-navigation';
import ProfilePage from './screens/ProfilePage';
import ListPage from './screens/ListPage';
import ListsPage from './screens/ListsPage';
import AuthPage from './screens/AuthPage';
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import { ClickIcon } from './components/shared';

const HomeRoutes = createStackNavigator(
    {
        Lists: {
            screen: ListsPage,
            navigationOptions: ({ navigation }) => ({
                title: 'Lists',
                headerRight: (
                    <ClickIcon styles={{ marginRight: 15}}
                        name="user"
                        size={25}
                        onPress={() => navigation.navigate('Profile')}
                    />
                )
            })
        },
        Profile: {
            screen: ProfilePage,
            navigationOptions: ({ navigation }) => ({
                title: 'Profile',
            })
        },
	    List: {
            screen: ListPage,
            navigationOptions: ({ navigation }) => ({
                title: 'List Details',
                headerRight: (
                    <ClickIcon styles={{ marginRight: 15}}
                        name="user"
                        size={25}
                        onPress={() => navigation.navigate('Profile')}
                    />
                )
            })
        }
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
