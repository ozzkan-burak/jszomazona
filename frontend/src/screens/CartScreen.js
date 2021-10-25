import { logPlugin } from "@babel/preset-env/lib/debug";
import { getProduct } from "../api";
import { getCartItems, setCartItems } from "../localStorage";
import { parseRequestUrl } from "../utils";

const addToCart = (item, forceUpdate = false) => {
  let cartItems = getCartItems();
  const existItem = cartItems.find(x => x.product === item.product)

  if(existItem) {
    cartItems = cartItems.map((x) => x.product === existItem.product ? item : x)
  } else {
    cartItems = [...cartItems, item]
  }

  setCartItems(cartItems)
};

const CartScreen = {
  after_render : () => {},
  render: async () => {
    const request = parseRequestUrl();

    if(request.id){
      const product = await getProduct(request.id);

      addToCart({
        product: product._id,
        name: product.name,
        image: product.image,
        price: product.price,
        countInStock: product.countInstock,
        qty:1,
      })
    }
    const cartItems = getCartItems()

    return `
      <div class="content cart">
        <div class="cart-list">
          <ul class="cart-list-container">
            <li>
              <h3>Alışveriş Sepeti</h3>
              <div>Fiyat</div>
              ${
                cartItems.length === 0 ? 
                '<div>Sepetiniz boş. <a herf="/#/">Alışveriş yap</a></div>' :
                cartItems.map(item => `
                  <li>
                    <div class="cart-image">
                      <img src="${item.image}" alt="${item.name}" />
                    </div>
                    <div class="cart-name">
                      <div>
                        <a href="/#/product/${item.product}">
                          ${item.name}
                        </a>
                      </div>
                      <div>
                        Adet: <select class="qty-select" id="${item.product}">
                       ${
                         [...Array(item.countInstock).keys()].map(x => console.log(item.countInstock))
                       }
                        </select>
                        <button type="button" class="delete-button" id="${item.product}">Sil</button>
                      </div>
                      </div>
                      <div class="cart-price">
                        ${item.price} TL
                    </div>
                  </li>
                `).join('\n')
              }
            </li>
          </ul>
        </div>
        <div class="cart-action">
            <h3>
              Toplam (${cartItems.reduce((a, c)=> a + c.qty, 0)} adet) ürün
              :
              ${cartItems.reduce((a, c)=> a + c.price * c.qty, 0)} TL
            </h3>
            <button id="checkout-button" class="primary fw">
              Ödemeye geç
            </button>
        </div>
      </div>
    `
  }
}

export default CartScreen;