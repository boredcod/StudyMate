import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback
} from 'react';
import { StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { useAuthentication } from '../utils/hooks/useAuthentication';
import { getAuth, signOut } from 'firebase/auth';
import {
    collection,
    addDoc,
    orderBy,
    query,
    onSnapshot
  } from 'firebase/firestore';
import { GiftedChat } from 'react-native-gifted-chat'
import { Button } from 'react-native-elements';
import { getFirestore } from 'firebase/firestore';
const auth = getAuth();
const database = getFirestore();
export default function UserBoard() {
  const [messages, setMessages] = useState([]);

  React.useEffect(() => {
    const collectionRef = collection(database, 'chats');
    const q = query(collectionRef, orderBy('createdAt', 'desc'));

    const unsubscribe = onSnapshot(q, querySnapshot => {
      setMessages(
        querySnapshot.docs.map(doc => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user
        }))
      );
    });

    return () => unsubscribe();
  }, []);


const onSend = React.useCallback((messages = []) => {
    setMessages(previousMessages =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];    
    addDoc(collection(database, 'chats'), {
      _id,
      createdAt,
      text,
      user
    });
  }, []);

  

  return (
    <GiftedChat
      messages={messages}
      showAvatarForEveryMessage={true}
      renderUsernameOnMessage={true}
      onSend={messages => onSend(messages)}
      user={{
        _id: auth?.currentUser?.email,
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: 10
  }
});
