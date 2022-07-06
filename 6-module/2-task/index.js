import createElement from '../../assets/lib/create-element.js';

export default class ProductCard {

  constructor(product) {
    this.id = product.id
    this.name = product.name
    this.price = product.price
    this.image = product.image
    this.category = product.category
    this.elem = this.createCard()
  }

  createCard() {
    const card = this.#templateCard()
    const card__body = card.querySelector('.card__body')
    const button = this.#cardButton()
    card__body.insertAdjacentElement('beforeend', button)

    // CustomEvent
    button.addEventListener('click', () => {
      card.dispatchEvent(new CustomEvent('product-add', {
        detail: this.id,
        bubbles: true
      }))
    })

    return card
  }

  #templateCard() {
    return createElement(`
      <div class="card">
          <div class="card__top">
              <img src="/assets/images/products/${this.image}" class="card__image" alt="product">
              <span class="card__price">€${this.price.toFixed(2)}</span>
          </div>
          <div class="card__body">
              <div class="card__title">${this.name}</div>
          </div>
      </div>
    `)
  }

  #cardButton() {
    return createElement(`
      <button type="button" class="card__button">
          <img src="/assets/images/icons/plus-icon.svg" alt="icon">
      </button>
    `)
  }

}
