import React, { useEffect, useState } from 'react'
import CheckoutSummary from '../../components/Burger/Order/CheckoutSummary'
import { Route } from 'react-router-dom';
import ContactData from './ContactData';


const Checkout = (props) => {
    const [ingredients, setIngredients] = useState('')
    // const [ingredients, setIngredients] = useState({})
    const [totalPrice, setTotalPrice] = useState(0)

    useEffect(() => {
        const query = new URLSearchParams(props.location.search);
        // console.log(query);
        const ingredientss = {};
        let price = 0
        for (let param of query.entries()) {
            //['salad', '1']
            if (param[0] === 'price') {
                price = param[1]
            } else {
                ingredientss[param[0]] = +param[1];
            }
        }
        console.log(ingredientss);
        setIngredients(ingredientss)
        setTotalPrice(price)

    }, [setIngredients, setTotalPrice, props.location.search])


    const checkoutCanceled = () => {
        props.history.goBack()
    }
    const checkoutContinued = () => {
        props.history.replace('/checkout/contact-data')
    }


    return (
        <div>
            <CheckoutSummary
                ingredients={ingredients}
                checkoutCanceled={checkoutCanceled}
                checkoutContinued={checkoutContinued}
            />
            <Route path={props.match.path + '/contact-data'} render={(props) =>
                (<ContactData ingredients={ingredients} price={totalPrice} {...props} />)} />
        </div>
    )
}

export default Checkout
