import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories
    this.prevSelector = '.ribbon__arrow_left'
    this.nextSelector = '.ribbon__arrow_right'
    this.visibleClass = 'ribbon__arrow_visible'
    this.itemSelector = '.ribbon__item'
    this.activeClass = 'ribbon__item_active'
    this.itemWidth = 350
    this.value = ''
    //initialize
    this.init()
  }

  init() {
    this.#createMenu()
    this.events()
  }

  events() {
    // >>>>> click <<<<<
    this.elem.addEventListener('click', (event) => {
      if ( event.target.closest(this.prevSelector) ) this.ribbonInner.scrollBy(-this.itemWidth, 0)
      if ( event.target.closest(this.nextSelector) ) this.ribbonInner.scrollBy(this.itemWidth, 0)
      if ( event.target.closest(this.itemSelector) ) {
        event.preventDefault()

        this.elem.querySelector('.ribbon__item_active')?.classList.remove('ribbon__item_active')
        event.target.classList.add('ribbon__item_active')

        this.elem.dispatchEvent(new CustomEvent('ribbon-select', {
          detail: event.target.getAttribute('data-id'),
          bubbles: true
        }))
      }
    })

    // >>>>> scroll <<<<<
    this.ribbonInner.addEventListener('scroll', (event) => {
      let scrollWidth = this.ribbonInner.scrollWidth
      let scrollLeft = this.ribbonInner.scrollLeft
      let clientWidth = this.ribbonInner.clientWidth
      let scrollRight = scrollWidth - scrollLeft - clientWidth

      if ( scrollLeft <= 0 ) this.buttonLeft.classList.remove(this.visibleClass)
      if ( scrollLeft >= this.itemWidth ) this.buttonLeft.classList.add(this.visibleClass)

      if ( scrollRight <= 0 ) this.buttonRight.classList.remove(this.visibleClass)
      if ( scrollRight >= this.itemWidth ) this.buttonRight.classList.add(this.visibleClass)
    })
  }

  #createMenu() {
    this.elem = createElement(`<div class="ribbon"></div>`)
    this.ribbonInner = createElement(`<div class="ribbon__inner"></div>`)

    // >>>>> adding Links <<<<<
    this.categories.forEach((link) => {
      this.ribbonInner.insertAdjacentElement('beforeend', this.#createLink(link))
    })
    this.ribbonInner.querySelector('.ribbon__item:first-child').classList.add('ribbon__item_active')
    this.elem.append(this.ribbonInner)

    // >>>>> adding Arrows <<<<<
    this.buttonLeft = this.#createButton('ribbon__arrow_left')
    this.buttonRight = this.#createButton('ribbon__arrow_right ribbon__arrow_visible')
    this.elem.insertAdjacentElement('afterbegin', this.buttonLeft)
    this.elem.insertAdjacentElement('beforeend', this.buttonRight)
  }

  #createLink(item) {
    return createElement(`<a href="#" class="ribbon__item" data-id="${item.id}">${item.name}</a>`)
  }

  #createButton(classNames) {
    return createElement(`
      <button class="ribbon__arrow ${classNames}">
        <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    `)
  }
}
