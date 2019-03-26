import React, { useMemo } from "react";
import Web3 from "web3";
import drizzle from 'drizzle';
import { drizzleConnect, drizzleReactHooks } from "drizzle-react";
import AppleToken from '../contracts/AppleToken'

class EventList extends React.Component{
  constructor(props, context) {
    super(props)
    this.state = {
      logs :[]
    };
    const that = this;
    const web3 = new Web3(Web3.givenProvider);
    const APContract = new web3.eth.Contract(AppleToken.abi, '0x3Cb468852D8943533b1BB6AB6Eee516aB9D757a7');
    APContract.options.data = AppleToken.bytecode;

    APContract.events.Transfer({
    }, (error, event) => { console.log(event); })
    .on('data', (event) => {
      console.log('data')
      let {returnValues, transactionHash} = event;
      let { to, from, value } = returnValues
      this.setState({
        logs :[
          {
            to : to,
            from : from,
            value : value,
            transactionHash : transactionHash
          },
          ... that.state.logs
        ] 
      })
    })
    .on('changed', (event) => {
      console.log("change")
        // remove event from local database
    })
    .on('error', console.error);
    

  }
  render(props){
    let logs = this.state.logs.map((item,idx)=>(
      <li key={idx}>from:{item.from}, to:{item.to}, value:{item.value}</li>
    ))
    return (
      <div>
        {logs}
      </div>
    )
  }

}

export default EventList;