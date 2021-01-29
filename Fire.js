import firebase from './config'
// import firebaseKeys from './config'

class Fire {
  constructor () {
    // firebase.initializeApp(firebaseKeys);
  }

  addDonation = async ({itemName, itemCat, itemQty, text, localUri}) => {
    const remoteUri = await this.uploadPhotoAsync(localUri)

    return new Promise((res,rej) => {
      this.firestore.collection("donating").add({
        uid: this.uid,
        itemName,
        itemCat,
        itemQty,
        text,
        image: remoteUri,
        timestamp: this.timestamp
      })
      .then(ref => {
        res(ref)
      })
      .catch(error => {
        rej(error);
      })
    })
  }

  uploadPhotoAsync = async uri => {
    const path = `donationPhotos/${this.uid}/${Date.now()}.jpg`
    return new Promise(async (res,rej) => {
      const response = await fetch(uri)
      const file = await response.blob()

      let upload = firebase.storage().ref(path).put(file)
      upload.on("state_changed", snapshot => {}, err => {rej(err)},
      async () => {
        const url = await upload.snapshot.ref.getDownloadURL()
        res(url);
      }
      )
    })
  }

  get firestore() {
    return firebase.firestore();
  }

  get uid() {
    return (firebase.auth().currentUser || {}).uid
  }

  get timestamp() {
    return Date.now()
  }
}

Fire.shared = new Fire();
export default Fire;
