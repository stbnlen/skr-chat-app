import React, { useRef, useState } from 'react';
import './App.css';

import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/analytics';

import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';

firebase.initializeApp({
  apiKey: "AIzaSyDmeSkx18XppldBSgxUp3MKNfWjsg8uQ0E",
  authDomain: "super-chat-68020.firebaseapp.com",
  projectId: "super-chat-68020",
  storageBucket: "super-chat-68020.appspot.com",
  messagingSenderId: "584067299747",
  appId: "1:584067299747:web:7b45e85a7f338890a94216",
  measurementId: "G-1JJTKY4JS3"
})

const auth = firebase.auth();
const firestore = firebase.firestore();

function App() {
  const [user] = useAuthState(auth);

  return (
    <div className="App">
      <header>
        <h1>⚛️🔥💬</h1>
        <SignOut />
      </header>

      <section>
        {user ? <ChatRoom /> : <SignIn />}
      </section>

    </div>
  );
}


function SignIn() {

  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  }

  return (
    <>
      {/* <button className="sign-in" onClick={signInWithGoogle}>Sign in with Google</button> */}

      <div className="google-btn" onClick={signInWithGoogle}>
        <div className="google-icon-wrapper">
          <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"/>
        </div>
        <p className="btn-text"><b>Sign in with google</b></p>
      </div>

      <p className="ban_avise">Ahora sin el Wena Seba!</p>
    </>
  )

}


function SignOut() {
  return auth.currentUser && (
    <button className="sign-out" onClick={() => auth.signOut()}>Sign Out</button>
  )
}


function ChatRoom() {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });

  const [formValue, setFormValue] = useState('');


  const sendMessage = async (e) => {
    e.preventDefault();

    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })

    setFormValue('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  }

  return (<>
    <main>

      {messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}

      <span ref={dummy}></span>

    </main>

    <form onSubmit={sendMessage}>

      <input
        value={formValue}
        onChange={(e) => setFormValue(e.target.value)}
        placeholder="Enviar mensaje..."
      />

      <button
        type="submit"
        disabled={!formValue}
      >
        🕊️
      </button>

    </form>
  </>)
}



function ChatMessage(props) {
  const { text, uid, photoURL } = props.message;

  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (<>
    <div className={`message ${messageClass}`}>
      <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} alt="user"/>
      <p>{text}</p>
    </div>
  </>)
}


export default App;
