import CheckoutSteps from "../components/CheckoutSteps";
import { getCartItems, getPayment, getShipping } from "../localStorage";

const convertCartToOrder = (cartItems) => {
  const orderItems = getCartItems();

  if (orderItems.length === 0) {
    document.location.href = "/cart";
  }

  const shipping = getShipping();
  if (!shipping.address) {
    document.location.href = "/shipping";
  }

  const payment = getPayment();
  if (!payment.paymentMethod) {
    document.location.href = "/payment";
  }

  const itemsPrice = orderItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const shippingPrice = itemsPrice > 100 ? 0 : 10;
  const taxPrice = Math.round(0.18 * itemsPrice * 100) / 100;
  const totalPrice = itemsPrice + shippingPrice + taxPrice;

  return {
    orderItems,
    shipping,
    payment,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
  }

};

const PlaceOrderScreen = {
  after_render: () => { },
  render: () => {
    const {
      orderItems,
      shipping,
      payment,
      itemsPrice,
      shippingPrice,
      taxPrice,
      totalPrice,
    } = convertCartToOrder();


    return `
    <div>
      ${CheckoutSteps.render({
      step1: true,
      step2: true,
      step3: true,
      step4: true,
    })}
      <div class="order">
        <h2>Shipping</h2>
        <div class="order-info">
          <div>
            ${shipping.address}, ${shipping.city}, ${shipping.postalCode},
            ${shipping.country}
          </div>
        </div>
        <div>
          <h2>Payment</h2>
          <div>
            Payment Method: ${payment.paymentMethod}
          </div>
        </div>
        <div>
          <ul>
            <li class=""cart-list-container>
              <h2>Shopping Cart</h2>
              <div>Price</div>
            </li>
            ${orderItems.map((item) => `
              <li>
                <div class="cart-image">
                  <img src="${item.imageUrl}" alt=${item.name} />
                </div>
                <div class="cart-item">
                  <div>
                    <a href="/product/${item.productId}">${item.name}</a>
                  </div>
                  <div>Qty: ${item.qty}</div>
                </div>
                <div class="cart-price">${item.price} TL</div> 
              </li>
              `
    )
      }
          </ul>
        </div>

      <div class="order-action">
        <ul>
          <li>
            <h2>Order Summary</h2>
          </li>
          <li><div>Items</div><div>${itemsPrice} TL</div></li>
          <li><div>Shipping</div><div>${shippingPrice} TL</div></li>
          <li><div>Tax</div><div>${taxPrice} TL</div></li>
          <li><div>OrderTotal</div><div>${totalPrice} TL</div></li>
          <li><button class="primary fw">Place Order</button></li>
        </ul>
      </div>
    </div>
    </div>
  `;
  },
};

export default PlaceOrderScreen;