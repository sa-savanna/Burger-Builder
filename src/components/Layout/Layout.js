import React, { useState } from 'react'
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'
import Toolbar from '../Navigation/Toolbar'
import classes from "./Layout.module.css"



const Layout = props => {

    const [showDrawer, setshowDrawer] = useState(false)

    const toggleHandler = () => {
        setshowDrawer(!showDrawer)
    }

    return (
        <>
            <Toolbar click={toggleHandler} />
            <SideDrawer open={showDrawer} closed={toggleHandler} />
            <main className={classes.Content}>
                {props.children}
            </main>
        </>
    )
}

export default Layout
