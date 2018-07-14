import React, {Component} from 'react';
import { Text, } from 'react-native'
import firebase from 'firebase';
import { Button, Card, CardSection, Input, Spinner } from './common';
class LoginForm extends Component {
    state = {
        email: '',
        password: '',
        error: '',
        loading: false
    }
    onButtonPress() {
        const {email, password } = this.state;
        this.setState({ error: '', loading: true})
        firebase.auth().signInWithEmailAndPassword(email, password).then(this.onLoginSuccess.bind(this))
        .catch(() =>{
            firebase.auth().createUserWithEmailAndPassword(email, password).then(this.onLoginSuccess.bind(this)).catch(this.onLoginFail.bind(this))
            })
        };
    onLoginSuccess(){
        this.setState({email: '', password: '', error: '', loading: false })
    }
    onLoginFail(){
        this.setState({email: '', password: '', error: 'Authentication Failed', loading: false })

    }
    renderButton(){
        if(this.state.loading == true){
            return <Spinner size="small"/>
        } else {
            return  <Button onPress={this.onButtonPress.bind(this)}> Log In </Button>
        }
    }
    render() {
        return (
            <Card>
                <CardSection>
                    <Input
                     placeholder="user@email.com"
                     label = "Email"
                     value= {this.state.email}
                     onChangeText={email => this.setState({ email: email })}/>
                </CardSection>
                <CardSection>
                <Input
                     placeholder="password"
                     label = "Password"
                     secure
                     value= {this.state.password}
                     onChangeText={password => this.setState({ password: password })}/>
                </CardSection>
                    <Text style={styles.errorTextStyle}>
                        {this.state.error}
                    </Text>
                <CardSection>
                    {this.renderButton()}
                </CardSection>
            </Card>
        )
    }
}

const styles = {
    errorTextStyle: {
        fontSize: 20,
        alignSelf: 'center',
        color: 'red'
    }
}

export default LoginForm;