import { signin } from "../api";

const SigninScreen = {
  after_render: () => {
    document.getElementById("signin-form")
    .addEventListener("submit", async (e)=> {
      e.preventDefault();
      const data = await signin({
        email: document.getElementById("email").value,
        password: document.getElementById("password").value
      });
      
      if(data.error) {
        console.log(data.error);
      } else {
        document.location.hash = "/";
      }
    })
  },
  render: ()=> {
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