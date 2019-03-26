import EventListComponent from "../components/EventListComponent";
import { useMemo } from 'react';
import drizzle from "drizzle";
import { drizzleConnect } from "drizzle-react";

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
