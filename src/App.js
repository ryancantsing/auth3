import React, { Component} from 'react';
import {View} from 'react-native';
import firebase from 'firebase';
import { Header, Button, CardSection, Spinner } from './components/common';
import LoginForm from './components/LoginForm';

class App extends Component {
    state =  {
        loggedIn: null
    }
    componentWillMount(){
        firebase.initializeApp({
            apiKey: 'AIzaSyDq8KLFqTS0aWxPzM1HOxTRROM7EyOSvu0',
            authDomain: 'authentication-5e0e5.firebaseapp.com',
            databaseURL: 'https://authentication-5e0e5.firebaseio.com',
            projectId: 'authentication-5e0e5',
            storageBucket: 'authentication-5e0e5.appspot.com',
            messagingSenderId: '786048890288'
        });
        firebase.auth().onAuthStateChanged((user) =>{
            if(user){
                this.setState({loggedIn: true});
            }else{
                this.setState({loggedIn: false});
            }
        })
    }
    renderPage(){
        switch(this.state.loggedIn){
            case true:
                return (
                    <CardSection>
                        <Button onPress={() => firebase.auth().signOut()}>
                            Log Out
                        </Button>
                    </CardSection>
                    )
            case false:
                return <LoginForm />;
            default: 
                return <Spinner size="large"/>;
        }

    }
    render(){
        return (
            <View>
                <Header headerText="Authentication"/>
                {this.renderPage()}
            </View>
        );
    }
}
export default App;