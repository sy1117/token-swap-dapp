import RequestComponent from "../components/RequestComponent";

import { drizzleConnect } from "drizzle-react";

const mapStateToProps = state => {
  return {
    accounts: state.accounts,
  };
};

const RequestContainer = drizzleConnect(RequestComponent, mapStateToProps);

export default RequestContainer;
