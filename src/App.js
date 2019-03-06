import React, { Component, createContext } from "react";
import { DrizzleProvider } from "drizzle-react";
import { LoadingContainer } from "drizzle-react-components";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import {
	Button,
	Container,
	Divider,
	Grid,
	Header,
	Icon,
	Image,
	List,
	Menu,
	Responsive,
	Segment,
	Sidebar,
	Visibility,
} from 'semantic-ui-react'
import "./App.css";

import drizzleOptions from "./drizzleOptions";
import MyContainer from "./containers/MyContainer";
import RequestContainer from "./containers/RequestContainer";
import MyPage from './containers/RespondentContainer';
import MenuLink from './components/MenuLinkComponent';

// const Context = createContext(); // Context 를 만듭니다.
const getWidth = () => {
	const isSSR = typeof window === 'undefined';

	return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth
}

class App extends Component {
  constructor() {
		super();
		this.state = {};
	}

  render() {
    const { children } = this.props
		const { fixed } = this.state

    return (
      <DrizzleProvider options={drizzleOptions}>
        <LoadingContainer>
          {/* <MyContainer/>		 */}
          <Router>
              <Responsive 	
                getWidth={getWidth}
                minWidth={Responsive.onlyTablet.minWidth}
                >
                <Visibility
                  once={false}
                  onBottomPassed={this.showFixedMenu}
                  onBottomPassedReverse={this.hideFixedMenu}
                >
                 <Segment
                    inverted
                    textAlign='center'
                    // style={{ minHeight: 400, padding: '1em 0em' }}
                    vertical
                  >
                    <Menu
                      fixed={fixed ? 'top' : null}
                      inverted={!fixed}
                      pointing={!fixed}
                      secondary={!fixed}
                      size='large'
                    >
                      <Container>
                        <MenuLink to="/" label="RefenceCheck"/>
                        {/* <MenuLink to="/request" label="Requests"/>
                        <MenuLink to="/myPage" label="MyPage"/> */}
                        <Menu.Item position='right'>
                        </Menu.Item> 
                      </Container>
                    </Menu>         
                  </Segment>
                </Visibility>

                <Route exact path="/" component={MyContainer} />
                <Route exact path="/request" component={RequestContainer} />
                <Route exact path="/mypage" component={MyPage} />
              </Responsive>
            </Router>
        </LoadingContainer>
      </DrizzleProvider>
    );
  }
}

export default App;