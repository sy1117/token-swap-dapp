import MyComponent from "../components/MyComponent";
import React from "react";
import { DrizzleContext } from "drizzle-react";


const MyContainer = () => (
  <DrizzleContext.Consumer>
    {drizzleContext => {
      const { drizzle, drizzleState, initialized, drizzleStore } = drizzleContext;
  
      if (!initialized) {
        return "Loading...";
      }

      return (
        <MyComponent drizzle={drizzle} drizzleState={drizzleState} initialized={initialized} />
      );
    }}
  </DrizzleContext.Consumer>
)


// const MyContainer = drizzleConnect(MyComponent, mapStateToProps);

export default MyContainer;
