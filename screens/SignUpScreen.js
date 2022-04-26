import React from 'react';
import { TextInput, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Input, Button } from 'react-native-elements';
import { StackScreenProps } from '@react-navigation/stack';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  setDoc,
  orderBy,
  query,
  onSnapshot
} from 'firebase/firestore'; 

const auth = getAuth();
const database = getFirestore();

export default function SignUpScreen({navigation}) {
    const [value, setValue] = React.useState({
        email: '',
        password: '',
        name: '',
        friendlist: {},
        error: ''
      })
    
    async function signUp() {
        if (value.email === '' || value.password === '') {
          setValue({
            ...value,
            error: 'Email and password are mandatory.'
          })
          return;
        }
        
    
        try {
            await createUserWithEmailAndPassword(auth, value.email, value.password);
            setDoc(doc(database, "profile", auth.currentUser.email), {
              username: "",
              major: "",
              year: "",
              friendlist: {},
            });
            navigation.navigate('Sign In');
          } catch (error) {
            setValue({
              ...value,
              error: error.message,
            })
          }
        

      }
    
      return (
        <View style={styles.container}>
    
          {!!value.error && <View style={styles.error}><Text>{value.error}</Text></View>}
    
          <View style={styles.controls}>
            <TextInput
              placeholder='Name'
              style={styles.control}
              value={value.name}
              onChangeText={(text) => setValue({ ...value, name: text })}
            />
            <TextInput
              placeholder='Email'
              style={styles.control}
              value={value.email}
              onChangeText={(text) => setValue({ ...value, email: text })}
            />
    
            <TextInput
              placeholder='Password'
              style={styles.control}
              value={value.password}
              onChangeText={(text) => setValue({ ...value, password: text })}
              secureTextEntry={true}
            />
            
    
            <Button title="Sign up" buttonStyle={styles.control} onPress={signUp} />
          </View>
        </View>
      );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
      },
    
      controls: {
        flex: 1,
      },
    
      control: {
        marginTop: 10,
        height: 40,
        margin: 12,
        width: 200,
        borderWidth: 1,
        padding: 10,
      },
    
      error: {
        marginTop: 10,
        padding: 10,
        color: '#fff',
        backgroundColor: '#D54826FF',
      }
});
