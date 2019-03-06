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
import Users from '../data/users.json';

import Web3 from 'web3';

import {Input, Header, Form, Segement, Container, Checkbox, Segment, Button, Modal} from 'semantic-ui-react'

class Respondent extends React.Component {

  constructor(){
    super()

    let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));

    this.state = {
      modalOpen: false,
      accounts : Users,
      web3 : web3,
      name : "",
      company:"",
      currentAccount : web3.eth.accounts[0],
      respondentList : [],
      showExpireDate : true,
      deadline: 3,
      minReward :1,
      maxReward :3,
      cost: 0,
      requests : [
        {
          name :'Elliot'
        }
      ],
      respondentList : [],
    }
    this.selectRespondents = this.selectRespondents.bind(this);
    this.createContract= this.createContract.bind(this);
    this.handleChange= this.handleChange.bind(this);
    this.handleOpen= this.handleOpen.bind(this);
    this.handleClose= this.handleClose.bind(this);
  }

  handleOpen(){
    this.setState({ modalOpen: true })
  }

  handleClose(){
    this.setState({ modalOpen: true })
  }

  createContract(e, data) {
    const account = this.props.accounts[0];
    const that = this;
    let formData = new FormData(e.currentTarget);
    var web3 = this.state.web3;
    let Reference = new web3.eth.Contract(ReferenceContract.abi);

    Reference.deploy({
      data : ReferenceContract.bytecode,
      arguments: [
        this.state.respondentList,
        this.state.minReward,
        this.state.maxReward,
        this.state.deadline
      ]
    }).send({
        from: account,
        gas: 1500000,
        value: web3.utils.toWei(this.state.cost+'','ether')
    })
    .then((newContractInstance) => {
      /**
       * contract 
       */
      fetch('/api/contract',{
        method :'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          name : that.state.name,
          company : that.state.company,
          address :newContractInstance.options.address,
          recruiter : account,
          respondents: that.state.respondentList,
          comments: that.state.accounts.filter(val=>val.checked),
          maxReward : that.state.maxReward,
        })
      }).then(()=>{
        that.setState({ modalOpen: false })
        fetch(`/api/user/contract/${account}`,{
          method :'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            user : account,
            contract :newContractInstance.options.address,
          })
        })
        .then(function(response, data) {
          return response.json();
        })
        .then(function(data){
        });

        that.state.respondentList.map(val=>{
          fetch(`/api/user/contract/${val}`,{
            method :'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body:JSON.stringify({
              user : val,
              contract :newContractInstance.options.address,
            })
          })
          .then(function(data){
          });
        })
      })

    });
  }


  handleChange(e){
    let targetName= e.currentTarget.name;
    if(targetName=="maxReward"){
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

  selectRespondents(e){
    let respondentList = this.state.respondentList;
    let target = e.currentTarget.children[0];
    let value = target.value;

    !target.checked? respondentList.push(value): respondentList.splice(respondentList.indexOf(value), 1);
    this.state.accounts[target.name].checked = !target.checked

    this.setState({
      cost : this.state.maxReward * respondentList.length
    })
  }
  
  render(){
    let {accounts} = this.props;
    let selectRespondents = Object.values(Users).map((val, idx) =>(
      <Form.Group name="respondents" key={idx}>
        <Checkbox label={'Account' + idx + ':' + val.name} 
                  onChange={this.selectRespondents}
                  data = {val}
                  value={val.address}
                  name={idx}
                  {... (accounts['0'] == val.address ? { disabled: true } : '')}/>
      </Form.Group>
    ));
    return (
              <Modal trigger={<Button color='red' onClick={this.handleOpen} style={{marginLeft:'1em', padding:'0.5em'}}>New</Button>} 
              open={this.state.modalOpen}
                  closeIcon>
            <Modal.Header>채용자에 대한 레퍼런스 요청하기</Modal.Header>
            <Modal.Content >
            <Segment vertical>

      <Container>
          <Form warning onSubmit={this.createContract}>
            <Header>
              <Header.Subheader>채용 대상자의 정보를 입력하세요.</Header.Subheader>
            </Header>
            <Form.Field inline>
              <label>이름</label> 
              <Input 
                  type="text"
                  name="name"
                  value={this.state.name}
                  onChange={this.handleChange}
                  placeholder="name" required/>
            </Form.Field>
            <Form.Field inline>
               <label>회사명</label>
               <Input type="text" 
                      name="company"
                      value={this.state.company}
                      onChange={this.handleChange}
                      placeholder="company" required/>
            </Form.Field>
            <Header as='h3'>
              응답자 선택
              <Header.Subheader>레퍼런스 체크를 요청할 사람을 선택합니다</Header.Subheader>
            </Header>
            {selectRespondents}
            <Header as='h3'>
              <Header.Subheader>레퍼런스 체크의 기한을 설정합니다. 기한이 지나면 요청자들은 응답할 수 없습니다</Header.Subheader>
            </Header>
            <Form.Field>
            </Form.Field>
            <Header as='h3'>
              <Header.Subheader>레퍼런스에 응한 사람들에게 Reward 를 줍니다</Header.Subheader>
            </Header>
            <Form.Field inline>
              <label>기본 Reward</label>
              <Input 
                    type="number" 
                    value={this.state.minReward} 
                    label={{ basic: true, content: 'ether' }} 
                    name="minReward" labelPosition='right' placeholder='Minimum Reward (per Person)'
                    onChange={this.handleChange} disabled
                    /><br/>
              {/* <Form.Select fluid label='Gender' options={options} placeholder='Gender' /> */}
            </Form.Field>
            <Form.Group inline>
              <label>최대 Reward</label>
              <Input
                    type="number" 
                    value={this.state.maxReward}
                    onChange={this.handleChange}
                    min={this.state.minReward}
                    max="100"
                    label={{ basic: true, content: 'gwei' }} 
                    name="maxReward" 
                    labelPosition='right' 
                    placeholder='Maximum Reward (per Person)' /><br/>
              {/* <Form.Select fluid label='Gender' options={options} placeholder='Gender' /> */}
            </Form.Group>
            <Form.Group inline>
              <Header as='h2'>
                결제 비용 : {this.state.cost} ether
              </Header>
            </Form.Group>
            <Button type='submit'>Submit</Button>
          </Form> 
      </Container>
      </Segment>

            </Modal.Content>
          </Modal>
    )
  }
}
export default Respondent;
