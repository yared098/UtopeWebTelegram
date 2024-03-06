import React, { useEffect, useState } from 'react';
import './App.css';
import { db } from "./firebase-config";

function App() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const snapshot = await db.collection('messages').get();
      const messageList = snapshot.docs.map(doc => doc.data());
      setMessages(messageList);
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <div className="card-container">
        {messages.map((message, index) => (
          <div className="card" key={index}>
            <h3>From: {message["from-company"]}</h3>
            <p>Phone Expected: {message["phone_expected"]}</p>
            <p>Sender Phone: {message["sender_phone"]}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;