import { signin } from "../api";
import { getUserInfo, setUserInfo } from "../localStorage";
import { hideLoading, showLoading, showMessage } from "../utils";


const SigninScreen = {
  after_render: () => {
    document.getElementById("signin-form")
    .addEventListener("submit", async (e)=> {
      e.preventDefault();
      showLoading();
      const data = await signin({
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
        <form id="signin-form">
          <ul class="form-items">
            <li>
              <h1>Giriş Yap</h1>
            </li>
            <li>
              <label for="email">Email</label>
              <input type="email" name="email" id="email" placeholder="Email" required>
            </li>
            <li>
              <label for="password">Şifre</label>
              <input type="password" name="password" id="password" placeholder="" required>
            </li>
            <li>
              <button type="submit" class="primary">Giriş Yap</button>
            </li>
            <li>
              <div>
                Kayıtlı değil misin? <a href="/#/signup">Kayıt ol</a>
              </div>
            </li>
          </ul>
        </form>
      </div>
    `
  }
}

export default SigninScreen;