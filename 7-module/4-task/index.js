import createElement from '../../assets/lib/create-element.js';

export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps
    this.value = value
    this.onPointerDown = this.pointerDownHandler.bind(this)
    this.onPointerMove = this.pointerMoveHandler.bind(this)
    this.onPointerUp = this.pointerUpHandler.bind(this)
    //initialize
    this.init()
  }

  get segmentWidth() {
    return this.elem.offsetWidth / (this.steps - 1)
  }

  init() {
    this.#createSlider()
    this.progressMovePercents(100 / (this.steps - 1) * this.value)
    this.setActiveSegment(this.value)
    this.#events()
  }

  #createSlider() {
    this.elem = createElement(`<div class="slider"></div>`)

    this.sliderThumb = createElement(`<div class="slider__thumb"></div>`)
    this.sliderValue = createElement(`<span class="slider__value">${this.value}</span>`)
    this.sliderThumb.append(this.sliderValue)
    this.elem.append(this.sliderThumb)

    this.sliderProgress = createElement(`<div class="slider__progress"></div>`)
    this.sliderSteps = createElement(`<div class="slider__steps">${"<span></span>".repeat(this.steps)}</div>`)
    this.elem.append(this.sliderProgress)
    this.elem.append(this.sliderSteps)
  }

  #events() {
    // >>>>> click <<<<<
    this.elem.onclick = (e) => this.clickHandler(e)
    // >>>>> pointer <<<<<
    this.sliderThumb.ondragstart = () => false
    this.sliderThumb.addEventListener('pointerdown', this.onPointerDown)
  }


  // >>>>> pointer Down <<<<<
  pointerDownHandler(event) {
    event.preventDefault()
    this.selectedValue = this.value
    // this.sliderThumb.setPointerCapture(event.pointerId)
    this.sliderThumb.addEventListener('pointermove', this.onPointerMove)
    this.sliderThumb.addEventListener('pointerup', this.onPointerUp)
    this.elem.classList.add('slider_dragging')
  }

  // >>>>> pointer Move <<<<<
  pointerMoveHandler(event) {
    event.preventDefault()
    this.selectedValue = this.getValue(event.clientX)
    this.displayValue(this.selectedValue)
    this.setActiveSegment(this.selectedValue)
    this.progressMovePercents(this.pxToPercents( this.calcLeftRelative(event.clientX) ))
    this.elem.dispatchEvent(new CustomEvent('slider-move', {
      detail: this.value,
      bubbles: true
    }))
  }

  // >>>>> pointer Up <<<<<
  pointerUpHandler(event) {
    event.preventDefault()
    this.elem.classList.remove('slider_dragging')
    this.setValue(this.selectedValue)
    this.sliderThumb.removeEventListener('pointermove', this.onPointerMove)
    this.sliderThumb.removeEventListener('pointerup', this.onPointerUp)
  }

  clickHandler(event) {
    event.preventDefault()
    if ( event.target.closest('.slider__thumb') ) return
    this.setValue(this.getValue(event.clientX))
  }

  progressMovePercents(leftPercents) {
    this.sliderThumb.style.left = `${leftPercents}%`
    this.sliderProgress.style.width = `${leftPercents}%`
  }

  pxToPercents(leftPx) {
    return (leftPx / this.elem.offsetWidth * 100).toFixed()
  }

  calcLeftRelative(eventClientX) {
    let left = eventClientX - this.elem.getBoundingClientRect().left
    if (left < 0) left = 0
    let right = this.elem.offsetWidth
    if (left > right) left = right
    return left
  }

  setActiveSegment(step) {
    this.elem.querySelector('.slider__step-active')?.classList.remove('slider__step-active')
    this.sliderSteps.children[step].classList.add("slider__step-active")
  }

  displayValue(newValue) {
    this.sliderValue.innerHTML = newValue
  }

  getValue(eventClientX) {
    const stepLength = this.elem.offsetWidth / (this.steps - 1)
    return Math.round(this.calcLeftRelative(eventClientX) / stepLength)
  }

  setValue(newValue) {
    // if(newValue == this.value) return
    this.progressMovePercents((100 / (this.steps - 1) * newValue).toFixed())
    this.setActiveSegment(newValue)
    this.sliderValue.innerHTML = newValue
    this.value = newValue
    this.elem.dispatchEvent(new CustomEvent('slider-change', {
      detail: this.value,
      bubbles: true
    }))
  }
}
