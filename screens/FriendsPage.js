import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { Button } from 'react-native-elements';
import { getFirestore } from 'firebase/firestore';
import {
  doc,
  onSnapshot,
  updateDoc,
  arrayUnion
} from 'firebase/firestore';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const auth = getAuth();
const database = getFirestore();
export default function FriendsPage() {
  const [friendslist, setFriendslist] = useState([]);
  const [friends,setFriends] = useState("");

  useEffect(()=>{
    const unsub = onSnapshot(doc(database, "profile", auth.currentUser.email), (doc) => {
      let temp = doc._document.data.value.mapValue.fields.friendlist.arrayValue.values
      setUser_name(doc._document.data.value.mapValue.fields.username.stringValue);
      setUser_major(doc._document.data.value.mapValue.fields.major.stringValue);
      setUser_year(doc._document.data.value.mapValue.fields.year.stringValue);
      setFriendslist(temp);
    });
  },[]);

  function edit(){
    updateDoc(doc(database, "profile", auth.currentUser.email), {
      friendlist: arrayUnion(friends),
    });
    alert("Done editing!")
  }
function FriendsLoop({list}){
    console.log("hi" + list);
    if (list == undefined){
      return (
          <Text>It is empty, please add friends</Text>
      )
    }

    return (
        list.map((item) => (
        <Text> {item.stringValue}</Text>
        ))
    )
}
  return (
    <View style={styles.container}>
    <KeyboardAwareScrollView>
      <View>
      <Text style={styles.currentProfile}><FriendsLoop list={friendslist}/></Text>
        <Text style={styles.currentProfile}>Add Friends</Text>
      </View>
      
      <TextInput
        style={styles.input}
        placeholder="Add Friends"
        onChangeText={(e)=>setFriends(e)}
      />
      <Button title ="Add" style={styles.button} onPress={() => edit()}/>
    </KeyboardAwareScrollView>
    </View>
  );
  //add Remove Function
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  currentProfile: {
    fontSize: 20,
  },
  button: {
    marginTop: 10,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});