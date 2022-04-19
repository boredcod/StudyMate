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
  onSnapshot
} from 'firebase/firestore';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const auth = getAuth();
const database = getFirestore();
export default function HomeScreen() {
  const user_id = auth.currentUser.uid;
  const [user_name, setUser_name] = useState("");
  const [user_major, setUser_major] = useState("");
  const [user_year, setUser_year] = useState("");
  const [friendslist, setFriendslist] = useState([]);

  useEffect(()=>{
    const unsub = onSnapshot(doc(database, "profile", auth.currentUser.uid), (doc) => {
      setUser_name(doc._document.data.value.mapValue.fields.username.stringValue);
      setUser_major(doc._document.data.value.mapValue.fields.major.stringValue);
      setUser_year(doc._document.data.value.mapValue.fields.year.stringValue);
    });
  },[]);

  function edit(){
    setDoc(doc(database, "profile", auth.currentUser.uid), {
      username: user_name,
      major: user_major,
      year: user_year,
      friendlist: friendslist,
    });
    alert("Done editing!")
  }
  return (
    <View style={styles.container}>
    <KeyboardAwareScrollView>
      <View>
        <Text style={styles.currentProfile}>Welcome {auth.currentUser.email}! </Text>
        <Text> </Text>
        <Text style={styles.currentProfile}>Current Name: {user_name}</Text>
        <Text style={styles.currentProfile}>Current Major: {user_major}</Text>
        <Text style={styles.currentProfile}>Current Year: {user_year}</Text>
        <Text style={styles.currentProfile}>Edit Your Profile Below</Text>
      </View>
      
      
      <TextInput
        style={styles.input}
        placeholder="Name"
        onChangeText={(e)=>setUser_name(e)}
      />
      <TextInput
        style={styles.input}
        placeholder="Major"
        onChangeText={(e) => setUser_major(e)}
      />
      <TextInput
        style={styles.input}
        placeholder="Year"
        onChangeText={(e)=>setUser_year(e)}
      />
      <Button title ="Save Your Profile" style={styles.button} onPress={() => edit()}/>
      <Button title="Sign Out" style={styles.button} onPress={() => signOut(auth).then(()=>{
        console.log("sign-out")
      }).catch((error) => {
        console.log(error)
      })} />
    </KeyboardAwareScrollView>
    </View>
  );
  //add Modal to make it *fancy*
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