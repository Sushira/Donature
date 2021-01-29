import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  Image
} from 'react-native';
import firebase from '../config'
import {Ionicons} from '@expo/vector-icons'
import UserPermissions from '../utilities/UserPermissions'
import * as ImagePicker from 'expo-image-picker'

export default class ProfileScreen extends React.Component{

  state = {
    user: {
      email: '',
      uName: '',
      avatar: null
    }
  };

  componentDidMount() {

  }

  signOutUser = () => {
    firebase.auth().signOut();
  }

  render()
  {
    LayoutAnimation.easeInEaseOut();

    return(
      <View style={styles.container}>
          <View style={styles.header}>
              <Text style={styles.headerTitle}>Profile</Text>
              <TouchableOpacity onPress={this.signOutUser}>
                  <Ionicons name="md-power" size={28} color="grey" />
              </TouchableOpacity>
          </View>
          <View style={{marginTop:64, alignItems:'center'}}>
                <View style={styles.avatarContainer}>
                    <Image
                        style={styles.avatar}
                        source={
                          this.state.user.avatar
                            ? {uri:this.state.user.avatar}
                            : require('../assets/tempAvatar.png')
                          }
                      />
                </View>
                <Text style={styles.name}>test_user</Text>
          </View>

            <View style={styles.statsContainer}>
                <View style={styles.state}>
                    <Text style={styles.statAmount}>4</Text>
                    <Text style={styles.statTitle}>Posts</Text>
                </View>
                <View style={styles.state}>
                    <Text style={styles.statAmount}>0</Text>
                    <Text style={styles.statTitle}>Donations</Text>
                </View>
            </View>

          <View>
                <TouchableOpacity style={styles.button1}>
                  <Text style={{color: "black", fontWeight:"500"}}>My Donations</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button2}>
                  <Text style={{color: "black", fontWeight:"500"}}>Send Feedback/Complaint</Text>
                </TouchableOpacity>
          </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({
  container:{
    flex:1
  },
  avatarContainer:{
    shadowColor: 'grey',
    shadowRadius:15,
    shadowOpacity: 0.4
  },
  avatar:{
    // position: 'absolute',
    width:136,
    height:136,
    borderRadius: 68,
    marginTop: -28
  },
  header: {
    paddingTop:32,
    // marginTop:12,
    flexDirection: "row",
    justifyContent:'space-between',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderBottomWidth: 3,
    borderBottomColor:'#D8D9DB',
    backgroundColor: '#EBECF4'
  },
  headerTitle: {
      fontSize: 20,
      fontWeight: "500",
      alignItems:'center',
      justifyContent: 'center',
      paddingLeft:128
  },
  statsContainer: {
    flexDirection:"row",
    justifyContent: "space-between",
    margin: 32
  },
  state: {
    alignItems: 'center',
    flex: 1
  },
  statAmount: {
    color: '#4F566D',
    fontSize: 24,
    fontWeight: '300'
  },
  statTitle: {
    color: "#C3C5CD",
    fontSize: 12,
    fontWeight: '500',
    marginTop: 4
  },
  name: {
    marginTop: 24,
    fontSize: 16,
    fontWeight: '600'
  },
  button1: {
    marginHorizontal: 2,
    backgroundColor: "lightgrey",
    borderRadius: 4,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 64
  },
  button2: {
    marginHorizontal: 2,
    backgroundColor: "lightgrey",
    borderRadius: 4,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 8
  }
});
