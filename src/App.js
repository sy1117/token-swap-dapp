// import React, { Component, createContext } from 'react';
// import { DrizzleProvider } from "drizzle-react";
// import { LoadingContainer } from "drizzle-react-components";
// // import logo from './logo.svg';
// import './App.css';
// import MyContainer from './containers/MyContainer';
// import drizzleOptions from './drizzleOptions';

// class App extends Component {
//   render() {
//     return (
//       <DrizzleProvider options={drizzleOptions}>
//         <LoadingContainer>
//           <MyContainer />
//         </LoadingContainer>
//       </DrizzleProvider>
//     );
//   }
// }

// export default App;

import React from 'react';

// 1. Import drizzle, drizzle-react, and your contract artifacts.
import { Drizzle, generateStore } from "drizzle";
import { DrizzleContext, DrizzleProvider } from "drizzle-react";
// import SimpleStorage from "./contracts/SimpleStorage.json";
import MyContainer from './containers/MyContainer';


// 2. Setup the drizzle instance.
import drizzleOptions from './drizzleOptions';
const drizzleStore = generateStore(drizzleOptions);
const drizzle = new Drizzle(drizzleOptions, drizzleStore);

// ...
class App extends React.Component {
  render() {
    return (
      <DrizzleProvider options={drizzleOptions}>
        <DrizzleContext.Provider drizzle={drizzle}>
          <MyContainer />
        </DrizzleContext.Provider>
      </DrizzleProvider>
    );
  }
}
// 3. Pass the drizzle instance into the provider and wrap it
//    around your app.
{/* <DrizzleContext.Provider drizzle={drizzle}>
  <MyContainer />
</DrizzleContext.Provider> */}

export default App;

