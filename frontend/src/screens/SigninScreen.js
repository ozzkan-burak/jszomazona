const SigninScreen = {
  after_render: () => {},
  render: ()=> {
    return `
      <div class="form-container">
        <form id="signin-form">
          <ul class="form-items">
            <li>
              <h1>Sign-in</h1>
            </li>
            <li>
              <label for="email">Email</label>
              <input type="email" name="email" id="email" placeholder="Email" required>
            </li>
            <li>
              <label for="password">Şifre</label>
              <input type="password" name="password" id="password" placeholder="şifre" required>
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