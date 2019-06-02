import React, { Component } from 'react';
import { Root } from './src/routing/stack';
import StackOverflow from './src/uiComponent/StackOverflow';


class App extends Component {
   render() {
      return (
         <Root />
         // <StackOverflow />
      )
   }
}

export default App