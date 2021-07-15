import logo from './logo.svg';
import './App.css';
import GridTest from './GridTest.js';
import React from 'react';

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <GridTest/>
        </header>
      </div>
    );
  }
}

export default App;
