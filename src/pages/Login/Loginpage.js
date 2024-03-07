import React, { useState, useEffect } from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { db } from '../../firebase-config';
import './Login.css';

function LoginPage() {
  const [phone, setPhone] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setIsLoggedIn(true);
        fetchUserData();
      } else {
        setIsLoggedIn(false);
        setUserData(null);
      }
    });

    return () => unsubscribe();
  }, []);

  // const fetchUserData = async () => {
  //   try {
  //     const userRef = await db.collection('driver_user').doc('YUYCBViJaybDl0xTzumG').get();
  //     if (userRef.exists()) {
  //       const userData = userRef.data();
  //       console.log("user data is loading ....");
  //       console.log(userData);
  //       console.log("user data is ended ....")

  //       setUserData(userData);
  //     } else {
  //       console.log('User not found.');
  //       setUserData(null);
  //     }
  //   } catch (error) {
  //     console.error('Error fetching user data:', error);
  //   }
  // };
  const fetchUserData = async () => {
    try {
      const userRef = await db.collection('driver_user').doc('YUYCBViJaybDl0xTzumG').get();
      if (userRef.exists) {
        const userData = userRef.data();
        console.log("User data is loading....");
        console.log(userData);
        console.log("User data loading completed.");
  
        setUserData(userData);
      } else {
        console.log('User not found.');
        setUserData(null);
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
      await firebase.auth().signInWithEmailAndPassword(`${phone}`, 'adadad');
      await firebase.auth().currentUser.getIdTokenResult(true); // Refresh the ID token to extend the session duration
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleClearSession = async () => {
    try {
      await firebase.auth().signOut();
      setIsLoggedIn(false);
      setUserData(null);
    } catch (error) {
      console.error('Error clearing session:', error);
    }
  };

  return (
    <div className="login-page">
      {isLoggedIn ? (
        <div>
          {userData ? (
            <div>
              <h2>Welcome</h2>
              <p>Username: {userData.username}</p>
              <p>Phone: {userData.phone}</p>
              {/* Display other user data as needed */}
              <button onClick={handleLogout}>Logout</button>
              <button onClick={handleClearSession}>Clear Session</button>
            </div>
          ) : (
            <p>Loading user data...</p>
          )}
        </div>
      ) : (
        <div>
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <label>
              Email:
              <input
                type="text"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                required
              />
            </label>
            <button type="submit">Login</button>
          </form>
        </div>
      )}
    </div>
  );
}

export default LoginPage;