import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
    // >>>>> Carousel <<<<<
    let carousel = new Carousel(slides)
    const carouselContainer = document.body.querySelector('[data-carousel-holder]')
    carouselContainer.append(carousel.elem)

    // >>>>> RibbonMenu <<<<<
    this.ribbonMenu = new RibbonMenu(categories)
    const ribbonMenuContainer = document.body.querySelector('[data-ribbon-holder]')
    ribbonMenuContainer.append(this.ribbonMenu.elem)

    // >>>>> StepSlider <<<<<
    this.stepSlider = new StepSlider({steps: 5, value: 3})
    const stepSliderContainer = document.body.querySelector('[data-slider-holder]')
    stepSliderContainer.append(this.stepSlider.elem)

    // >>>>> CartIcon <<<<<
    this.cartIcon = new CartIcon()
    const cartIconContainer = document.body.querySelector('[data-cart-icon-holder]')
    cartIconContainer.append(this.cartIcon.elem)
    // Cart
    this.cart = new Cart(this.cartIcon)
  }

  async render() {
    let products = await fetch('products.json').then(response => response.json())

    // >>>>> ProductsGrid <<<<<
    this.productsGrid = new ProductsGrid(products)
    let productsGridContainer = document.body.querySelector('[data-products-grid-holder]')
    productsGridContainer.innerHTML = ''
    productsGridContainer.append(this.productsGrid.elem)

    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value
    })

    // >>>>> Events <<<<<
    // checkbox: Nuts
    const nutsCheckbox = document.getElementById('nuts-checkbox')
    nutsCheckbox.addEventListener('change', (event) => this.productsGrid.updateFilter({
      noNuts: nutsCheckbox.checked
    }))

    // checkbox: Vegans
    const veganCheckbox = document.getElementById('vegeterian-checkbox')
    veganCheckbox.addEventListener('change', (event) => this.productsGrid.updateFilter({
      vegeterianOnly: veganCheckbox.checked
    }))

    // slider
    this.stepSlider.elem.addEventListener('slider-change', (event) => this.productsGrid.updateFilter({
      maxSpiciness: event.detail
    }))

    // ribbon
    this.ribbonMenu.elem.addEventListener('ribbon-select', (event) => this.productsGrid.updateFilter({
      category: event.detail
    }))

    // product
    document.body.addEventListener('product-add', (event) => {
      let product = products.find(item => item.id == event.detail)
      if(product) this.cart.addProduct(product)
    })
  }
}
