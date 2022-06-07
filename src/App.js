import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Login from './Containers/Login';
import Home from './Containers/Home';
import CreatePost from './Containers/CreatePost';
import '../src/Styles/App.css';
import './Styles/Navbar.css'
import { useState } from 'react';
import { signOut } from 'firebase/auth'
import { auth } from './Firebase/firebase-config'

function App() {
  const [isAuth, setIsAuth] = useState(useState(localStorage.getItem('isAuth')))

  //FUNCION DE LOGOUT
  const SignUserOut = () => {
    signOut(auth).then(() => {
      localStorage.clear()
      setIsAuth(false)
      window.location.pathname = '/login';
    });
  }
  return (
    <>
      <Router>
        <nav className='nav'>
          <Link className='Link' to='/'>Home</Link>

          {!isAuth ? (
            <Link className='Link' to='login'>Login</Link>) : (<>
              < Link className='Link' to='createpost'> Create Post</Link>
              < button onClick={SignUserOut}> Log Out</button></>)}
        </nav>
        <Routes>
          <Route path='/' element={<Home isAuth={isAuth} />}></Route>
          <Route path='login' element={<Login setIsAuth={setIsAuth} />}></Route>
          <Route path='createpost' element={<CreatePost isAuth={isAuth} />}></Route>
        </Routes>
      </Router>
    </>

  );
}

export default App;
