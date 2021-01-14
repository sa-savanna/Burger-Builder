import React, { useCallback, useEffect, useState } from 'react'
import Burger from '../../components/Burger/Burger'
import Controls from '../../components/Burger/Controls/Controls'
import OrderSummary from '../../components/Burger/Order/OrderSummary'
import Modal from '../../components/UI/Modal/Modal'
import axiosData from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import errorHandler from '../../components/UI/ErrorHandle/errorHandler'
import { addIngredient, removeIngredient, initIngredients, purchaseInit } from '../../store/action/index'
import { useDispatch, useSelector } from "react-redux";



const BurgerBuilder = (props) => {

    const [pusrchasing, setPurchasing] = useState(false)

    const dispatch = useDispatch()

    const ings = useSelector(state => {
        return state.burgerBuilder.ingredients
    })
    const price = useSelector(state => {
        return state.burgerBuilder.totalPrice
    })
    const error = useSelector(state => {
        return state.burgerBuilder.error //from reducer initial state
    })

    const onIngredientAdded = (ingName) => dispatch(addIngredient(ingName))
    const onIngredientRemoved = (ingName) => dispatch(removeIngredient(ingName))
    const onInitIngredients = useCallback(() => dispatch(initIngredients()), [dispatch]) //cash the value and not recreating when it doesn't change all the time
    const onInitPurchase = () => dispatch(purchaseInit())

    useEffect(() => {
        onInitIngredients()
    }, [onInitIngredients])


    const updatePurchasState = (ingredients) => {

        //we need translate amounts of ingredients into array of strings and count them
        const sum = Object.keys(ingredients)
            .map(ingKey => {
                return ingredients[ingKey] //salad[1]
            })
            .reduce((sum, el) => {
                return sum + el //el = number of ingredients[ingKey]; sum = current sum; return sum = final result
            }, 0)

        return sum > 0
    }


    const disabledInfo = { ...ings }
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0 //salad[1] <= 0 (true or false)
    }

    const purchaseHandler = () => {
        setPurchasing(true)
    }

    const closeHandler = () => {
        setPurchasing(false)
    }

    const purchaseContinue = () => {
        onInitPurchase()
        props.history.push('/checkout');
    }

    let orderSummary = null;
    let burger = error ? <p>Ingredients can't be found</p> : <Spinner />

    if (ings) {

        burger = (
            <>
                <Burger ingredients={ings} />
                <Controls
                    ingAdded={onIngredientAdded}
                    ingRemoved={onIngredientRemoved}
                    disabled={disabledInfo}
                    purchasable={updatePurchasState(ings)}
                    price={price}
                    ordered={purchaseHandler} />
            </>
        )
        orderSummary = (
            <OrderSummary
                ingredients={ings}
                price={price}
                purchaseCanselled={closeHandler}
                purchaseContinue={purchaseContinue}
            />
        )
    }

    return (
        <>
            <Modal show={pusrchasing} ModalClosed={closeHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </>
    )
}


export default errorHandler(BurgerBuilder, axiosData)
