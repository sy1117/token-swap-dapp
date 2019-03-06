import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Button, Card, Container, Icon, Rating, Label } from 'semantic-ui-react'
import ReferenceContract from '../contracts/Reference'
import Web3 from 'web3'

const Comment = ({data, onReward, idx}) => (
  <Card>
    <Card.Content>
      <Card.Header>
        {data.name}
        {data.content ? (
           <Label style={{marginLeft: '1em'}} color='olive' horizontal>
             Answered
           </Label>
           ) : (
           <Label style={{marginLeft: '1em'}} color='yellow' horizontal>
             Waiting
           </Label>
           )}
        {data.rewarded
           ? (<Label style={{marginLeft: '1em'}} color='blue' horizontal>
                Rewarded
              </Label>)
           : ''}
      </Card.Header>
      <Card.Meta>
        Co-Worker
      </Card.Meta>
      <Card.Description>
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Card.Header>
      </Card.Header>
      <Rating
        icon='star'
        rating={data.rating}
        maxRating={5}
        disabled/>
      <Card.Description>
        {data.content}
      </Card.Description>
    </Card.Content>
    <Card.Content>
      <Button
        color='pink'
        icon
        fluid
        onClick={onReward.bind(this, idx)}
        {...((data.content && !data.rewarded) ? '' : {disabled: true})}>
        <Icon name='heart' /> Rewards
      </Button>
    </Card.Content>
  </Card>
)

class CommentList extends React.Component {
  constructor () {
    super()
    this.sendReward = this.sendReward.bind(this)
  }
  sendReward (index) {
    let {data, currentUser} = this.props
    let comment = data.comments[index]
    let {address} = this.props
    let web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))
    let Reference = new web3.eth.Contract(ReferenceContract.abi, data.address)
    Reference.options.data = ReferenceContract.bytecode
    Reference.methods.sendReward(comment.address).send({
      from: currentUser.address
    }).on('receipt', (receipt) => {
      /**
       * 데이터 베이스 저장
       */
      comment.rewarded = true
      fetch(`/api/contract/${data.address}`, {
        method: 'PUT',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          comments: data.comments
        })
      })
    })
      .on('error', (err, result) => {
        alert('error', result)
      }); // If there's an out of gas error the second parameter is the receipt.
  }

  render () {
    let {data} = this.props
    return (
      <Card.Group>
        {data.comments.map((val, idx) => {
           return (
             <Comment idx={idx} data={val} onReward={this.sendReward} />
           )})}
      </Card.Group>
    )
  }
}
export default CommentList
