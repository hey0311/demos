import React, { Component } from 'react';
import Demo01 from './demo/Demo01.js'
import Demo02 from './demo/Demo02.js'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App" style={{height:'100%'}}>
          <Demo02/>
      </div>
    );
  }
}

export default App;
