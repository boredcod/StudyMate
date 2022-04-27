import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { getAuth} from 'firebase/auth';
import { Button } from 'react-native-elements';
import { getFirestore } from 'firebase/firestore';
import {
  doc,
  onSnapshot,
  updateDoc,
  deleteField,
} from 'firebase/firestore';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const auth = getAuth();
const database = getFirestore();
export default function FriendsPage() {
  //Page to add friends to the friendlist.
  const user_id = auth.currentUser.uid;
  const [friendslist, setFriendslist] = useState({});
  const [user_name, setUser_name] = useState("");
  const [user_major, setUser_major] = useState("");
  const [user_year, setUser_year] = useState("");
  const [friends,setFriends] = useState("");

  useEffect(()=>{
  //Automatically checks if there are friends inside a friendlist in the database.
    const unsub = onSnapshot(doc(database, "profile", auth.currentUser.email), (doc) => {
      setUser_name(doc._document.data.value.mapValue.fields.username.stringValue);
      setUser_major(doc._document.data.value.mapValue.fields.major.stringValue);
      setUser_year(doc._document.data.value.mapValue.fields.year.stringValue);
      setFriendslist(doc._document.data.value.mapValue.fields.friendlist.mapValue.fields);
    });
  },[]);

  function edit(){
    //Function to add friends. 
    if (friends == ""){
      alert("Please put the Friend name in!")
      return
    }
    else {
      let temp = "friendlist." + friends;
      updateDoc(doc(database, "profile", auth.currentUser.email), {
        [temp]: friends,
      });
      alert("Successfully Added!")
    }
  }
  
function removeFrineds(){
  //Function to remove friends.
  let temp = "friendlist." + friends;
  if (friends == ""){
    alert("Please put the Friend name in!")
    return
  }
  else {
    updateDoc(doc(database, "profile", auth.currentUser.email), {
      [temp]: deleteField(),
    });
    alert("Successfully Deleted!")
  }
  }
function FriendsLoop(){
  //Tells the user to add friends if there are no friends.
    if (friendslist == undefined){
      return (
          <Text>It is empty, please add friends</Text>
      )
    }
  //If there are friends in the friends, print them out on the application.
    else {
      return (
        <Text style={styles.friendslist}><FLHelper /></Text>
      )
    }
    
}
function FLHelper(){
  //Helper function to receive friends from the database.
  let temp = []
  for (const key in friendslist) {
    temp.push(friendslist[key].stringValue + "\n")      
  }
  return temp
}

  return (
    <View style={styles.container}>
    <KeyboardAwareScrollView>
      <View>
        <Text style={styles.currentProfile}>Current list of friends: </Text><FriendsLoop/>
        <Text style={styles.currentProfile}>Use the box below to add Friends</Text>
      </View>
      
      <TextInput
        style={styles.input}
        placeholder="Add Friends"
        onChangeText={(e)=>setFriends(e)}
      />
      <Button title ="Add" style={styles.button} onPress={() => edit()}/>
      <Button title ="Remove Friends" style={styles.button} onPress={removeFrineds}/>
    </KeyboardAwareScrollView>
    </View>
  );
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
    fontFamily: 'FredokaOne-Regular',
    alignItems: 'center',
    justifyContent: 'center',
  },
  friendslist: {
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