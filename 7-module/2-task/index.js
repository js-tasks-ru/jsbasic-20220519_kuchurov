import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.keyDownHandler = this.onKeyDown.bind(this)
    this.clickHandler = this.onClick.bind(this)
    this.createModal()
  }

  open() {
    document.body.append(this.elem)
    document.body.classList.add('is-modal-open')
    document.addEventListener('keydown', this.keyDownHandler)
    this.buttonClose.addEventListener('click', this.clickHandler)
  }

  close() {
    document.removeEventListener('keydown', this.keyDownHandler)
    this.buttonClose.removeEventListener('click', this.clickHandler)
    document.body.classList.remove('is-modal-open')
    this.elem.remove()
  }

  onClick(event) {
    event.preventDefault()
    this.close()
  }

  onKeyDown(event) {
    event.preventDefault()
    if (event.code === 'Escape') this.close()
  }

  setTitle(title) {
    this.modalTitle.innerHTML = title
  }

  setBody(body) {
    this.modalBody.innerHTML = ''
    this.modalBody.append(body)
  }

  createModal() {
    this.elem = createElement(`
      <div class="modal">
        <div class="modal__overlay"></div>
        <div class="modal__inner">
          <div class="modal__header"></div>
        </div>
      </div>
    `)

    let modalInner = this.elem.querySelector('.modal__inner')
    let modalHeader = this.elem.querySelector('.modal__header')

    // >>>>> Button Close <<<<<
    this.buttonClose = this.#createButtonClose()
    modalHeader.append(this.buttonClose)

    // >>>>> Modal Title <<<<<
    this.modalTitle = createElement(`<h3 class="modal__title"></h3>`)
    modalHeader.append(this.modalTitle)

    // >>>>> Modal Body <<<<<
    this.modalBody = createElement(`<div class="modal__body"></div>`)
    modalInner.append(this.modalBody)
  }

  #createButtonClose() {
    return createElement(`
      <button type="button" class="modal__close">
        <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
      </button>
    `)
  }
}
