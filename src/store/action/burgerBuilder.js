import axiosData from '../../axios-orders'
import * as actionTypes from '../action/types'

export const addIngredient = (name) => {  //go export it to index 
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName: name
    }
}

export const removeIngredient = (name) => {  //go export it to index
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName: name

    }
}

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients //comes from initIngredients after fetchData 

    }
}

export const errorFetch = () => {
    return {
        type: actionTypes.ERROR_FETCH
    }
}

export const initIngredients = () => {   //go export it to index
    return dispatch => {
        axiosData.get('https://burgerdatabase-4cbd2.firebaseio.com/Ingredients.json')
            .then(res => {
                dispatch(setIngredients(res.data))
            })
            .catch(
                error => {
                    dispatch(errorFetch(error))
                }
            )
    }
}