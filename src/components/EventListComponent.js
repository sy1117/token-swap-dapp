import React, { useMemo } from "react";
import {Table} from 'semantic-ui-react';
import Web3 from "web3";
import drizzle from 'drizzle';
import { drizzleConnect, drizzleReactHooks } from "drizzle-react";
import AppleToken from '../contracts/AppleToken'

class EventList extends React.Component{
  constructor(props, context) {
    super(props);
    this.state = {
      logs :[]
    };
  }

  getPastEvents(APContract){
    const that = this;

    APContract.getPastEvents('Transfer',{
        fromBlock: 0,
        toBlock: 'latest'
    })
    .then((events) => {
      that.setState({
        logs: events
      })
    });
  }

  componentDidMount(){

  }


  render(props){

    const that = this;
    const web3 = new Web3(Web3.givenProvider);
    const APContract = new web3.eth.Contract(AppleToken.abi, this.props.address);
    APContract.options.data = AppleToken.bytecode;

    this.getPastEvents(APContract);

    APContract.events.Transfer({
    }, (error, event) => { console.log(event); })
    .on('data', (event) => {
      let logs = that.state.logs;
      if( logs[0].transactionHash === event.transactionHash) return;

      this.setState({
        logs :[
          event,
          ... logs
        ] 
      })
    })
    .on('changed', (event) => {
      console.log("change")
        // remove event from local database
    })
    .on('error', console.error);
    let logs = this.state.logs.map((item,idx)=>(
      <Table.Row>
        <Table.Cell>{item.returnValues.from}</Table.Cell>
        <Table.Cell>{item.returnValues.to}</Table.Cell>
        <Table.Cell>{item.returnValues.value}</Table.Cell>
        <Table.Cell>{item.transactionHash}</Table.Cell>
      </Table.Row>
    ))
    return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>From</Table.HeaderCell>
          <Table.HeaderCell>To</Table.HeaderCell>
          <Table.HeaderCell>Value</Table.HeaderCell>
          <Table.HeaderCell>transactionHash</Table.HeaderCell>
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {logs}
      </Table.Body>
    </Table>
    )
  }

  componentDidMount(){
  }

}

export default EventList;