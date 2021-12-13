import { register } from "../api";
import { getUserInfo, setUserInfo } from "../localStorage";
import { hideLoading, showLoading, showMessage } from "../utils";


const RegisterScreen = {
  after_render: () => {
    document.getElementById("register-form")
    .addEventListener("submit", async (e)=> {
      e.preventDefault();
      showLoading();
      const data = await register({
        name: document.getElementById("name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
      });
      hideLoading();
      if(data.error) {
        showMessage(data.error);
      } else {
        setUserInfo(data);
        document.location.hash = "/";
      }
    })
  },
  render: ()=> {

    if(getUserInfo().name){
      document.location.hash = "/";
    }

    return `
      <div class="form-container">
        <form id="register-form">
          <ul class="form-items">
            <li>
              <h1>Üye Ol</h1>
            </li>
            <li>
              <label for="email">Email</label>
              <input type="email" name="email" id="email" placeholder="Email" required>
            </li>
            <li>
              <label for="name">İsim</label>
              <input type="name" name="name" id="name" placeholder="İsim" required>
            </li>
            <li>
              <label for="password">Şifre</label>
              <input type="password" name="password" id="password" placeholder="" required>
            </li>
            <li>
              <label for="repassword">Şifre Tekrar</label>
              <input type="password" name="repassword" id="repassword" placeholder="" required>
            </li>
            <li>
              <button type="submit" class="primary">Gönder</button>
            </li>
            <li>
              <div class="isMember-container">
                Üye misin? <a class="isMember" href="/#/signin">Üye girişi</a>
              </div>
            </li>
          </ul>
        </form>
      </div>
    `
  }
}

export default RegisterScreen;