import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import {createBottomTabNavigator} from 'react-navigation-tabs'
import {Ionicons} from '@expo/vector-icons'
import LoadingScreen from './screens/LoadingScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import PostScreen from './screens/PostScreen'
import ReqScreen from './screens/ReqScreen'
import MapScreen from './screens/MapScreen'
// import firebaseKeys from './config'
import firebase from './config'

// const firebaseConfig = firebaseKeys
// firebase.initializeApp(firebaseConfig);

const AppContainer = createStackNavigator (
  {
    default: createBottomTabNavigator (
      {

        Req:{
          screen: ReqScreen,
          navigationOptions:{
            tabBarIcon: ({tintColor}) => <Ionicons name="ios-list" size={24} color={tintColor} />
          }
        },
        Map:{
          screen: MapScreen,
          navigationOptions:{
            tabBarIcon: ({tintColor}) => <Ionicons name="md-map" size={24} color={tintColor} />
          }
        },
        Post:{
          screen: PostScreen,
          navigationOptions:{
            tabBarIcon: ({tintColor}) => <Ionicons
              name="ios-add-circle"
              size={28} color={"#607D8B"}
              // style={{shadowColor:"#607D8B", shadowOffset: {width:0, height: 0}, shadowRadius: 10, shadowOpacity: 0.3 }}
            />
          }
        },
        Profile:{
          screen: ProfileScreen,
          navigationOptions:{
            tabBarIcon: ({tintColor}) => <Ionicons name="ios-person" size={24} color={tintColor} />
          }
        }
      },
      {
          defaultNavigationOptions: {
            tabBarOnPress: ({navigation, defaultHandler}) => {
              if (navigation.state.key === "Post") {
                navigation.navigate("postModal")
              } else {
                defaultHandler()
              }
            }
          },
          tabBarOptions: {
            activeTintColor:"black",
            inactiveTintColor: "grey",
            showLabel:false
          }
      }
    ),
    postModal: {
      screen: PostScreen
    }
  },
  {
    mode: "modal",
    headerMode: "none",
  }
)


const AuthStack = createStackNavigator({
  Login: LoginScreen,
  Register: RegisterScreen
})

export default createAppContainer(
  createSwitchNavigator(
    {
      Loading: LoadingScreen,
      App: AppContainer,
      Auth:AuthStack
    },
    {
      initialRouteName: "Loading"
    }
  )
)
