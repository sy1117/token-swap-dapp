import React, { Component, createContext } from 'react';
import { DrizzleProvider } from "drizzle-react";
import { LoadingContainer } from "drizzle-react-components";
// import logo from './logo.svg';
import './App.css';
import MyContainer from './containers/MyContainer';
import drizzleOptions from './drizzleOptions';

class App extends Component {
  render() {
    return (
      <DrizzleProvider options={drizzleOptions}>
        <LoadingContainer>
          <MyContainer />
        </LoadingContainer>
      </DrizzleProvider>
    );
  }
}

export default App;
