import { getUserInfo, getShipping, setShipping } from "../localStorage";
import CheeckoutSteps from "../components/CheckoutSteps";


const ShippingScreen = {
  after_render: () => {

    document.getElementById("shipping-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        setShipping({
          address: document.getElementById("address").value,
          city: document.getElementById("city").value,
          country: document.getElementById("country").value,
          postalCode: document.getElementById("postalCode").value,
        });
        document.location.hash = '/payment';
      });
  },
  render: () => {
    const { name } = getUserInfo();

    if (!name) {
      document.location.hash = "/";
    }

    const { address, city, postalCode, country } = getShipping();

    return `
    ${CheeckoutSteps.render({step1: true, step2: true})}
      <div class="form-container">
        <form id="shipping-form">
          <ul class="form-items">
            <li>
              <h1>Kargo Bilgileri</h1>
            </li>
            <li>
              <label for="address">Adres</label>
              <input type="text" name="address" id="address" placeholder="Adres" value="${address}" required>
            </li>
            <li>
              <label for="city">Şehir</label>
              <input type="text" name="city" id="city" placeholder="Şehir" value="${city}" required>
            </li>
            <li>
              <label for="postalCode">Posta Kodu</label>
              <input type="name" name="name" id="postalCode" placeholder="Posta Kodu" value="${postalCode}" required>
            </li>
            <li>
              <label for="country">Ülke</label>
              <input type="text" name="country" id="country" placeholder="Ülke" value="${country}" required>
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

export default ShippingScreen;