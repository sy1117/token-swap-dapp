import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Image, List, Menu } from 'semantic-ui-react';

class UserList extends React.Component{
  constructor(){
    super()
  }
  handleChange(e){
  }

  render(){
    let { onClick , data } = this.props;
    let userSample = [
            {name :'Tom', description:'Top Contributor', image:'https://react.semantic-ui.com/images/avatar/small/jenny.jpg'},
            {name :'Tom', description:'Top Contributor', image:'https://react.semantic-ui.com/images/avatar/small/jenny.jpg'},
            {name :'Tom', description:'Top Contributor', image:'https://react.semantic-ui.com/images/avatar/small/jenny.jpg'}
          ];

    data = data ? data:userSample;
    let listItems =  data.map(val=>(
      <List.Item 
            style={{cursor: 'pointer'}} 
            relaxed='very'
            onClick={onClick} id={val.address}>
        <Image avatar src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg' />
        <List.Content>
          <List.Header as='a'>{val.name}</List.Header>
          {val.company}
        </List.Content>
      </List.Item>
    ))
  
    return (
    <List horizontal onItemClick={onClick}>
      {listItems}
    </List>
    );
  }
}

export default UserList;