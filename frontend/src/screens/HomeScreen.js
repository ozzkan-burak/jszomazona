import axios from "axios";

import Rating from "../components/Rating";

const HomeScreen = {
  render: async () => {
    const res = await axios({
      url: "http://localhost:5000/api/products",
      headers: {
        'Content-Type' : 'application/json',
      },
    });

    console.log(res.statusText);

    if(!res || res.statusText !== 'OK') {
      return `<div>Data alınırken hata oluştu</div>`;
    };

    const products = res.data;

    console.log(products)

    return `
      <ul class="product-list">
        ${products.map(product => `
          <li>
            <div class="product">
              <a href="/#/product/${product._id}">
                <img src=${product.image} alt=${product.name} />
              </a>
              <div class="product-name">
                <a href="/#/product/1">
                  ${product.name}
                </a>
              </div>
              <div class="product-rating">
                ${Rating.render({
                  value: product.rating,
                  text: `${product.numReviews} yorum`
                })}
              </div>
              <div class="product-brand">
               ${product.brand}
              </div>
              <div class="product-price">
                ${product.price}
              </div>
            </div>
          </li>
        `).join('\n')}
      </ul>
    `
  }
}
export default HomeScreen;