import { getUserInfo } from "../localStorage";

const Header = {
  render: () => {
    const { name } = getUserInfo();
    return `
      <div>
        <a href="/#/">jszomazona</a>
      </div>
      <div>
        ${name ? `<a href="/#/profile">${name}</a>` : `<a href="/#/signin">Giriş Yap</a>`}
        <a href="/#/cart">Sepet</a>
      </div>
    `
  },

  after_render: () => { }
}

export default Header;