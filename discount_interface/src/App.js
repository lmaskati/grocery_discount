import React, { useState, useEffect } from 'react';
import './App.css';
import Supermarket from './Supermarket';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner } from 'react-bootstrap';
import HeaderBar from './HeaderBar';

const App = () => {
  const [content, setContent] = useState(undefined);

  useEffect(async () => {
    const fetchList = async () => {
      const result = await fetch('http://localhost:5000/', {
        headers: new Headers({
          'content-type': 'application/json',
        }),
        method: 'GET',
      });
      if (!result.ok) {
        alert("Something went very wrong!");
        return;
      }
      const json = await result.json();
      setContent(json);
    };
    fetchList();
  }, []);

  let stuff = undefined;
  if (content === undefined) {
    stuff = (
      <div className="w-100 h-100 d-flex align-items-center justify-content-center">
        <div className="d-flex align-items-center flex-column border rounded p-3 bg-light">
          <Spinner animation="border" />
          <div className="mt-3">Page is loading...</div>
        </div>
      </div>
    );

    
  } else {
    stuff = (
      <div className="App">
        <header className="App-header">
          {content.map((item) => <Supermarket name={item} />)}
          <p>The current time is 5.</p>
        </header>
      </div>
    );
  }

  return (
    <div className="d-flex flex-column w-100 h-100">
      <HeaderBar />
      <div className="d-flex flex-grow-1">
        {stuff}
      </div>
    </div>
  )
}

export default App;