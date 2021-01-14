import React from 'react'
import classes from "./CheckoutSummary.module.css"


const Order = ({ ingredients, price }) => {
    const ingredientss = []

    for (let ingName in ingredients) {
        ingredientss.push({
            name: ingName,
            amount: ingredients[ingName]
        })
    }

    const ingOutput = ingredientss.map(ig => {
        return <span
            key={ig.name}
            style={{
                textTransform: 'capitalize',
                display: 'inline-block',
                margin: '0 8px',
                border: '1px solid #ccc',
                padding: '5px'
            }}
        >{ig.name}({ig.amount})</span>
    })

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingOutput} </p>
            <p>Price: <strong>€ {price.toFixed(2)}</strong> </p>
        </div>
    )
}

export default Order
