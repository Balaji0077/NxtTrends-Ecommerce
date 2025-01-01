// Write your code here
import CartContext from '../../context/CartContext'
import './index.css'

const CartSummary = () => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value

      const priceTotalArray = cartList.map(each => each.price * each.quantity)
      const priceTotal = priceTotalArray.reduce(
        (price1, price2) => price1 + price2,
      )
      return (
        <div className="cart-summary-component">
          <div className="cart-summary-container">
            <div className="order-rupees-container">
              <h1 className="order-total-text">Order Total: </h1>
              <h1 className="order-rupees"> Rs {priceTotal} /-</h1>
            </div>
            <p className="no-of-items-text">{cartList.length} items in Cart</p>
            <button type="button" className="cart-summary-btn">
              Checkout
            </button>
          </div>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default CartSummary
