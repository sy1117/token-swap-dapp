import RespondentComponent from "../components/RespondentComponent";

import { drizzleConnect } from "drizzle-react";

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
  };
};

const RespondentContainer = drizzleConnect(RespondentComponent, mapStateToProps);

export default RespondentContainer;
