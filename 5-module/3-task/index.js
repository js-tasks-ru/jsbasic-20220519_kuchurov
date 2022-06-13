function initCarousel() {
  const carousel = document.querySelector('.carousel')
  const prevClass = '.carousel__arrow_left'
  const nextClass = '.carousel__arrow_right'
  const prevButton = carousel.querySelector(prevClass)
  const nextButton = carousel.querySelector(nextClass)
  const carouselInner = carousel.querySelector('.carousel__inner')
  const widthSlide = carousel.querySelector('.carousel__slide').offsetWidth
  const totalSlides = carousel.querySelectorAll('.carousel__slide').length
  let activeSlide = 0

  carousel.addEventListener('click', (event) => {
    if ( event.target.closest(prevClass) ) prevSlide()
    if ( event.target.closest(nextClass) ) nextSlide()
  })

  function prevSlide() {
    setOffset(widthSlide * --activeSlide)
  }

  function nextSlide() {
    setOffset(widthSlide * ++activeSlide)
  }

  function setOffset(n = offsetInner) {
    carouselInner.style.transform = `translateX(-${n}px)`
    toggleButtons()
  }

  function toggleButtons() {
    prevButton.style.display = activeSlide < 1 ? 'none' : '';
    nextButton.style.display = activeSlide >= totalSlides - 1 ? 'none' : '';
  }

  toggleButtons()
}
