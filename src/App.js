import {Component} from 'react'
import {Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  //   TODO: Add your code for remove all cart items, increment cart item quantity, decrement cart item quantity, remove cart item

  removeCartItem = unique => {
    this.setState(prev => {
      const removedArr = prev.cartList.filter(each => {
        if (each.id !== unique) {
          return each
        }
        return null
      })
      return {cartList: removedArr}
    })
  }

  increment = title => {
    this.setState(prev => {
      const incrementArr = prev.cartList.map(each => {
        if (each.id === title) {
          return {...each, quantity: each.quantity + 1}
        }
        return each
      })
      return {cartList: incrementArr}
    })
  }

  addCartItem = product => {
    this.setState(prevState => {
      const obj = prevState.cartList.find(each => {
        if (each.id === product.id) {
          return each
        }
        return null
      })
      if (obj === undefined) {
        return {cartList: [...prevState.cartList, product]}
      }
      const cartArr = prevState.cartList.map(each => {
        if (each.title === product.title) {
          return {...each, quantity: each.quantity + product.quantity}
        }
        return each
      })
      return {cartList: cartArr}
    })
    //   TODO: Update the code here to implement addCartItem
  }

  decrement = title => {
    this.setState(prev => {
      const decrementArr = prev.cartList.map(each => {
        if (each.id === title) {
          if (each.quantity === 1) {
            return null
          }
          return {...each, quantity: each.quantity - 1}
        }
        return each
      })
      const resultDecArr = decrementArr.filter(each => {
        if (each !== null) {
          return each
        }
        return null
      })
      return {cartList: resultDecArr}
    })
  }

  clearCart = () => this.setState({cartList: []})

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.increment,
          decrementCartItemQuantity: this.decrement,
          removeAllCartItems: this.clearCart,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/products" component={Products} />
          <ProtectedRoute
            exact
            path="/products/:id"
            component={ProductItemDetails}
          />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App
