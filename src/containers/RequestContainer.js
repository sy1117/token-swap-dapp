import RequestComponent from "../components/RequestComponent";
import Users from "../data/users"
import { drizzleConnect } from "drizzle-react";


const mapStateToProps = state => {
  let currentUser = Users.filter(val=>(val.address==state.accounts[0]))[0]

  return {
    accounts: state.accounts,
    currentUser : currentUser
  };
};

const RequestContainer = drizzleConnect(RequestComponent, mapStateToProps);

export default RequestContainer;
