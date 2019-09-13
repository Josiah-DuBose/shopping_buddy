import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Login, Registration } from '../components';
import { Button, Text } from 'react-native-elements';

export default class AuthPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            showLogin: true,
            title: '',
            buttonText: '',
            pageText: ''
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
        const nav = this.props.navigation;
        if(!this.state.showLogin){
            return( <Registration navigation={nav} viewToggle={ () => this.viewToggle() }/> );
        } else {
            return( <Login navigation={nav} viewToggle={ () => this.viewToggle() }/> );
        }
    }

    viewToggle() {
        this.setState({ showLogin: !this.state.showLogin });
        this.resetUIState();
    }

    render() {
        const { title, buttonText, buttonIcon, pageText } = this.state;
        return(
            <React.Fragment>
                <View style={styles.container}>
                    <Text style={styles.description}>{title}</Text>
                    { this.pickForm() }
                    <Text style={Object.assign({}, styles.description, styles.secondDes)}>{pageText}</Text>
                    <Button buttonStyle={styles.button}
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

const styles = StyleSheet.create({
    container: {
        marginTop: '30%'
    },
    description: {
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        color: '#656565'
    },
    secondDes: {
        marginTop: 20,
        paddingBottom: '5%'
    },
    button: {
        maxWidth: '50%',
        backgroundColor: 'grey',
        marginLeft: '25%'
    }
});
