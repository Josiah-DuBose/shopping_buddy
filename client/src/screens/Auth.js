import React, { Component } from 'react';
import { View } from 'react-native';
import { Login, Registration } from '../components';

export default class Auth extends Component {
    constructor(props){
        super(props);
        this.state = {
            showLogin: false
        };
        this.pickForm = this.pickForm.bind(this);
        this.viewToggle = this.viewToggle.bind(this);
    }

    pickForm() {
        if(!this.state.showLogin){
            return( <Registration viewToggle={this.viewToggle}/> );
        } else {
            return( <Login viewToggle={this.viewToggle}/> );
        }
    }

    viewToggle() {
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

const styles = {
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
};