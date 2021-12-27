const CheckoutSteps = {
  render: (props) => {
    return `
      <div class="checkout-steps">
        <div class="${props.step1 ? 'active' : ''}">Giriş yap</div>
        <div class="${props.step2 ? 'active' : ''}">Kargo Bilgileri</div>
        <div class="${props.step3 ? 'active' : ''}">Ödeme</div>
        <div class="${props.step4 ? 'active' : ''}">Siparişi Tamamla</div>
      </div>
    `
  }
}

export default CheckoutSteps;