import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Button } from 'react-native-elements';

export default function WelcomScreen({navigation}) {
  //Main Screen, when the user isn't logged in.
    return (
        <View style={styles.container}>
          <Text style={styles.sentences}>Welcome to StudyMate!</Text>
          <Text></Text>
          <Text style={styles.sentences}>Please sign in or sign up to procceed.</Text>
          <Text></Text>
          <View style={styles.buttons}>
            <Button title="Sign in" buttonStyle={styles.button} onPress={() => navigation.navigate('Sign In')} />
            <Button title="Sign up" type="outline" buttonStyle={styles.button} onPress={() => navigation.navigate('Sign Up')} />
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
  buttons: {
    flex: 1,
  },
  sentences: {
    fontSize: 20,
    fontFamily: 'FredokaOne-Regular',
  },
  button: {
    marginTop: 10
  }
});
