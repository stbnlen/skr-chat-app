import firebase from 'firebase/app';
import { auth } from "../firebase/firebase";

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
            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt='google-icon'/>
          </div>
          <p className="btn-text"><b>Sign in with google</b></p>
        </div>
  
        <p className="ban_avise">Ahora sin el Wena Seba!</p>
      </>
    )
  
  }

export default SignIn;