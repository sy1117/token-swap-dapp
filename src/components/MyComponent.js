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
import Web3 from 'web3'
// import logo from "../logo.png";
class MyComponent extends React.Component {
  constructor(props){
    super();

    const { drizzle, drizzleState } = props;

    this.state  = { 
      AP_BALANCE: null,
      AppleToken : drizzle.contracts.AppleToken,
      BananaToken :  drizzle.contracts.BananaToken,
      HashedTimelockERC20 :  drizzle.contracts.HashedTimelockERC20,
      tokenList :[
        { key: 'm', text: 'AP', value: drizzle.contracts.AppleToken.address},
        { key: 'f', text: 'BNN', value: drizzle.contracts.BananaToken.address},
      ]
    };

    this.newContract = this.newContract.bind(this);
    this.handleChange = this.handleChange.bind(this);

    drizzle.contracts.AppleToken.methods.allowance(drizzleState.accounts[0],  drizzle.contracts.HashedTimelockERC20.address).call()
    .then(result=>{
      console.log(result)
    })
  }

  componentDidMount() {
    const { drizzle, drizzleState } = this.props;
    const AppleToken = this.state.AppleToken; //drizzle.contracts.AppleToken;
    const BananaToken = this.state.BananaToken; //drizzle.contracts.BananaToken;

    // get and save the key for the variable we are interested in
    const AP_BALANCE = AppleToken.methods["balanceOf"].cacheCall(drizzleState.accounts[0]);
    const BNN_BALANCE = BananaToken.methods["balanceOf"].cacheCall(drizzleState.accounts[0]);

    this.setState({ AP_BALANCE, BNN_BALANCE });
  }

  handleChange(e, { name, value }){
    this.setState({[name]: value})
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
    
          <Form onSubmit={this.newContract}>
            <Form.Group widths='equal'>
              <Form.Field control={Input} name="receiver" label='Receiver' placeholder='Receiver Address' value={'0x86Bae1a246FedaCB425eB58f310B48efCAd6D742'} />
              <Form.Field control={Input} name="hashlock" label='Hash Lock' placeholder='Hash Lock'  value={'B61B872359F717558BFFB6D3484E467C186FAE3E8DAADBF8F89A2BA550AE6B37'}/>
              <Form.Field control={Input} name="timelock" label='Time Lock' placeholder='Time Lock'/>
            </Form.Group>
            <Form.Group widths='equal'>
              <Form.Field control={Select} name="tokenContract" id="tokenContract"
                          label='Token Contract Address' 
                          options={tokenList}
                          onChange={this.handleChange}
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

  newContract(e){
    // 1) newContract(receiver, hashlock, timelock, tokenContract, amount) - a 
    //         *      sender calls this to create a new HTLC on a given token (tokenContract) 
    //         *       for a given amount. A 32 byte contract id is returned
    let formData = new FormData(e.target);
    let { HashedTimelockERC20,  AppleToken } = this.state;
    let {newContract} = HashedTimelockERC20.methods;
    let {web3} = this.props.drizzle;
    

    console.log(            formData.get("receiver")
    , web3.utils.fromAscii("t")
    , formData.get("timelock")
    , this.state.tokenContract
    , formData.get("amount") )

    AppleToken.methods['approve'](HashedTimelockERC20.address, formData.get("amount")).send()
    
      .on('transactionHash', (hash) => {
        newContract(
            formData.get("receiver")
            , web3.utils.fromAscii("22")
            , formData.get("timelock")
            , this.state.tokenContract
            , formData.get("amount") 
          ).send()
          .then((receipt) => {
            alert("Aa")
            console.log(receipt.events)

              // receipt can also be a new contract instance, when coming from a "contract.deploy({...}).send()"
          });
        
      })
   }
}

export default MyComponent;