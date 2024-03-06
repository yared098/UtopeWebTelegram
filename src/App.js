import React, { useEffect, useState } from 'react';
import './App.css';
import { db } from "./firebase-config";

function App() {
  const [messages, setMessages] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const snapshot = await db.collection('messages')
        //.orderBy('timestamp')
        .limit(currentPage * 4)
        .get();
      const messageList = snapshot.docs.map(doc => doc.data());
      setMessages(messageList);
      setIsLoading(false);
    };

    fetchData();
  }, [currentPage]);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop === document.documentElement.offsetHeight
    ) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
        {isLoading && <p>Loading...</p>}
      </div>
    </div>
  );
}

export default App;