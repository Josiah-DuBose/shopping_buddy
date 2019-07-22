import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Login, Registration } from '../components';
import { Button } from '../components/shared';

export default class AuthPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            showLogin: props.showLogin || false,
            title: ''
        };

        this.viewToggle = this.viewToggle.bind(this);
        this.pickForm = this.pickForm.bind(this);
    }

    componentDidMount() {
        this.setState({
            title: this.state.showLogin? 'Please sign in.': 'Please register for an account.'
        });
    }

    pickForm() {
        if(!this.state.showLogin){
            return( <Registration viewToggle={ () => this.viewToggle() }/> );
        } else {
            return( <Login viewToggle={ () => this.viewToggle() }/> );
        }
    }

    viewToggle() {
        this.setState({ showLogin: !this.state.showLogin });
    }

    render() {
        return(
            <View style={styles.container}>
                <Text style={styles.description}>{this.state.title}</Text>
                { this.pickForm() }
                <Text style={Object.assign({}, styles.description, styles.secondDes)}> Already have an account?</Text>
                <Button buttonText='Login' onPress={this.viewToggle}></Button>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    description: {
        marginBottom: 20,
        fontSize: 18,
        textAlign: 'center',
        color: '#656565'
    },
    secondDes: {
        marginTop: 20
    }
});
