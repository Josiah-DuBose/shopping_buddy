import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Login, Registration } from '../components';

export default class AuthPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            showLogin: false,
            signInTitle: 'Please sign in',
            registrationTitle: 'Please register for an account.'
        };
        this.pickForm = this.pickForm.bind(this);
    }

    // static navigationOptions = {
    //     title: this.state.showLogin ? this.state.signInTitle : this.state.registrationTitle,
    // };

    pickForm() {
        if(!this.state.showLogin){
            return( <Registration viewToggle={ () => this.viewToggle() }/> );
        } else {
            return( <Login viewToggle={ () => this.viewToggle() }/> );
        }
    }

    viewToggle() {
        console.log("viewToggle", this.state)
        this.setState({ showLogin: !this.state.showLogin });
    }

    render() {
        return(
            <View style={styles.container}>
               { this.pickForm() }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
