import { hideLoading, parseRequestUrl, showLoading } from '../utils';
import { getProduct } from '../api';
import Rating from '../components/Rating';




const ProductScreen = {

  after_render: () => {

    document.getElementById('add-button').addEventListener('click', ()=> {
      const request = parseRequestUrl();
      console.log(request.id)
     
      document.location.hash= `/cart/${request.id}`;
    });
  },
  render: async () => {
    const request = parseRequestUrl();
    showLoading();
    const product = await getProduct(request.id);

    if (product.error) {
      return (`<div class="test">${product.error}</div>`)
    }
    hideLoading();
    return `
      <div class="content">
        <div class="back-to-result">
          <a href="/#/">Back to result</a>
        </div>
        <div class="details">
          <div class="details-image">
            <img src="${product.image}" alt="${product.name}" />
          </div>
          <div class="details-info">
            <ul>
              <li>
                <h1>${product.name}</h1>
              </li>
              <li>
                ${Rating.render({ value: product.rating, text: `${product.numReviews} reviews` })}
              </li>
              <li>
                Price: <stron>$ ${product.price}</stron>
              </li>
              <li>
                Decription: 
                <div>
                  ${product.description}
                </div>
              </li>
            </ul>
          </div>
          <div class="details-action">
            <ul>
              <li>
                Price: $ ${product.price} 
              </li>
              <li>
                Status:
                  ${product.countInstock > 0 ? `<span class="success">In Stock</span>` : `<span class="error">Unavailable</span>`}
              </li>
              <li>
                <button id="add-button" class="${product.countInstock === 0 ? "disabled" : ""} fw primary">${product.countInstock > 0 ? "Add to Cart" : "Out of Stock"}</button>
              </li>
            </ul>
          </div>
        </div>
      </div>
      `
  },
};

export default ProductScreen;