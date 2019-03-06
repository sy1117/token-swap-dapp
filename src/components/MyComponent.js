import React from "react";
import {
  AccountData,
  ContractData,
  ContractForm,
} from "drizzle-react-components";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Button, Select, Checkbox, Form, Segment, Header } from 'semantic-ui-react';
import UserList from '../data/users';
import Request from '../components/RequestComponent'
import Respondent from '../components/RespondentComponent'


class Main extends React.Component {
  
  constructor(props, context){
    super(props);
    this.state  = {
      currentAccount : 0
    }
  }

  render() {
    let {accounts, drizzleStatus} = this.props;
    let userInfo = UserList.filter(val=>val.address==accounts[0])[0]
    let isCompanyAccount = userInfo.userType === 1;

    return (
      <div>
        {/* <div className="section">
          <h2>Active Account</h2> */}
          
          {/* <AccountData accountIndex={0} units="ether" precision="3" /> */}

          {isCompanyAccount?
            (<Request accounts={accounts} currentUser={userInfo}/>):(<Respondent accounts={accounts} currentUser={userInfo}/>)
          }
        {/* </div> */}
      </div>

    )
  }
}
export default Main;
// export default ({ accounts }) => (
// );
