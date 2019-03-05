import React from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { Menu } from 'semantic-ui-react';

const MenuLink = ({to, label}) => (
    <Route path={to} exact={true} children={({match})=>(
        <Link to={to}><Menu.Item as='a' {...(match? {active: true}: {})}>{label}</Menu.Item></Link>
    )}/>
)

export default MenuLink;