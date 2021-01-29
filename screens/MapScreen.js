import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  LayoutAnimation,
  Image
} from 'react-native';
import MapView from 'react-native-maps'
import Permissions from 'expo-permissions'


export default class MapScreen extends React.Component
{
  state = {
    latitude: null,
    longitude: null
  }

  async componentDidMount() {
    const {status} = await Permissions.getAsync(Permissions.LOCATION)

    if (status !== 'granted') {
      const response = await Permissions.askAsync(Permissions.LOCATION)
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords: {latitude, longitude}}) => this.setState({latitude,longitude}),
      (error) => console.log(error)
    )
  }

  render(){

    // const {latitude, longitude } = this.state


        return(
            <MapView
                // showUserLocation
                style={{flex:1}}
                initialRegion={{
                  latitude:12.972442,
                  longitude:77.580643,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421
                }}
            >
            </MapView>
        );
  }

}


const styles = StyleSheet.create({
  container: {
    flex:1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
