import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides
    this.totalSlides = slides.length
    this.prevClass = '.carousel__arrow_left'
    this.nextClass = '.carousel__arrow_right'
    this.buttonClass = '.carousel__button'
    this.activeSlide = 0
    this.widthSlide = 0
    //initialize
    this.init()
  }

  init() {
    this.elem = this.#createCarousel()
    this.#toggleButtons()
    this.#events()
  }

  prevSlide() {
    this.setOffset(--this.activeSlide)
  }

  nextSlide() {
    this.setOffset(++this.activeSlide)
  }

  setOffset(n = this.activeSlide) {
    this.widthSlide = this.elem.offsetWidth
    this.slideContainer.style.transform = `translateX(-${this.widthSlide * n}px)`
    this.#toggleButtons()
  }

  #events() {
    // >>>>> click <<<<<
    this.elem.addEventListener('click', (event) => {
      if ( event.target.closest(this.prevClass) ) this.prevSlide()
      if ( event.target.closest(this.nextClass) ) this.nextSlide()
      if ( event.target.closest(this.buttonClass) ) {
        this.elem.dispatchEvent(new CustomEvent('product-add', {
          detail: event.target.closest('.carousel__slide').getAttribute('data-id'),
          bubbles: true
        }))
      }
    })
    // >>>>> resize <<<<<
    let delayedWidth
    window.addEventListener('resize', (event) => {
        clearTimeout(delayedWidth)
        delayedWidth = this.#setSlideWidthDelayed()
    }, true)
  }

  #setSlideWidthDelayed() {
    return setTimeout(() => this.setOffset(), 1000)
  }

  #createCarousel() {
    const carousel = createElement(`
      <div class="carousel">
        <div class="carousel__arrow carousel__arrow_right">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </div>
        <div class="carousel__arrow carousel__arrow_left">
          <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
        </div>
        <div class="carousel__inner"></div>
      </div>
    `)
    this.slideContainer = carousel.querySelector('.carousel__inner')
    this.prevButton = carousel.querySelector(this.prevClass)
    this.nextButton = carousel.querySelector(this.nextClass)

    // >>>>> adding Slides <<<<<
    this.slides.forEach((slide) => {
      this.slideContainer.insertAdjacentElement('beforeend', this.#createSlide(slide))
    })

    return carousel
  }

  #createSlide(item) {
    return createElement(`
      <div class="carousel__slide" data-id="${item.id}">
        <img src="/assets/images/carousel/${item.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
          <span class="carousel__price">€${item.price.toFixed(2)}</span>
          <div class="carousel__title">${item.name}</div>
          <button type="button" class="carousel__button">
            <img src="/assets/images/icons/plus-icon.svg" alt="icon">
          </button>
        </div>
      </div>
    `)
  }

  #toggleButtons() {
    this.prevButton.style.display = this.activeSlide < 1 ? 'none' : '';
    this.nextButton.style.display = this.activeSlide >= this.totalSlides - 1 ? 'none' : '';
  }
}
