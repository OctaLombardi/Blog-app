import React from 'react'
import { auth, provider } from '../Firebase/firebase-config'
import { signInWithPopup } from 'firebase/auth'
import { useNavigate } from 'react-router-dom';
import '../Styles/Login.css'

export default function Login({ setIsAuth }) {
    let navigate = useNavigate();


    const signInWithGoogle = () => {
        signInWithPopup(auth, provider).then((result) => {
            localStorage.setItem('isAuth', true);
            setIsAuth(true)
            navigate("/");
        })
    };

    return (
        <div className='loginPage'>
            <p> Sign In to continue</p>
            <button className='login-with-google-btn' onClick={signInWithGoogle}>Sign In with Google</button>
        </div>
    )
};



