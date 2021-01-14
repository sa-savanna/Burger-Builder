import React from 'react'
import { NavLink } from 'react-router-dom';
import classes from './NavigationItems.module.css';


const NavigationItem = props => {
    return (
        <li >
            <NavLink
                to={props.link}
                exact={props.exact}
                activeClassName={classes.active}
            >
                {props.children}
            </NavLink>

        </li>
    )
}

export default NavigationItem
