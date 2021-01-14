import React, { useEffect, useState } from 'react'
import Burger from '../../components/Burger/Burger'
import Controls from '../../components/Burger/Controls/Controls'
import OrderSummary from '../../components/Burger/Order/OrderSummary'
import Modal from '../../components/UI/Modal/Modal'
import axiosData from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import errorHandler from '../../components/UI/ErrorHandle/errorHandler'

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.9,
    meat: 1.6,
    bacon: 1.2
}

const BurgerBuilder = (props) => {

    const [price, setPrice] = useState(0)
    const [purchasable, setPurchasable] = useState(false)
    const [buying, setBuying] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(false)

    // const [ingredients, setIngredients] = useState({
    //     salad: 0,
    //     bacon: 0,
    //     cheese: 0,
    //     meat: 0
    // })
    const [ingredients, setIngredients] = useState(null)

    useEffect(() => {
        // console.log(props);
        axiosData.get('/Ingredients.json')
            .then(res => {
                console.log(res.data);
                setIngredients(res.data)
            })
            .catch(error => setError(true))
    }, [])


    const updatePurchasState = (ingredients) => {

        //we need translate amounts of ingredients into array of strings and count them
        const sum = Object.keys(ingredients)
            .map(ingKey => {
                return ingredients[ingKey] //salad[1]
            })
            .reduce((sum, el) => {
                return sum + el //el = number of ingredients[ingKey]; sum = current sum; return sum = final result
            }, 0)

        sum > 0 && setPurchasable(true)
    }

    const addIngredientHandler = (type) => {
        const oldCount = ingredients[type]

        const updateCounted = oldCount + 1

        const updateIngredients = {
            ...ingredients
        }
        updateIngredients[type] = updateCounted;
        const priceAddition = INGREDIENT_PRICES[type]
        setIngredients(updateIngredients)

        const oldPrice = price;
        const newPrice = oldPrice + priceAddition
        setPrice(newPrice)
        updatePurchasState(updateIngredients)
    }

    const removeIngredientHandlet = (type) => {
        const oldCount = ingredients[type]

        if (oldCount <= 0) {
            return;
        }
        const updateCounted = oldCount - 1

        const updateIngredients = {
            ...ingredients
        }
        updateIngredients[type] = updateCounted;
        const priceDeduction = INGREDIENT_PRICES[type]
        setIngredients(updateIngredients)

        const oldPrice = price;
        const newPrice = oldPrice - priceDeduction
        setPrice(newPrice)

    }

    const disabledInfo = { ...ingredients }
    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0 //salad[1] <= 0 (true or false)
    }

    const purchaseHandler = () => {
        setBuying(true)
    }

    const closeHandler = () => {
        setBuying(false)
    }

    const purchaseContinue = () => {

        //alert('You continue!')

        // setLoading(true)
        // const order = {
        //     ingredients,
        //     price,
        //     customer: {
        //         name: "Juan Carlos",
        //         address: {
        //             street: "Avril",
        //             building: '5',
        //             zipCode: '1699',
        //             country: "Akuna Matata"
        //         },
        //         email: "giraffe@gmail.com"
        //     },
        //     deliveryMethod: 'fastest'
        // }

        // axiosData.post('/orders.json', order)
        //     .then(response => {
        //         setBuying(false) //if false then the modal closes, if true - it stays
        //         setLoading(false)
        //     })

        //     .catch(error => {
        //         setBuying(false)
        //         setLoading(false)
        //     })

        const queryParams = [];
        for (let i in ingredients) {
            queryParams.push(encodeURIComponent(i) + "=" + encodeURIComponent(ingredients[i]));
        }
        queryParams.push('price=' + price )
        const queryString = queryParams.join('&');
        props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    let orderSummary = null;
    let burger = error ? <p>Ingredients can't be found</p> : <Spinner />
    if (ingredients) {
        burger = (
            <>
                <Burger ingredients={ingredients} />
                <Controls
                    ingAdded={addIngredientHandler}
                    ingRemoved={removeIngredientHandlet}
                    disabled={disabledInfo}
                    purchasable={purchasable}
                    price={price}
                    ordered={purchaseHandler} />
            </>
        )
        orderSummary = (
            <OrderSummary
                ingredients={ingredients}
                price={price}
                purchaseCanselled={closeHandler}
                purchaseContinue={purchaseContinue}
            />
        )
    }

    return (
        <>
            <Modal show={buying} ModalClosed={closeHandler}>
                {
                    loading ? <Spinner /> : orderSummary

                }
            </Modal>
            {burger}
        </>
    )
}

// export default BurgerBuilder
export default errorHandler(BurgerBuilder, axiosData)
