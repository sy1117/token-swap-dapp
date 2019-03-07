import React from 'react'
import { AccountData, ContractData, ContractForm, dispatch, event, drizzle} from 'drizzle-react-components'
// import { drizzle, dispatch } from 'drizzle'

import ReferenceContract from '../contracts/Reference'
import accountsList from '../data/accounts.json'
import Web3 from 'web3'

import { Button, List, Container, Divider, Form, Header, Image, Segment, TextArea, Label, Rating } from 'semantic-ui-react'

import UserList from './UserListComponent'

class Respondent extends React.Component {

  constructor () {
    super()
    this.state = {
      currentContract: {
        address: '',
        name: 'unknown',
        company: 'unknown',
        respondents: [],
        comments: [{name: ''}],
        maxReward: 10
      },
      rating:3,
      content:""
    }
    this.getUser = this.getUser.bind(this)
    this.answer = this.answer.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.showContract = this.showContract.bind(this);
  }

  handleChange(e, data) {
    let target= e.currentTarget;
    let _state = {};
    if(data.rating){
      _state[data.name] = data.rating;
    }else{
      _state[target.name]= data.value;
    }
    this.setState(_state);
    console.log(this.state)
  }

  showContract(e){
    let _data = this.state.data.filter(val=>val.address ==e.currentTarget.id)
    if(_data[0]){
      this.setState({
        currentContract: _data[0]
      })
    }
  }

  answer () {
    const that = this;
    let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));
    let Reference = new web3.eth.Contract(ReferenceContract.abi, this.state.currentContract.address);
    Reference.options.data = ReferenceContract.bytecode;
    Reference.methods.answer().send({
        from: this.props.accounts[0]
    }).on('receipt', (receipt) => {
      /**
       * 데이터 베이스 저장
       */
      let commentObj = this.state.currentContract.comments.filter(val => val.address == this.props.currentUser.address);
      Object.assign(commentObj[0],{
        rating: this.state.rating,
        content : this.state.content
      });
      fetch(`/api/contract/${this.state.currentContract.address}`,{
        method : "PUT",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body:JSON.stringify({
          comments: this.state.currentContract.comments
        })
      }).then(()=>{
        fetch(`/api/user/${that.props.accounts[0]}`,{
          method : "PUT",
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body:JSON.stringify({
            contracts: that.state.user.contracts.filter(val=>val!=this.state.currentContract.address)
          })
        });
        alert("평가 작성이 완료되었습니다.");
        window.location.reload();
      })
      
    })
    .on('error', (err, result)=>{
      alert("error",result);
    }); // If there's an out of gas error the second parameter is the receipt.
  }

  getUser () {
    const that = this
    let {accounts} = this.props

    fetch(`/api/user/${accounts[0]}`)
      .then(function (response, data) {
        return response.json()
      })
      .then(function (data) {
        that.setState({
          user: data
        });
        fetch(`api/contract/search`, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            addresses: data.contracts
          })
        })
        .then(function (response, data) {
          return response.json()
        })
        .then(function (data) {
          that.setState({
            data: data,
            currentContract: data[0]
          })
        })
      })
  }
  render () {
    return (
      <Segment style={{ padding: '3em 0em' }} vertical>
        <Container style={{ padding: '0em 0em' }}>
          <Header as='h1'>
            {this.props.currentUser.name}
            <Header.Subheader>CO-WORKERS</Header.Subheader>
          </Header>
        </Container>
        <Divider/>
        <Container>
          <Header as='h1'>
            요청 리스트
          </Header>
          <UserList data={this.state.data} onClick={this.showContract} />
        </Container>
        <Divider/>

        {this.state.currentContract?
        ( 
        <Container style={{ padding: '3em 0em' }}>
          <Header as='h1'>
            {this.state.currentContract.name} 에 대한 평가를 작성해주세요
          </Header>
          <Form onSubmit={this.answer}>
            <Form.Field>
              <Rating
                icon='star'
                defaultRating={3}
                maxRating={5}
                name ='rating'
                onRate={this.handleChange}
                rating={this.state.rating} />
              <TextArea 
                  name ='content'
                  placeholder='Tell us more' 
                  onChange={this.handleChange}
                  value={this.state.content} />
            </Form.Field>
            <Button type='submit' floated='right'>
              Submit
            </Button>
          </Form>
        </Container>)
        :(
          <Container textAlign='center'>
            <Header as='h2' disabled>
              진행 중인 항목이 없습니다.
            </Header>
          </Container>
        )
        }
       
      </Segment>
    )
  }
  componentDidMount () {
    this.getUser()
  }
}
export default Respondent
