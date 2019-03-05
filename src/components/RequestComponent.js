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
import Web3 from 'web3';
import RequestModal from './RequestModalComponent';

import { 
  Button, Select, Card, Checkbox, Container, Divider, Form, Input, List,
  Message, Header, Segment, Label , Image, Rating,TextArea, Modal, Icon
} from 'semantic-ui-react'
import Comment from './CommentComponent';
import UserList from './UserListComponent';

class Request extends React.Component {
  constructor(props) {
    super(props);

    this.state ={
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
    this.getUser();

    // var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
    // let Reference = new web3.eth.Contract(ReferenceContract.abi, this.state.address);
    // Reference.options.data = ReferenceContract.bytecode;
    // let res = Reference.methods.getStatus().call({
    //   from: this.props.accounts[0]
    // },(err, result)=>{
    //   console.log(err, result);
    // })
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
    console.log(this.state.currentContract.comments)
    console.log(       this.state.currentContract.comments.map((val,idx)=>{return(
      <Comment data={val}/>
    )}));
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
          채용 진행 중
          {/* <Modal trigger={<Button color='red' style={{marginLeft:'1em', padding:'0.5em'}}>New</Button>} 
                  closeIcon>
            <Modal.Header>채용자에 대한 레퍼런스 요청하기</Modal.Header>
            <Modal.Content > */}
              <RequestModal accounts={accounts}/>
        </Header>
        </Container>
        <Container>
          <UserList data={this.state.data} onClick={this.showContract}/>
      </Container>
      <Divider />

      {this.state.currentContract? (
      <Container style={{ padding: '3em 0em' }}>
      <Header as='h1'>
        {this.state.currentContract.name}
        <Header.Subheader> {this.state.currentContract.company}</Header.Subheader>
      </Header>
      <Header as='h2'>
        Comments
      </Header>
      <Card.Group>
        {this.state.currentContract.comments.map((val,idx)=>{return(
            <Comment data={val}/>
          )})}
      </Card.Group>
    </Container>
      ):''}
    </Segment>
    );
  }

  componentDidMount(){
  }
}
export default Request;
