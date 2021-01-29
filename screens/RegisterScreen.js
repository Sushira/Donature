import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StatusBar
} from 'react-native';

import firebase from 'firebase'

export default class RegisterScreen extends React.Component{

  state = {
    name: "",
    email: "",
    password: "",
    errorMessage: null
  };


  handleRegister = () => {
    firebase
    .auth()
    .createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then(userCredentials => {
      return userCredentials.user.updateProfile({
        displayName: this.state.name
      })
    })
    .catch(error => this.setState({errorMessage: error.message}));
  };


  render()
  {
    return(
      <View style={styles.container}>
        <StatusBar barStyle="light-content"></StatusBar>

        <Text style={styles.greeting}>
          {"Sign up to make a difference!"}
        </Text>

        <View style={styles.errorMessage}>
          {this.state.errorMessage && <Text style={styles.error}>{this.state.errorMessage}</Text>}
        </View>

        <View style={styles.form}>
          <View>
            <Text style={styles.inputTitle}>Full Name</Text>
            <TextInput style={styles.input}
             autocapitalize="none"
             onChangeText={name => this.setState({name})}
             value={this.state.name}
             >
             </TextInput>
          </View>

          <View style={{marginTop:32}}>
            <Text style={styles.inputTitle}>Email</Text>
            <TextInput style={styles.input}
             autocapitalize="none"
             onChangeText={email => this.setState({email})}
             value={this.state.email}
             >
             </TextInput>
          </View>

          <View style={{marginTop:32}}>
            <Text style={styles.inputTitle}>Password</Text>
            <TextInput
            style={styles.input}
            secureTextEntry
            autocapitalize="none"
            onChangeText={password => this.setState({password})}
            value={this.state.password}
            ></TextInput>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={this.handleRegister}>
          <Text style={{color: "white", fontWeight:"500"}}>Sign Up</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{alignSelf:'center', marginTop: 32}}
          onPress={() => this.props.navigation.navigate("Login")}
        >
          <Text style={{color: "grey", fontSize: 12}}>
            Already a member? <Text style={{fontWeight: "500", color:"blue"}}>Login</Text>
          </Text>
        </TouchableOpacity>

      </View>


    );
  }

}

const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  greeting: {
    marginTop:32,
    fontSize: 18,
    fontWeight: "400",
    textAlign:'center'
  },
  errorMessage:{
    height: 72,
    alignItems: 'center',
    justifyContent:'center',
    marginHorizontal: 30
  },
  form:{
    marginBottom:48,
    marginHorizontal: 30
  },
  inputTitle:{
    color: "black",
    fontSize: 10,
    textTransform: "uppercase"
  },
  input: {
    borderBottomColor: "black",
    borderBottomWidth: StyleSheet.hairlineWidth,
    height: 40,
    fontSize:15,
    color: "black"
  },
  button: {
    marginHorizontal: 30,
    backgroundColor: "black",
    borderRadius: 20,
    height: 52,
    alignItems: "center",
    justifyContent: "center"
  },
  error: {
    color: "red",
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center'
  }
});
