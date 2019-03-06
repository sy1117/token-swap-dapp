import React from "react";
import {
  AccountData,
  ContractData,
  ContractForm,
  dispatch,
  event,
  drizzle
} from "drizzle-react-components";

import ReferenceContract from '../contracts/Reference';
import accountsList from '../data/accounts.json';
import users from '../data/users.json';

import Web3 from 'web3';
import RequestModal from './RequestModalComponent';

import { 
  Button, Select, Card, Checkbox, Container, Divider, Form, Input, List,
  Message, Header, Segment, Label , Image, Rating,TextArea, Modal, Icon
} from 'semantic-ui-react'
import CommentList from './CommentListComponent';
import UserList from './UserListComponent';

class Request extends React.Component {
  constructor(props) {
    super(props);

    this.state ={
      users : UserList,
      currentContract:{
        address:"",
        name:"unknown",
        company:"unknown",
        respondents:[],
        comments:[{name:""}],
        maxReward:10
      }
    }
    this.generateExpireDate= this.generateExpireDate.bind(this);
    this.handleChange= this.handleChange.bind(this);
    this.getUser= this.getUser.bind(this);
    this.showContract= this.showContract.bind(this);
    this.expire = this.expire.bind(this);
    this.getUser();
  }

  expire(){
    let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
    let Reference = new web3.eth.Contract(ReferenceContract.abi, this.state.currentContract.address);
    Reference.options.data = ReferenceContract.bytecode;
    Reference.methods.expire().send({
        from: this.props.currentUser.address
    }).on('receipt', (receipt) => {
      /**
       * 데이터 베이스 저장
       */
      fetch(`/api/contract/${this.state.currentContract.address}`,{
        method : "DELETE"
      }).then(()=>{
        alert("취소되었습니다");
      })
    })
    .on('error', (err, result)=>{
      console.log(err.message, result);
      alert("error",result);
    }); // If there's an out of gas error the second parameter is the receipt.

  }

  getUser(){
    const that = this;
    fetch(`/api/user/${this.props.accounts[0]}`)
    .then(function(response, data) {
        return response.json();
    })
    .then(function(data){
      
        fetch(`api/contract/search`,{
          method: "POST",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            addresses: data.contracts
          })
        })
        .then(function(response, data) {
          return response.json();
        })
        .then(function(data){
          that.setState({
              data: data,
              currentContract : data[0]
          })
        });
    })
  }

  showContract(e){
    let _data = this.state.data.filter(val=>val.address ==e.currentTarget.id)
    if(_data[0]){
      this.setState({
        currentContract: _data[0]
      })
    }
  }

  generateExpireDate(e, {value}) {
    let date = new Date();
    date.setDate(date.getDate() + parseInt(value));

    this.setState({
      expireDate: date.toISOString().slice(0,10),
      showExpireDate : false
    });
  }

  handleChange(e) {
    let targetName= e.target.name;
    if(targetName="maxReward"){
      this.setState({
        cost : e.target.value * this.state.respondentList.length,
        [e.target.name]: e.target.value
      })
    }else{
      this.setState({
        [e.target.name]: e.target.value
      })
    }
  }

  render() {
    let {accounts} = this.props;
    let selectRespondents = Object.values(accountsList).map((val, idx) =>
      <Form.Group name="respondents" key={idx}>
        <Checkbox label={'Account' + idx + ':' + val} 
                  onChange={this.selectRespondents}
                  value={val}
                  {... (accounts['0'] == val ? { disabled: true } : '')}/>
      </Form.Group>
    );
    return (
      <Segment style={{ padding: '3em 0em' }} vertical>
        <Container>
          <Header as='h1'>
            {this.props.currentUser.name}
            <Header.Subheader>COMPANY</Header.Subheader>
          </Header>
        </Container>
        <Container style={{ padding: '3em 0em' }} >
        <Header as='h2' >
          채용 진행 중
          <RequestModal accounts={accounts}/>
        </Header>
        </Container>
        <Container>
        {this.state.currentContract?(
          <UserList data={this.state.data} onClick={this.showContract}/>
        ):(
          <Container textAlign='center'>
            <Header as='h2' disabled>
              진행 중인 항목이 없습니다.
            </Header>
          </Container>
        )}
        
      </Container>

      {this.state.currentContract? (
      <div>
        <Container style={{ padding: '3em 0em' }}>
        <Header as='h2' dividing>
          {this.state.currentContract.name}(소속:{this.state.currentContract.company})
        </Header>
        <Header as='h3'>
          Comments
        </Header>
        <CommentList data={this.state.currentContract} currentUser={this.props.currentUser}/>
      </Container>
      <Container style={{ padding: '0em 0em' }}>
        <Header as='h3'>
          취소
          <Header.Subheader>요청 취소 시 잔액이 환불됩니다</Header.Subheader>
        </Header>
        <Button negative onClick={this.expire}>Expire</Button>
      </Container>
      </div>
      ):''}
    </Segment>
    
    );
  }
}
export default Request;
