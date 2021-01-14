import React from 'react'
import classes from './Burger.module.css'
import Ingredient from './ingredients/Ingredient'


const Burger = (props) => {

    let transformedIngredients = Object.keys(props.ingredients) //to transform object to array
        .map(igKey => {
            return [...Array(props.ingredients[igKey])] //[salad, bacon,cheese, meat]
                .map((_, i) => {
                    return <Ingredient key={igKey + i} type={igKey} />  //igKey = salad, i = 1 (2) quantity
                })
        })
        //we need one container where to store these values [salad, bacon,cheese, meat]. 
        //.reduce transorms an array into something else 

        .reduce((arr, el) => {  //arr - previous arr, el - current value, [] - initial value
            return arr.concat(el)  //take the looping el and add it to arr
        }, [])
    //easier alternative
    /*
         const transformedIngredients = []
 
        for (let ingName in props.ingredients) {
            transformedIngredients.push({
            name: ingName,
            amount: props.ingredients[ingName]
    })
} 
    */

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients!</p>
    }
    // console.log(transformedIngredients);


    return (
        <div className={classes.Burger}>
            <Ingredient type="bread-top" />
            { transformedIngredients}
            <Ingredient type="bread-bottom" />
        </div>
    )
}


export default Burger
