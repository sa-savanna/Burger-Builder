import React from 'react'
import Button from '../../UI/Button/Button'
import Burger from '../Burger'
import classes from "./CheckoutSummary.module.css"


const CheckoutSummary = (props) => {
    return (
        <div className={classes.Checkout}>
            <h1>We hope you like it!</h1>
            <div style={{ width: "100%",  margin: "auto" }}>
                <Burger ingredients={props.ingredients} />
            </div>
            <Button btnType="Danger" clicked={props.checkoutCanceled}>CANCEL</Button>
            <Button btnType="Success" clicked={props.checkoutContinued}>CONTINUE</Button>
        </div>
    )
}

export default CheckoutSummary
