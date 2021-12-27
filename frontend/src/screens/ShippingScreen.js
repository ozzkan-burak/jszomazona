import { update } from "../api";
import { getUserInfo, setUserInfo, clearUser, getShipping } from "../localStorage";
import { hideLoading, showLoading, showMessage } from "../utils";


const ShippingScreen = {
  after_render: () => {
    document.getElementById('signout-button').addEventListener('click', () => {
      clearUser();
      document.location.hash = '/';
    });
    document.getElementById("profile-form")
      .addEventListener("submit", async (e) => {
        e.preventDefault();
        showLoading();
        const data = await update({
          name: document.getElementById("name").value,
          email: document.getElementById("email").value,
          password: document.getElementById("password").value
        });
        hideLoading();
        if (data.error) {
          showMessage(data.error);
        } else {
          setUserInfo(data);
          document.location.hash = "/";
        }
      })
  },
  render: () => {

    const { name, email } = getUserInfo();

    if (!name) {
      document.location.hash = "/";
    }

    const { adress, city, postalCode, country } = getShipping();

    return `
      <div class="form-container">
        <form id="shipping-form">
          <ul class="form-items">
            <li>
              <h1>Profil</h1>
            </li>
            <li>
              <label for="email">Email</label>
              <input type="email" name="email" id="email" placeholder="Email" value="${email}" required>
            </li>
            <li>
              <label for="name">İsim</label>
              <input type="name" name="name" id="name" placeholder="İsim" value="${name}" required>
            </li>
            <li>
              <label for="password">Şifre</label>
              <input type="password" name="password" id="password" placeholder="" required>
            </li>
            <li>
              <button type="submit" class="primary">Güncelle</button>
            </li>
            <li>
            <button type="button" id="signout-button" class="primary">Çıkış yap</button>
          </li>
          </ul>
        </form>
      </div>
    `
  }
}

export default ShippingScreen;