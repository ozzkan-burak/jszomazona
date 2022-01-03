import { getUserInfo, getPayment, setPayment } from "../localStorage";
import CheeckoutSteps from "../components/CheckoutSteps";


const PaymentScreen = {
  after_render: () => {

    document.getElementById("Payment-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
        setPayment({
          paymentMethod
        });
        document.location.hash = '/placeorder';
      });
  },
  render: () => {
    const { name } = getUserInfo();

    if (!name) {
      document.location.hash = "/";
    }

    return `
    ${CheeckoutSteps.render({ step1: true, step2: true, step3: true })}
      <div class="form-container">
        <form id="Payment-form">
          <ul class="form-items">
            <li>
              <h1>Payment</h1>
            </li>
            <li>
              <div>
                <input type="radio" name="payment-method" value="paypal" id="paypal" checked>
                <label for="paypal">Paypal</label>
              </div>
            </li>
            <li>
              <div>
                <input type="radio" name="payment-method" value="stripe" id="stripe" >
                <label for="stripe">Stripe</label>
              </div>
            </li>
            <li>
            <button type="submit" class="primary">Sonraki</button>
          </li>
          </ul>
        </form>
      </div>
    `
  }
}

export default PaymentScreen;