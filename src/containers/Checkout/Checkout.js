import React from 'react'
import CheckoutSummary from '../../components/Burger/Order/CheckoutSummary'
import { Route, Redirect } from 'react-router-dom';
import ContactData from './ContactData';
import { connect } from "react-redux";


const Checkout = (props) => {

   
    const checkoutCanceled = () => {
        props.history.goBack()
    }
    const checkoutContinued = () => {
        props.history.replace('/checkout/contact-data')
    }

    let summary = <Redirect to="/" />
    if (props.ings) {
        const purchaseRedirect = props.purchased && <Redirect to="/" />

        summary = (
            <div>
                {purchaseRedirect}
                <CheckoutSummary
                    ingredients={props.ings}
                    checkoutCanceled={checkoutCanceled}
                    checkoutContinued={checkoutContinued}
                />
                <Route
                    path={props.match.path + '/contact-data'}
                    component={ContactData}
                />
            </div>

        )
    }
    return summary


}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.orders.purchased
    }
}

export default connect(mapStateToProps)(Checkout)
