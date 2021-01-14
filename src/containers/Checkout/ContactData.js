import React, { useState } from 'react'
import Button from '../../components/UI/Button/Button'
import classes from './ContactData.module.css'
import axiosData from '../../axios-orders'
import Spinner from '../../components/UI/Spinner/Spinner'
import Input from '../../components/UI/Input/Input'
import { connect } from "react-redux";
import errorHandler from '../../components/UI/ErrorHandle/errorHandler'
import { purchaseBurger } from "../../store/action/index";


const ContactData = (props) => {
    const [state, setState] = useState({
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP Code'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 6
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-Mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [
                        { value: 'fastest', displayValue: 'Fastest' },
                        { value: 'cheapest', displayValue: 'Cheapest' }
                    ]
                },
                value: 'fastest',
                validation: {},
                valid: true,
            }
        },

        formIsValid: false
    })

    const orderHandler = (e) => {
        e.preventDefault();
        console.log(props.ings);


        const formData = {};
        for (let el in state.orderForm) {
            formData[el] = state.orderForm[el].value //value = name, email ...
        }
        const order = {
            ingredients: props.ings,
            price: props.price,
            orderData: formData
        }
        props.onOrderBurger(order)


    }

    const checkValidity = (value, rules) => {
        let isValid = true

        if (rules.required) {
            isValid = value.trim() !== '' && isValid
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }
        if (rules.isEmail) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test(value) && isValid
        }


        return isValid
    }

    const inputChangeHandler = (e, inputIndetifier) => {
        // console.log(e.target.value);
        
        const updateOrderForm = {
            ...state.orderForm
        } //create a copy of all object

        const updatedFormElement = {
            ...updateOrderForm[inputIndetifier]
        } //here we get into one item of an object, here we need a value = '' (to het deeper, we need to create a clone (...) again)
        updatedFormElement.value = e.target.value
        updatedFormElement.valid = checkValidity(updatedFormElement.value, updatedFormElement.validation)
        updatedFormElement.touched = true;
        updateOrderForm[inputIndetifier] = updatedFormElement

        let formIsValid = true
        for (let inputId in updateOrderForm) {
            formIsValid = updateOrderForm[inputId].valid && formIsValid
        }
        setState({ orderForm: updateOrderForm, formIsValid: formIsValid })
    }

    const formElementArray = [];
    for (let key in state.orderForm) {
        formElementArray.push({
            id: key,
            config: state.orderForm[key]
        })
    }


    let form = (
        <form onSubmit={orderHandler} >
            { formElementArray.map(el => (
                <Input
                    key={el.id}
                    elementType={el.config.elementType}
                    elementConfig={el.config.elementConfig}
                    value={el.config.value}
                    invalid={!el.config.valid}
                    touched={el.config.touched}
                    shouldValidate={el.config.validation}
                    changed={(e) => inputChangeHandler(e, el.id)}
                />
            ))}
            <Button btnType="Success" disabled={!state.formIsValid} >ORDER</Button>
        </form>
    )

    props.loading && (form = <Spinner />)

    return (
        <div className={classes.ContactData}>
            <h4>Enter your contact data</h4>
            {form}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.orders.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData) => dispatch(purchaseBurger(orderData)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(errorHandler(ContactData, axiosData))
