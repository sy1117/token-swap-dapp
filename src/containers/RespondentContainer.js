import RespondentComponent from "../components/RespondentComponent";
import Users from "../data/users"
import { drizzleConnect } from "drizzle-react";

const mapStateToProps = state => {
  let currentUser = Users.filter(val=>(val.address==state.accounts[0]))[0]

  return {
    accounts: state.accounts,
    currentUser : currentUser
  };
};

const RespondentContainer = drizzleConnect(RespondentComponent, mapStateToProps);

export default RespondentContainer;
