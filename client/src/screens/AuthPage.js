import React, { Component } from 'react';
import { View, Image } from 'react-native';
import Login from '../components/Login';
import Registration from '../components/Registration';
import { Button, Text, withTheme } from 'react-native-elements';

class AuthPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            showLogin: true,
            title: '',
            buttonText: '',
            pageText: '',
            theme: this.props.theme,
            navigation: this.props.navigation
        };

        this.viewToggle = this.viewToggle.bind(this);
        this.pickForm = this.pickForm.bind(this);
    }

    componentDidMount() {
        this.resetUIState();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.state.showLogin !== prevState.showLogin) {
            this.resetUIState();
        }
    }

    resetUIState() {
        if(this.state.showLogin){
            this.setState({
                buttonText: 'Register', 
                buttonIcon: {name: 'add-user', type: 'entypo'},
                title: 'Login', 
                pageText: 'Create account?'
            });
        } else {
            this.setState({
                buttonText: 'Login',
                buttonIcon: {name: 'login', type: 'entypo'},
                title: 'Register',
                pageText: 'Already have an account?'
            });
        }
    }

    pickForm() {
        const {navigation, theme} = this.state;
        if(!this.state.showLogin){
            return( <Registration theme={theme} navigation={navigation} viewToggle={ () => this.viewToggle() }></Registration> );
        } else {
            return( <Login theme={theme} navigation={navigation} viewToggle={ () => this.viewToggle() }></Login> );
        }
    }

    viewToggle() {
        this.setState({ showLogin: !this.state.showLogin });
        this.resetUIState();
    }

    render() {
        const { buttonText, buttonIcon, pageText, theme } = this.state;
        return(
            <React.Fragment>
                <View style={theme.container}>
                    <View style={{ justifyContent: 'center',}}>
                        <Image 
                            source={
                                require('../../assets/images/ShoppingBuddy_Logo.png')
                            } 
                            style={{ 
                                width: 400, 
                                height: 400, 
                                marginLeft: '3%',
                                marginTop: '20%',
                                resizeMode: 'contain'
                            }}>
                        </Image>
                    </View>
                    { this.pickForm() }
                    <Text style={Object.assign({}, theme.description, theme.secondDes)}>{pageText}</Text>
                    <Button buttonStyle={Object.assign({}, theme.basicButton, theme.centeredButton)}
                        title={buttonText}
                        rounded={true}
                        icon={buttonIcon}
                        onPress={() => this.viewToggle()}>
                    </Button>
                </View>
            </React.Fragment>
        );
    }
}

export default withTheme(AuthPage);
