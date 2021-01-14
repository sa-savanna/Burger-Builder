import React from 'react'
import NavigationItems from './Items/NavigationItems'
import Logo from './Logo'
import DrawerToggle from './SideDrawer/DrawerToggle'
import classes from "./Toolbar.module.css"


const Toolbar = (props) => {
    return (
        <header className={classes.Toolbar}>
            <DrawerToggle click={props.click}/>
            <Logo height="80%" />
            <nav className={classes.DisplayOnly}>
                <NavigationItems />
            </nav>
        </header>
    )
}

export default Toolbar
