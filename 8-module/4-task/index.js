import createElement from '../../assets/lib/create-element.js';
import escapeHtml from '../../assets/lib/escape-html.js';

import Modal from '../../7-module/2-task/index.js';

export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;

    this.addEventListeners();
  }

  addProduct(product) {
    if (!product) return
    let cartItem = this.cartItems.find(item => item.product.id == product.id);
    if (cartItem) {
      cartItem.count++
    } else {
      cartItem = { count: 1 }
      cartItem.product = product
      this.cartItems.push(cartItem)
    }
    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    let cartIndex = 0
    let cartItem = this.cartItems.find((item, index) => {
      cartIndex = index
      return item.product.id == productId
    })
    if (!cartItem) return
    cartItem.count = cartItem.count + amount
    if ( cartItem.count <= 0 ) this.cartItems.splice(cartIndex, 1);
    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return !Boolean(this.cartItems.length)
  }

  getTotalCount() {
    return this.cartItems.reduce((count, item) => count + item.count, 0)
  }

  getTotalPrice() {
    return this.cartItems.reduce((total, item) => total + (item.product.price * item.count), 0)
  }

  renderProduct(product, count) {
    return createElement(`
    <div class="cart-product" data-product-id="${
      product.id
    }">
      <div class="cart-product__img">
        <img src="/assets/images/products/${product.image}" alt="product">
      </div>
      <div class="cart-product__info">
        <div class="cart-product__title">${escapeHtml(product.name)}</div>
        <div class="cart-product__price-wrap">
          <div class="cart-counter">
            <button type="button" class="cart-counter__button cart-counter__button_minus">
              <img src="/assets/images/icons/square-minus-icon.svg" alt="minus">
            </button>
            <span class="cart-counter__count">${count}</span>
            <button type="button" class="cart-counter__button cart-counter__button_plus">
              <img src="/assets/images/icons/square-plus-icon.svg" alt="plus">
            </button>
          </div>
          <div class="cart-product__price">€${product.price.toFixed(2)}</div>
        </div>
      </div>
    </div>`);
  }

  renderOrderForm() {
    return createElement(`<form class="cart-form">
      <h5 class="cart-form__title">Delivery</h5>
      <div class="cart-form__group cart-form__group_row">
        <input name="name" type="text" class="cart-form__input" placeholder="Name" required value="Santa Claus">
        <input name="email" type="email" class="cart-form__input" placeholder="Email" required value="john@gmail.com">
        <input name="tel" type="tel" class="cart-form__input" placeholder="Phone" required value="+1234567">
      </div>
      <div class="cart-form__group">
        <input name="address" type="text" class="cart-form__input" placeholder="Address" required value="North, Lapland, Snow Home">
      </div>
      <div class="cart-buttons">
        <div class="cart-buttons__buttons btn-group">
          <div class="cart-buttons__info">
            <span class="cart-buttons__info-text">total</span>
            <span class="cart-buttons__info-price">€${this.getTotalPrice().toFixed(
              2
            )}</span>
          </div>
          <button type="submit" class="cart-buttons__button btn-group__button button">order</button>
        </div>
      </div>
    </form>`);
  }

  renderModal() {

    // >>>>> Modal: Body <<<<<
    let content = createElement('<div></div>')
    this.cartItems.forEach(item => content.append(this.renderProduct(item.product, item.count)))
    content.append(this.renderOrderForm())

    // >>>>> Modal <<<<<
    this.modal = new Modal();
    this.modal.setTitle('Your order');
    this.modal.setBody(content);
    this.modal.open();

    // >>>>> Modal: Events <<<<<
    this.modal.elem.addEventListener('click', (event) => {
      let target = event.target
      let button = target.closest('.cart-counter__button')
      if (button) {
        let productCart = button.closest('[data-product-id]')
        let productId = productCart.getAttribute('data-product-id')
        let productAmount = button.classList.contains('cart-counter__button_minus') ? -1 : 1;
        this.updateProductCount(productId, productAmount)
      }
    })

    document.querySelector('.cart-form').addEventListener('submit', event => this.onSubmit(event))
  }

  onProductUpdate(cartItem) {
    if(!cartItem) return
    this.cartIcon.update(this);

    if (!document.body.classList.contains('is-modal-open')) return

    let productId = cartItem.product.id
    let modalBody = document.querySelector('.modal__body')
    let infoPrice = modalBody.querySelector(`.cart-buttons__info-price`)
    let productItem = modalBody.querySelector(`[data-product-id="${productId}"]`)
    let productCount = productItem.querySelector(`.cart-counter__count`)
    let productPrice = productItem.querySelector(`.cart-product__price`)

    productCount.innerHTML = cartItem.count
    productPrice.innerHTML = `€${(cartItem.count * cartItem.product.price).toFixed(2)}`
    infoPrice.innerHTML = `€${this.getTotalPrice().toFixed(2)}`

    if (cartItem.count < 1) productItem.remove()

    if(!modalBody.querySelector('.cart-product')) this.modal.close()
  }

  onSubmit(event) {
    event.preventDefault()

    let form = event.target
    let button = form.querySelector('[type="submit"]')

    button.classList.add('is-loading')

    fetch('https://httpbin.org/post', {method: 'POST', body: new FormData(form)})
      .then()
      .then(result => {
        this.cartItems = []
        this.modal.setTitle('Success!')
        this.modal.setBody(createElement(`
          <div class="modal__body-inner">
            <p>
              Order successful! Your order is being cooked :) <br>
              We’ll notify you about delivery time shortly.<br>
              <img src="/assets/images/delivery.gif">
            </p>
          </div>
        `))
      })
      .catch(error => console.log('Load failed: ', error))
  }

  addEventListeners() {
    this.cartIcon.elem.onclick = () => this.renderModal();
  }
}

