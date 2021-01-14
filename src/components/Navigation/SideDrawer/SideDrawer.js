import React from 'react'
import BackDrop from '../../UI/BackDrop/BackDrop';
import NavigationItems from '../Items/NavigationItems'
import Logo from "../Logo"
import classes from './SideDrawer.module.css';

const SideDrawer = props => {
    
    let attachedClasses = [classes.SideDrawer, classes.Close]
    if (props.open) {
        attachedClasses = [classes.SideDrawer, classes.Open]
    }

    return (
        <>
            <BackDrop show={props.open} clicked={props.closed} />
            <div className={attachedClasses.join(' ')} onClick={props.closed} >
                <div className={classes.Logo}>
                    <Logo />
                </div>

                <nav>
                    <NavigationItems />
                </nav>
            </div>
        </>
    )
}


export default SideDrawer
