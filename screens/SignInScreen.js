import React from 'react';
import { StyleSheet, TextInput, View, Text} from 'react-native';
import { Button } from 'react-native-elements';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();

export default function SignInScreen() {
  //Screen for Sign in.
    const [value, setValue] = React.useState({
        email: '',
        password: '',
        error: ''
      })
    
      async function signIn() {
      //Tries to Sign in an user through connecting with firebase. If any of the required fields are empty,
      //It prohibits the user to log in.
        if (value.email === '' || value.password === '') {
          setValue({
            ...value,
            error: 'Email and password are mandatory.'
          })
          return;
        }
    
        try {
          await signInWithEmailAndPassword(auth, value.email, value.password);
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
    
            <Button title="Sign in" buttonStyle={styles.control} onPress={signIn} />
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

