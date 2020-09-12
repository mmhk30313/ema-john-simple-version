import React, { useContext, useState } from 'react';
import './Login.css';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import firebaseConfig from './firebase.config';
import { UserContext } from '../../App';
import { useHistory, useLocation } from 'react-router-dom';
firebase.initializeApp(firebaseConfig);

const Login = () => {
    const [newUser, setNewUser] = useState(false);
  // const [user, setUser] = useState({})
    const [user, setUser] = useState({
      isSignedIn: false,
      name: '',
      photo: '',
      email: '',
      password: ''
    })

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const history = useHistory();
    const location = useLocation();
    const { from } = location.state || { from: { pathname: "/" } };
    const provider = new firebase.auth.GoogleAuthProvider();
    const fbProvider = new firebase.auth.FacebookAuthProvider();
    const handleFBLogin = () => {
        firebase.auth().signInWithPopup(fbProvider)
        .then(res => {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        // var token = res.credential.accessToken;
        // The signed-in user info.
        // var user = res.user;
        // ...
        }).catch(error => {
        // Handle Errors here.
        // var errorCode = error.code;
        // var errorMessage = error.message;
        // The email of the user's account used.
        // var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        // var credential = error.credential;
        // ...
        });
    }

    const handleSignIn = () => {
        firebase.auth().signInWithPopup(provider)
        .then(res => {
        // console.log(res);
        const {displayName, email, photoURL} = res.user;
        // console.log(displayName, email, photoURL)
        const signedInUser = {
            isSignedIn: true,
            name: displayName,
            email: email,
            photo: photoURL
        }
        setUser(signedInUser);
        })
        .catch(err =>{
        console.log(err);
        console.log(err.message);
        })
    }
    
    const handleSignOut = () => {
        firebase.auth().signOut()
        .then(res => {
        const signedOutUser = {
            isSignedIn: false,
            name: '',
            photo: '',
            email: '',
            error: '',
            success: ''
        }
        // console.log(res);
        setUser(signedOutUser);
        })
        .catch(err =>{
        console.log(err);
        console.log(err.message);
        })
    }
    // user.isSignedIn && console.log(user);
    const {name, email, photo} = user;

    const handleBlur = (e) => {
        // console.log(e.target.name,"->",e.target.value);
        let isValidField = true;
        if(e.target.name === 'email'){
        const email = e.target.value;
        const re = /\S+@\S+\.\S+/;
        const isValidEmail = re.test(email);
        // console.log(isValidEmail);

        isValidField = isValidEmail;
        }
        if(e.target.name === 'password'){
        const password = e.target.value;
        const re = /\d{1}/;
        const isValidPassword = re.test(password) && password.length > 4;
        // console.log(isValidPassword);

        isValidField = isValidPassword;
        }
        if(isValidField){
        // console.log(isValidField);
        const newUserInfo = {...user};
        newUserInfo[e.target.name] = e.target.value;
        setUser(newUserInfo);
        }
    }
    const handleSubmit = (e) => {
        // console.log(user.email, 'and', user.password);
        if(newUser && user.email && user.password){
        // console.log('submitting');
        const {email, password} = user;
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(res => {
            // console.log(res);
            const newUserInfo = {...user};
            newUserInfo.error = '';
            newUserInfo.success = true;
            setUser(newUserInfo);
            updateUserInfo(user.name);
        })
        .catch(error => {
            // Handle Errors here.
            // var errorCode = error.code;
            const errorMessage = error.message;
            // console.log(errorMessage);
            const newUserInfo = {...user};
            newUserInfo.error = errorMessage;
            newUserInfo.success = false;
            setUser(newUserInfo);
        });
        }
        if(!newUser && user.email && user.password){
        // console.log('submitting');
        const {email, password} = user;
        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(res => {
            const newUserInfo = {...user};
            newUserInfo.error = '';
            newUserInfo.success = true;
            setUser(newUserInfo);
            setLoggedInUser(newUserInfo);
            history.replace(from);
            console.log('sign in user info',res.user);
        })
        .catch(error => {
            // Handle Errors here.
            // var errorCode = error.code;
            const errorMessage = error.message;
            // console.log(errorMessage);
            const newUserInfo = {...user};
            newUserInfo.error = errorMessage;
            newUserInfo.success = false;
            setUser(newUserInfo);
        });
        }
        e.preventDefault(); // Eta page reload howyar bapar ta atkiye dey...
    }

    const updateUserInfo = (name) => {
        const user = firebase.auth().currentUser;

        user.updateProfile({
        displayName: name
        // photoURL: "https://example.com/jane-q-user/profile.jpg"
        }).then(res => {
        // Update successful.
        console.log('User info updated successfully...')
        })
        .catch(error => {
        // An error happened.
        console.log(error);
        });
    }

    return (
        <div className="jumbotron text-center">
        {
            user.isSignedIn
            ? <button onClick={() => handleSignOut()} className="btn btn-secondary">Sign out</button>
            : <button onClick={() => handleSignIn()} className="btn btn-primary">Sign in</button>
        }
        <br/><br/>
        <button onClick={() => handleFBLogin()} className="btn btn-outline-success">Log in by Facebook</button>
        {
            user.isSignedIn && <div>
            <p>Welcome, {name}</p>
            <h5>Email: {email}</h5>
            <img style={{width: '20%'}} src={photo} alt=""/>
            </div>
        }
        <h1 className="text-info">Our Own Authentication</h1>
        {/* <p>Name: {user.name}</p>
        <p>Email: {user.email}</p>
        <p>Password: {user.password}</p> */}
        <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id=""/>
        <label htmlFor="newUser"> new user sign up</label>
        <form onSubmit={handleSubmit}>{/*It's a field*/}
            {
            newUser && <><input onBlur={handleBlur} className="form-control input" type="text" name="name" placeholder="name..." required/><br/></>
            }
            <input onBlur={handleBlur} className="form-control input" type="text" name="email" placeholder="email..." required/><br/>
            <input onBlur={handleBlur} className="form-control input" type="password" name="password" placeholder="password..." required/><br/>
            <input type="submit" className='btn btn-outline-info' value={newUser ? 'Sign in' : 'Sign up'}/>
        </form>
        <br/>
        {
            !user.success
            ? <p className="text-danger">{user.error}</p>
            : <p className="text-success">{newUser ? 'Your account has been created' : 'You logged in'} successfully</p>
        }
        </div>
    );
}


export default Login;