import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  ToastAndroid
} from 'react-native'
import { Dropdown } from 'react-native-material-dropdown'
import {Ionicons} from '@expo/vector-icons'
import Constants from 'expo-constants'
import * as Permissions from 'expo-permissions'
import * as ImagePicker from 'expo-image-picker'
import Fire from '../Fire'
import UserPermissions from '../utilities/UserPermissions'

const firebase = require('../config');
require("firebase/firestore");

export default class PostScreen extends React.Component {

  state = {
    itemName: '',
    itemCat: '',
    itemQty: '',
    text: '',
    image: null
  };

  componentDidMount() {
    this.getPhotoPermission();
  }

  getPhotoPermission = async () => {
    UserPermissions.getCameraPermission();
  };

  handleDonation = () => {
    ToastAndroid.showWithGravity(
    'Please wait...',
    ToastAndroid.LONG,
    ToastAndroid.CENTER
  );
    Fire.shared.addDonation({
      itemName: this.state.itemName.trim(),
      itemCat: this.state.itemCat,
      itemQty: this.state.itemQty,
      text: this.state.text.trim(),
      localUri: this.state.image
    })
    .then(ref => {
      this.setState({
        itemName: "",
        itemCat: "",
        itemQty: "",
        text: "",
        image: null
      })
      this.props.navigation.goBack()
    }).catch(error => {
      alert(error);
    })
  };

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4,4]
    });

    if(!result.cancelled) {
      this.setState({image: result.uri});
    }
  }


  render() {

    let itemCat = [
      {
        value: 'Books',
      },
      {
        value: 'Clothes',
      },
      {
        value: 'Food',
      },
      {
        value: 'Plastic'
      },
      {
        value: 'Electronics'
      }
    ];

    let itemQty = [
      {value: '01'}, {value: '02'}, {value: '03'},{value: '04'},{value: '05'},
      {value: '06'},{value: '07'},{value: '08'},{value: '09'},{value: '10'}
    ];


    return(
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={() => this.props.navigation.goBack()}>
                    <Ionicons name='md-arrow-back' size={26} color='grey'></Ionicons>
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Donate</Text>
                <TouchableOpacity onPress={this.handleDonation}>
                    <Ionicons name="md-checkmark" size={26} color="black" />
                </TouchableOpacity>
            </View>

            <View style={styles.inputContainer}>
                <Image source={require("../assets/tempAvatar.png")} style={styles.avatar}></Image>
                <TextInput
                  // autoFocus={true}
                  multiline={false}
                  // numberOfLines={3}
                  style={{flex:1, padding:12, fontSize: 18}}
                  placeholder="Item name"
                  onChangeText={itemName => this.setState({itemName})}
                  value={this.state.itemName}
                >
                </TextInput>
            </View>

            <View>
                <Dropdown
                  label='Item category'
                  data={itemCat}
                  pickerStyle={{borderBottomColor:'darkgrey',borderWidth: 1}}
                  dropdownOffset={{ 'top': 12 }}
                  containerStyle = {{width: '80%', alignSelf:'center', marginTop:20}}
                  value = {this.state.itemCat}
                  onChangeText = {itemCat => this.setState({itemCat})}
                />
                <Dropdown
                  label='Item quantity'
                  data={itemQty}
                  pickerStyle={{borderBottomColor:'darkgrey',borderWidth: 1}}
                  dropdownOffset={{ 'top': 24 }}
                  containerStyle = {{width: '80%', alignSelf:'center', marginTop:20}}
                  value={this.state.itemQty}
                  onChangeText = {itemQty => this.setState({itemQty})}
                />
                <TextInput
                  multiline={true}
                  numberOfLines={3}
                  style={{fontSize:16, alignSelf:'center', marginTop:32, width:'80%'}}
                  placeholder="Item Description"
                  onChangeText={text => this.setState({text})}
                  value={this.state.text}
                >
                </TextInput>
                <TouchableOpacity style={styles.photo} onPress={this.pickImage}>
                    <Ionicons name="md-camera" size={32} color="darkgrey"></Ionicons>
                </TouchableOpacity>
            </View>
            <View style={{marginHorizontal:32, marginTop: 32, height: 150}}>
                <Image source={{uri:this.state.image}} style={{width:"100%",height:"100%"}}></Image>
            </View>
        </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header:{
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
  inputContainer: {
    margin: 8,
    flexDirection: 'row',
    marginTop: 32
  },
  headerTitle: {
      fontSize: 20,
      fontWeight: "500"
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    marginLeft: 24
  },
  photo: {
    alignItems: 'flex-end',
    marginHorizontal: 32
  }

});
