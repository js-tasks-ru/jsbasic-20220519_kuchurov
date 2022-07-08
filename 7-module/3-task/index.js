import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps
    this.value = value
    //initialize
    this.init()
  }

  init() {
    this.#createSlider()
    this.#events()
  }

  #createSlider() {
    this.elem = createElement(`<div class="slider"></div>`)
    this.sliderThumb = createElement(`<div class="slider__thumb"></div>`)
    this.sliderValue = createElement(`<span class="slider__value">${this.value}</span>`)
    this.sliderProgress = createElement(`<div class="slider__progress"></div>`)
    this.sliderSteps = createElement(`<div class="slider__steps"></div>`)
    this.sliderThumb.append(this.sliderValue)
    this.elem.append(this.sliderThumb)
    this.elem.append(this.sliderProgress)
    // >>>>> adding Slides <<<<<
    for (let i = 0; i < this.steps; i++) {
      this.sliderSteps.insertAdjacentHTML('beforeend', '<span></span>')
    }
    this.sliderSteps.querySelector('span')?.classList.add('slider__step-active')
    this.elem.append(this.sliderSteps)
  }

  #events() {
    // >>>>> click <<<<<
    this.elem.addEventListener('click', (event) => {
      // +++++
      // this.setProgressX(event.offsetX)
      // +++++
      // -----
      let left = event.clientX - this.elem.getBoundingClientRect().left;
      this.setProgressX(left)
      // -----
    })
  }

  setProgressX(offset = 0) {
    // +++++
    // const stepLength = this.elem.offsetWidth / this.steps
    // const leftPercents = (offset / this.elem.offsetWidth * 100).toFixed()
    // this.sliderThumb.style.left = `${leftPercents}%`;
    // this.sliderProgress.style.width = `${leftPercents}%`;
    // this.setValue( Math.round(offset / stepLength) )
    // +++++

    // -----
    let left = offset;
    let leftRelative = left / this.elem.offsetWidth;

    if (leftRelative < 0) {
      leftRelative = 0;
    }

    if (leftRelative > 1) {
      leftRelative = 1;
    }

    let segments = this.steps - 1;
    let approximateValue = leftRelative * segments;
    let value = Math.round(approximateValue);

    let leftPercents = (100 / segments * value).toFixed();
    this.sliderThumb.style.left = `${leftPercents}%`;
    this.sliderProgress.style.width = `${leftPercents}%`;

    this.setValue(value)
    // -----
  }

  setActiveClass(step) {
    this.sliderSteps.querySelector('.slider__step-active')?.classList.remove('slider__step-active')
    this.sliderSteps.querySelector(`.slider__steps>span:nth-child(${step + 1})`)?.classList.add('slider__step-active')
  }

  setValue(newValue) {
    this.value = newValue
    this.sliderValue.innerHTML = newValue
    this.setActiveClass(newValue)
    this.elem.dispatchEvent(new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    }))
  }
}











