import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import { getAuth, signOut } from 'firebase/auth';
import { Button } from 'react-native-elements';
import { getFirestore } from 'firebase/firestore';
import {
  collection,
  addDoc,
  doc,
  getDoc,
  setDoc,
  orderBy,
  query,
  onSnapshot,
  updateDoc,
  deleteField,
  arrayUnion
} from 'firebase/firestore';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const auth = getAuth();
const database = getFirestore();
export default function FriendsSearch() {
  const [user_name, setUser_name] = useState("");
  const [user_major, setUser_major] = useState("");
  const [user_year, setUser_year] = useState("");
  const [friends,setFriends] = useState("");

  function edit(){
      getDoc(doc(database, "profile", friends)).then(docSnap => {
        if(docSnap.exists()){
            setUser_name(docSnap.data().username);
            setUser_major(docSnap.data().major);
            setUser_year(docSnap.data().year);
        }
        else {
            alert("no such user!");
        }
        
        }); 
     
    
  }
  

  return (
    <View style={styles.container}>
    <KeyboardAwareScrollView>
      <View>
        <Text style={styles.currentProfile}>Profile of {user_name} </Text>
        <Text style={styles.currentProfile}>Major: {user_major}</Text>
        <Text style={styles.currentProfile}>Year: {user_year}</Text>
      </View>
      
      <TextInput
        style={styles.input}
        placeholder="Search Profiles by Email"
        onChangeText={(e)=>setFriends(e)}
      />
      <Button title ="Search" style={styles.button} onPress={() => edit()}/>
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