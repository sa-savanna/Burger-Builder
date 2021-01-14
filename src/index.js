import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import burgerReducer from './store/reducer/burgerReducer';
import thunk from "redux-thunk";
import orderReducer from "./store/reducer/order"

const composeEnhancers = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose; //add this line to navigate in Chrome extension

const rootReducer = combineReducers({
  burgerBuilder: burgerReducer, //go to BurgerBuilder and change mapStateToProps ings: state.ingredients to ings: state.burgerBuilder.ingredients 
  orders: orderReducer //go to ContactData and change mapStateToProps to loading: state.orders.loading
})

const store = createStore(rootReducer, composeEnhancers(
  applyMiddleware(thunk)
))


ReactDOM.render(

  < Provider store={store} >
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider >,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
