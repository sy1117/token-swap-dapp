import React from "react";
import {
  AccountData,
  ContractData,
  ContractForm,
  dispatch,
  event,
  drizzle
} from "drizzle-react-components";
// import { drizzle, dispatch } from 'drizzle';

import ReferenceContract from '../contracts/Reference';
import accountsList from '../data/accounts.json';
import Web3 from 'web3';

import { Button, List, Container, Divider, Form, Header, Image, Segment, TextArea, Label, Rating } from 'semantic-ui-react'

import UserList from './UserListComponent'

class Respondent extends React.Component {

  constructor(){
    super()
    this.state = {
      requests : [
        {
          name :'Elliot'
        }
      ]
    }
  }
  
  render(){
    return (
    <Segment style={{ padding: '3em 0em' }} vertical>
      <Container>
        <Header as='h1'>요청 리스트</Header>
        <UserList/>
      </Container>
      <Divider/>
      <Container style={{ padding: '3em 0em' }}>
        <Header as='h1'>
          {this.state.requests[0].name} 에 대한 평가를 작성해주세요
        </Header>
        <Form>
          <Form.Field>
            <Header as='h2'>
              Tech   
            </Header>
            <Rating icon='star' defaultRating={3} maxRating={5} />
            <TextArea placeholder='Tell us more' />
          </Form.Field>
          <Form.Field>
            <Header as='h2'>
              Communication Skils   
            </Header>
            <Rating icon='star' defaultRating={3} maxRating={5} />
            <TextArea placeholder='Tell us more' />
          </Form.Field>
        </Form>
      </Container>
    </Segment>
    )
  }
}
export default Respondent;
