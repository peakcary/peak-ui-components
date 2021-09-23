import React, { Component } from 'react';
import { Alert, Button,BocProps } from './components';

class App extends Component {

  render() {
      console.log('app init')
    return (
      <div className="App">
        <Button text={'a'}></Button>
        <Alert text={'b'}></Alert>
        <BocProps text={'c'}></BocProps>
      </div>
    );
  }
}

export default App;
