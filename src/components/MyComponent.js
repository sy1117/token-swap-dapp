import React from "react";
import {
  AccountData,
  ContractData,
  ContractForm,
} from "drizzle-react-components";
import drizzle from 'drizzle'
import { 
  Button,
  Form, 
  Input,
  Segment,
  Select
} from 'semantic-ui-react';
import EventContainer from '../containers/EventContainer'
// import logo from "../logo.png";
class MyComponent extends React.Component {
  constructor(props){
    super();

    const { drizzle, drizzleState } = props;

    this.state  = { 
      AP_BALANCE: null,
      contractA : drizzle.contracts.AppleToken,
      contractB :  drizzle.contracts.BananaToken,
      tokenList :[
        { key: 'm', text: 'AP', value: drizzle.contracts.AppleToken.address},
        { key: 'f', text: 'BNN', value: drizzle.contracts.BananaToken.address},
      ]
    };

    console.log(drizzle)
  }

  componentDidMount() {
    const { drizzle, drizzleState } = this.props;
    const contractA = this.state.contractA; //drizzle.contracts.AppleToken;
    const contractB = this.state.contractB; //drizzle.contracts.BananaToken;

    // get and save the key for the variable we are interested in
    const AP_BALANCE = contractA.methods["balanceOf"].cacheCall(drizzleState.accounts[0]);
    const BNN_BALANCE = contractB.methods["balanceOf"].cacheCall(drizzleState.accounts[0]);

    this.setState({ AP_BALANCE, BNN_BALANCE });
  }

  render(){
    const { drizzle, drizzleState } = this.props;
    const { AppleToken, BananaToken, HashedTimelockERC20 } = drizzleState.contracts;
    const AP_BALANCE = AppleToken.balanceOf[this.state.AP_BALANCE];
    const BNN_BALANCE = BananaToken.balanceOf[this.state.BNN_BALANCE];
    const tokenList = this.state.tokenList;
  
    return (
      <div className="App" style={{margin: '5em'}}>
        <Segment color='red'>
          <h2>Active Account</h2>
          <AccountData accountIndex="0" units="ether" precision="3" />
        </Segment>

        <div className="section">
          <h2>AppleToken</h2>
          <p>
            <strong>My Balance: {AP_BALANCE? AP_BALANCE.value: ''}</strong>
          </p>
          <h3>transaction logs</h3>
          <EventContainer address={drizzle.contracts.AppleToken.address}/>
        </div>
        <div className="section">
          <h2>BananaToken</h2>
          <p>
            <strong>My Balance: {BNN_BALANCE? BNN_BALANCE.value: ''}</strong>
          </p>
          <h3>transaction logs</h3>
          <EventContainer address={drizzle.contracts.BananaToken.address}/>
        </div>
        <div className="section">
          <h2>HashedTimelockERC20</h2>
          <code>
          /* @title Hashed Timelock Contracts (HTLCs) on Ethereum ERC20 tokens.<br/>
            *
            * This contract provides a way to create and keep HTLCs for ERC20 tokens.
            *
            * See HashedTimelock.sol for a contract that provides the same functions 
            * for the native ETH token.
            *
            * Protocol:
            *
            *  1) newContract(receiver, hashlock, timelock, tokenContract, amount) - a 
            *      sender calls this to create a new HTLC on a given token (tokenContract) 
            *       for a given amount. A 32 byte contract id is returned
            *  2) withdraw(contractId, preimage) - once the receiver knows the preimage of
            *      the hashlock hash they can claim the tokens with this function
            *  3) refund() - after timelock has expired and if the receiver did not 
            *      withdraw the tokens the sender / creater of the HTLC can get their tokens 
            *      back with this function.
          </code> 
    
          <Form>
            <Form.Group widths='equal'>
              <Form.Field control={Input} name="recevier" label='Receiver' placeholder='Receiver Address' />
              <Form.Field control={Input} name="hashlock" label='Hash Lock' placeholder='Hash Lock' />
              <Form.Field control={Input} name="timelock" label='Time Lock' placeholder='Time Lock'/>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field control={Select} name="tokenContract" 
                          label='Token Contract Address' 
                          options={tokenList}
                          placeholder='Token Contract Address' />
              <Form.Field control={Input} name="amount" type='number' label='Amount' placeholder='Amount' />
            </Form.Group>
            <Button type='submit'>Submit</Button>
          </Form>
        </div>
        
        {/* <div className="section">
          <h2>SimpleStorage</h2>
          <p>
            This shows a simple ContractData component with no arguments, along with
            a form to set its value.
          </p>
          <p>
            <strong>Stored Value: </strong>
            <ContractData contract="SimpleStorage" method="storedData" />
          </p>
          <ContractForm contract="SimpleStorage" method="set" />
        </div>
    
        <div className="section">
          <h2>TutorialToken</h2>
          <p>
            Here we have a form with custom, friendly labels. Also note the token
            symbol will not display a loading indicator. We've suppressed it with
            the <code>hideIndicator</code> prop because we know this variable is
            constant.
          </p>
          <p>
            <strong>Total Supply: </strong>
            <ContractData
              contract="TutorialToken"
              method="totalSupply"
              methodArgs={[{ from: accounts[0] }]}
            />{" "}
            <ContractData contract="TutorialToken" method="symbol" hideIndicator />
          </p>
          <p>
            <strong>My Balance: </strong>
            <ContractData
              contract="TutorialToken"
              method="balanceOf"
              methodArgs={[accounts[0]]}
            />
          </p>
          <h3>Send Tokens</h3>
          <ContractForm
            contract="TutorialToken"
            method="transfer"
            labels={["To Address", "Amount to Send"]}
          />
        </div>
        <div className="section">
          <h2>ComplexStorage</h2>
          <p>
            Finally this contract shows data types with additional considerations.
            Note in the code the strings below are converted from bytes to UTF-8
            strings and the device data struct is iterated as a list.
          </p>
          <p>
            <strong>String 1: </strong>
            <ContractData contract="ComplexStorage" method="string1" toUtf8 />
          </p>
          <p>
            <strong>String 2: </strong>
            <ContractData contract="ComplexStorage" method="string2" toUtf8 />
          </p>
          <strong>Single Device Data: </strong>
          <ContractData contract="ComplexStorage" method="singleDD" />
        </div> */}
      </div>
    );
  }
}

export default MyComponent;