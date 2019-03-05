import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Button, Card, Icon, Rating, Label } from 'semantic-ui-react'

class Comment extends React.Component{

render(){
  let {data} = this.props;
  console.log(data);
  data = data? data : {name:'unknown', address:"", rating:"",content:""}
return(
  <Card>
    <Card.Content>
      <Card.Header>
        {data.name}
        <Label style={{marginLeft:'1em'}} color='olive' horizontal>
          Answered
        </Label>
        <Label style={{marginLeft:'1em'}} color='yellow' horizontal>
          {/* Waiting... */}
        </Label>
        <Label style={{marginLeft:'1em'}} color='blue' horizontal>
          {/* Rewarding */}
        </Label>
      </Card.Header>
      <Card.Meta>
        Co-Worker
      </Card.Meta>
      <Card.Description>
        {data.content}
      </Card.Description>
    </Card.Content>
    <Card.Content extra>
      <Card.Header>
        Tech
      </Card.Header>
      <Rating icon='star' rating={data.rating} maxRating={5} disabled/>
      {/* <Card.Description>
        Matthew is a pianist living in Nashville.
      </Card.Description> */}
    </Card.Content>
    <Card.Content extra>
      <Card.Header>
        Communication
      </Card.Header>
      <Rating icon='star' rating={data.rating} maxRating={5} />
      <Card.Description>
        {/* Matthew is a pianist living in Nashville. */}
      </Card.Description>
    </Card.Content>
    <Card.Content>
      <Button color='pink' icon fluid>
        <Icon name='heart'/> Rewards
      </Button>
    </Card.Content>
  </Card>
);
}
}
export default Comment
