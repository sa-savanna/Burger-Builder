import React, { lazy, Suspense } from 'react'
import Layout from './components/Layout/Layout'
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder'
// import Checkout from './containers/Checkout/Checkout'
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import Orders from './containers/Orders/Orders';

const asyncCheckout = lazy(() => {
  return import('./containers/Checkout/Checkout')
})
const asyncOrders = lazy(() => {
  return import('./containers/Orders/Orders')
})


const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Layout>
          <Switch>
            <Route exact path="/" component={BurgerBuilder} />
            <Suspense fallback={<div>Loading...</div>}>
              <Route path="/checkout" component={asyncCheckout} />
              <Route path="/orders" component={asyncOrders} />
            </Suspense>
            {/* <Route exact path="/"><BurgerBuilder /> </Route> */}
            {/* <Route path="/checkout" ><Checkout /> </Route> */}
          </Switch>
        </Layout>
      </div>
    </BrowserRouter>
  )
}

export default App
