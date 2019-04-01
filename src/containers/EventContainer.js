import EventListComponent from "../components/EventListComponent";
import { useMemo } from 'react';
import drizzle from "drizzle";
import { drizzleConnect } from "drizzle-react";

// const MyContainer = () => (
//   <DrizzleContext.Consumer>
//     {drizzleContext => {
//       const { drizzle, drizzleState, initialized, drizzleStore } = drizzleContext;
  
//       if (!initialized) {
//         return "Loading...";
//       }

//       return (
//         <MyComponent drizzle={drizzle} drizzleState={drizzleState} initialized={initialized} />
//       );
//     }}
//   </DrizzleContext.Consumer>
// )


// const MyContainer = drizzleConnect(MyComponent, mapStateToProps);

// export default MyContainer;


const mapStateToProps = state => {

  return {
    web3: state.web3,
    accounts: state.accounts,
    AppleToken: state.contracts.AppleToken,
    BananaToken: state.contracts.BananaToken,
    drizzleStatus: state.drizzleStatus
  };
};
function mapDispatchToProps(dispatch) {
  return {
  }
}

const EventContainer = drizzleConnect(EventListComponent, mapStateToProps, mapDispatchToProps);

export default EventContainer;
