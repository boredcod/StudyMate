import React, {
  useState,
} from 'react';
import { StyleSheet} from 'react-native';
import { getAuth} from 'firebase/auth';
import {
    collection,
    addDoc,
    orderBy,
    query,
    onSnapshot
  } from 'firebase/firestore';
import { GiftedChat } from 'react-native-gifted-chat'
import { getFirestore } from 'firebase/firestore';
const auth = getAuth();
const database = getFirestore();
export default function UserBoard() {
  //Screen for Bulletin-board, where users can chat in real time, to share their
  //Contacts and look for study buddies.
  const [messages, setMessages] = useState([]);

  React.useEffect(() => {
  //Function to update the bulletin-board real time through connecting with the database
  //, in case there are new chats.
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
  //Function to let users to send a chat. 
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
