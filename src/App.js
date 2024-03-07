import React, { useEffect, useState, useContext } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import LoginPage from './pages/Login/Loginpage';
import CreateAccountPage from './pages/register/RegistrationForm';
import TabView from './pages/TabView/Tabpage';
// import NearbyPage from './pages/NearBy/NearbyOrdersPage';

// Create a new context
const UserContext = React.createContext(null);

function PrivateRoute({ component: Component, ...rest }) {
  const user = useContext(UserContext);

  return (
    <Route
      {...rest}
      render={(props) =>
        user ? (
          <Component {...props} />
        ) : (
          <LoginPage history={props.history} />
        )
      }
    />
  );
}

function fetchUserData(uid) {
  const userRef = firebase.firestore().collection('messages').doc(uid);

  userRef
    .get()
    .then((doc) => {
      if (doc.exists) {
        const userData = doc.data();
        // Access and process the user data
        const { name, email, age } = userData;
        console.log('User Name:', name);
        console.log('User Email:', email);
        console.log('User Age:', age);
        // ...
        // Perform any necessary operations with the user data
      } else {
        // User document doesn't exist
        console.log('User document does not exist');
      }
    })
    .catch((error) => {
      // Handle the error
    });
}

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        // User is logged in
        setUser(user);
        fetchUserData(user.uid); // Fetch user data here
      } else {
        // User is logged out
        setUser(null);
      }
    });

    // Clean up the event listener on unmount
    return () => unsubscribe();
  }, []);

  return (
    <UserContext.Provider value={user}>
      <Router>
        <div>
          <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/create-account" component={CreateAccountPage} />
            <PrivateRoute path="/" component={TabView} />
          </Switch>
        </div>
      </Router>
    </UserContext.Provider>
  );
}

export default App;

// import React, { useEffect, useState } from 'react';
// import './App.css';
// import { db } from "./firebase-config";

// function App() {
//   const [messages, setMessages] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [isLoading, setIsLoading] = useState(false);

//   useEffect(() => {
//     const fetchData = async () => {
//       setIsLoading(true);
//       const snapshot = await db.collection('messages')
//         //.orderBy('timestamp')
//         .limit(currentPage * 4)
//         .get();
//       const messageList = snapshot.docs.map(doc => doc.data());
//       setMessages(messageList);
//       setIsLoading(false);
//     };

//     fetchData();
//   }, [currentPage]);

//   const handleScroll = () => {
//     if (
//       window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight
//     ) {
//       setCurrentPage(prevPage => prevPage + 1);
//     }
//   };

//   useEffect(() => {
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   return (
//     <div className="App">
//       <div className="card-container">
//         {messages.map((message, index) => (
//           <div className="card" key={index}>
//             <h3>From: {message["from-company"]}</h3>
//             <p>Phone Expected: {message["phone_expected"]}</p>
//             <p>Sender Phone: {message["sender_phone"]}</p>
//           </div>
//         ))}
//         {isLoading && <p>Loading...</p>}
//       </div>
//     </div>
//   );
// }

// export default App;