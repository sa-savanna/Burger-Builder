import React from 'react'
import classes from "./DrawerToggle.module.css"


const DrawerToggle = props => {
    return (
        <div onClick={props.click} className={classes.Menu}></div>
    )
}


export default DrawerToggle
