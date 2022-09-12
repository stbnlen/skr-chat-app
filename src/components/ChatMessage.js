import { auth } from "../firebase/firebase";

function ChatMessage(props) {
    const { text, uid, photoURL } = props.message;
    console.log(uid, photoURL)
  
    const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';
  
    return (<>
      <div className={`message ${messageClass}`}>
        <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} alt="user"/>
        <p>{text}</p>
      </div>
    </>)
}

export default ChatMessage;