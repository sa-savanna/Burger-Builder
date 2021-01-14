import React from 'react'
import Button from '../../UI/Button/Button'



const OrderSummary = (props) => {

    const ingredientSummary = Object.keys(props.ingredients) //to get the key instead of value 'salad: 0'
        .map(ingKey => {
            return (
                <li key={ingKey}>
                    <span style={{ textTransform: 'capitalize' }}>{ingKey}</span>: {props.ingredients[ingKey]}
                </li>)
        })

    return (
        <>
            <h3>Your Order</h3>
            <p>A delicious burger with the following ingredients: </p>
            <ul>
                {ingredientSummary}
            </ul>
            <p> <strong> Total price: {props.price.toFixed(2)} Euro</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType='Danger' clicked={props.purchaseCanselled}>CANCEL</Button>
            <Button btnType='Success' clicked={props.purchaseContinue}>CONTINUE</Button>
        </>
    )
}

export default OrderSummary
