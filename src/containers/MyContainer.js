import MyComponent from "../components/MyComponent";
import { drizzleConnect } from "drizzle-react";



const mapStateToProps = state => {

  return {
    accounts: state.accounts,
    AppleToken: state.contracts.AppleToken,
    BananaToken: state.contracts.BananaToken,
    drizzleStatus: state.drizzleStatus,
  };
};

const MyContainer = drizzleConnect(MyComponent, mapStateToProps);

export default MyContainer;
