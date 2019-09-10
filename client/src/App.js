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
import ItemPage from './screens/ItemPage';
import ListCreate from './screens/ListCreate';
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import { ClickIcon } from './components/shared';

const HomeRoutes = createStackNavigator(
    {
        Lists: {
            screen: ListsPage,
            navigationOptions: ({ navigation }) => ({
                title: 'Lists',
                headerLeft: (
                    <ClickIcon styles={{ marginRight: 15}}
                        name="gear"
                        size={25}
                        onPress={() => navigation.navigate('Profile')}
                    />
                ),
                headerRight: (
                    <ClickIcon styles={{ marginRight: 15}}
                        name="plus-circle"
                        size={25}
                        onPress={() => navigation.push('ListCreate')}
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
                title: navigation.state.params.listName,
                headerRight: (
                    <ClickIcon styles={{ marginRight: 15}}
                        name="plus-circle"
                        size={25}
                        onPress={() => navigation.push('Item', {
                            listId: navigation.state.params.listId, 
                            listName: navigation.state.params.listName
                        })}
                    />
                )
            })
        },
        ListCreate: {
            screen: ListCreate,
            navigationOptions: ({ navigation }) => ({
                title: navigation.state.params && navigation.state.params.list ?
                navigation.state.params.list.name : 'Create List'
            })
        },
        Item: {
            screen: ItemPage,
            navigationOptions: ({ navigation }) => ({
                title: navigation.state.params && navigation.state.params.item ?
                    navigation.state.params.item.name : 'Create Item',
            })
        }
    },
    {
        initialRouteName: 'Lists',
    }
);

const AuthRoute = createStackNavigator({
    Login: {
        screen: AuthPage,
        navigationOptions: {
            title: 'Shopping Buddy',
        }
    }
});

const AppContainer = createAppContainer(createSwitchNavigator(
  	{
    	AuthLoading: AuthLoadingScreen,
    	Home: HomeRoutes,
    	Auth: AuthRoute,
  	},
  	{
    	initialRouteName: 'AuthLoading',
  	}
));

export default () =>
    <AppContainer />
