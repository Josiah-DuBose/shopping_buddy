import React from 'react';
import { createSwitchNavigator, createStackNavigator, createAppContainer } from 'react-navigation';
import ProfilePage from './screens/ProfilePage';
import ListPage from './screens/ListPage';
import ListsPage from './screens/ListsPage';
import AuthPage from './screens/AuthPage';
import ItemPage from './screens/ItemPage';
import ListCreate from './screens/ListCreate';
import AuthLoadingScreen from './screens/AuthLoadingScreen';
import { ClickIcon, BackArrow } from './components/shared';
import { ThemeProvider } from 'react-native-elements';
import theme from'./theme';

const backProps = {
    headerBackImage: <BackArrow />,
    headerLeftContainerStyle: {paddingLeft: 10},
    headerBackTitleStyle: {
        paddingLeft: 5,
        color: '#90a4ae'
    }
};

const HomeRoutes = createStackNavigator(
    {
        Lists: {
            screen: ListsPage,
            navigationOptions: ({ navigation }) => ({
                title: 'Lists',
                headerLeft: (
                    <ClickIcon styles={{ marginLeft: 15}}
                        name="user"
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
                ),
                headerBackTitle: 'back'
            })
        },
        Profile: {
            screen: ProfilePage,
            navigationOptions: ({ navigation }) => ({
                title: 'Profile',
                ...backProps
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
                ),
                headerBackTitle: 'back',
                ...backProps
            })
        },
        ListCreate: {
            screen: ListCreate,
            navigationOptions: ({ navigation }) => ({
                title: navigation.state.params && navigation.state.params.list ?
                    navigation.state.params.list.name : 'Create List',
                ...backProps
            })
        },
        Item: {
            screen: ItemPage,
            navigationOptions: ({ navigation }) => ({
                title: navigation.state.params && navigation.state.params.item ?
                    navigation.state.params.item.name : 'Create Item',
                headerBackTitle: 'back',    
                ...backProps
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
    <ThemeProvider theme={theme}>
        <AppContainer />
    </ThemeProvider>
    
