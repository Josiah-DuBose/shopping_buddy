import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { Login, Registration } from '../components';
import { Button } from '../components/shared';

export default class AuthPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            showLogin: props.showLogin || false,
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
            this.setState({buttonText: 'Register'});
            this.setState({title: 'Please sign in.'});
            this.setState({pageText: 'Do not have an account?'});
        } else {
            this.setState({buttonText: 'Login'});
            this.setState({title: 'Please register for an account.'})
            this.setState({pageText: 'Already have an account?'});
        }
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
        this.resetUIState();
    }

    render() {
        const { title, buttonText, pageText } = this.state;
        return(
            <View style={styles.container}>
                <Text style={styles.description}>{title}</Text>
                { this.pickForm() }
                <Text style={Object.assign({}, styles.description, styles.secondDes)}>{pageText}</Text>
                <Button buttonText={buttonText} onPress={this.viewToggle}></Button>
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
