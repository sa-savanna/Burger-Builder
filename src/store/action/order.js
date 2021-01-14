import * as actionTypes from "./types"
import axiosData from '../../axios-orders'


export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData
    }
}

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error
    }
}

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger = (orderData) => { //go export it to index
    return dispatch => {
        dispatch(purchaseBurgerStart())
        axiosData.post('/orders.json', orderData)
            .then(res => {
                console.log(res.data);
                dispatch(purchaseBurgerSuccess(res.data.name, orderData))
            })
            .catch(error => {
                dispatch(purchaseBurgerFail(error))
            })
    }
}

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT //go export it to index
    }
}


export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS, 
        orders: orders
    }
}

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL, 
        error: error
    }
}

export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS 
    }
}


export const fetchOrders = () => { //go export it to index
    return dispatch => {
        dispatch(fetchOrderStart());
        axiosData.get( '/orders.json' )
            .then( res => {
                const fetchedOrders = [];
                for ( let key in res.data ) {
                    fetchedOrders.push( {
                        ...res.data[key],
                        id: key
                    } );
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
            } )
            .catch( err => {
                dispatch(fetchOrdersFail(err));
            } );
    };
};