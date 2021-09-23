import React, { Component } from 'react';
import {   BocProps } from './components';

class App extends Component {


  handleConfirm = (data) => {
    console.log('data', data)
  }

  render() {
    return (
      <div className="App">
        <BocProps
          ptype='user'
          initialValue='${user.$mp_wx6228eb2adfba3ab4_qr_scene_str}'
          onConfirm={this.handleConfirm}
          readonly={false}>
        </BocProps>
      </div>
    );
  }
}

export default App;
