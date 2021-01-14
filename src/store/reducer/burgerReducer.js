import * as actionTypes from '../action/types'


const initialState = {
    ingredients: null,
    totalPrice: 0,
    error: false
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.9,
    meat: 1.6,
    bacon: 1.2
}

const burgerReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.ADD_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] + 1 //new salad: 1 ..... action.ingredientName see: mapDispatchToProps
                },
                totalPrice: +(state.totalPrice + INGREDIENT_PRICES[action.ingredientName]).toFixed(2)
            }

        case actionTypes.REMOVE_INGREDIENT:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1 //new salad: 0
                },
                totalPrice: state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
            }
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: action.ingredients, //BurgerBuilder.action => function setIngredients
                //to reorder the ingredients list we need to hardcore
                //salad: action.ingredients.salad,
                //bacon: action.ingredients.bacon
                error: false,
                totalPrice: initialState.totalPrice
            }

        case actionTypes.ERROR_FETCH:
            return {
                ...state,
                error: true
            }
        default:
            return state
    }
}

export default burgerReducer