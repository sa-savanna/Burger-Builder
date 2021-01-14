import React, { useEffect } from 'react'
import Order from '../../components/Burger/Order/Order'
import axiosData from '../../axios-orders'
import errorHandler from '../../components/UI/ErrorHandle/errorHandler'
import { fetchOrders } from "../../store/action/index";
import { connect } from "react-redux";
import Spinner from '../../components/UI/Spinner/Spinner';

const Orders = (props) => {
    const { onFetchOrders } = props

    useEffect(() => {
        onFetchOrders()
    }, [onFetchOrders])

    let listOrders = <Spinner />

    if (!props.loading) {
        listOrders = (
            props.orders.map(order => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={+order.price}
                />
            ))
        )
    }

    return <div>{listOrders}</div>

}

const mapStateToProps = state => {
    return {
        orders: state.orders.orders, //orders => rootReducer(index.js) and orders => initialState
        loading: state.orders.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(fetchOrders()),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(Orders, axiosData))
