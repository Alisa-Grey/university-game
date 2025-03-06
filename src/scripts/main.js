const slider = document.getElementById('slider');
const slidesWrap = document.getElementById('slides');
const slides = document.querySelectorAll('.slider__item');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');

const slideWidth = slides[0].offsetWidth;
const firstSlidePos = slides[0].offsetLeft + slides[0].offsetWidth;
const secondSlidePos = slides[1].offsetLeft;
const gap = firstSlidePos - secondSlidePos;
const slideOffset = slideWidth - gap;

slidesWrap.style.transform = 0;

const slidesPerView = 8;
let index = 0;
const maxIndex = slides.length - slidesPerView
const timing = {
  duration: 700,
  iterations: 1,
  fill: 'both'
}

prevButton.addEventListener('click', showPrevSlide);
nextButton.addEventListener('click', showNextSlide);

const enableButton = (el) => {
  el.classList.remove('disable')
}

const disableButton = (el) => {
  el.classList.add('disable')
}

function showPrevSlide() {
  if (index) {
    slidesWrap.animate(
      [
        {transform: `translateX(${-slideOffset*index}px)`},
        {transform: `translateX(${-slideOffset*index + slideOffset}px)`},
      ],
      timing
    );
    index -= 1;

    if (!index) {
      disableButton(prevButton)
    }
  }
  if (index !== maxIndex) {
    enableButton(nextButton)
  }
}

function showNextSlide() {
  if (index !== maxIndex) {
    slidesWrap.animate(
      [
        {transform: `translateX(${-slideOffset*index}px)`},
        {transform: `translateX(${-(slideOffset*index + slideOffset)}px)`},
      ],
      timing
    );
    index += 1;

    if (index === maxIndex) {
      disableButton(nextButton)
    }
  }
  if (index !== 0) {
    enableButton(prevButton)
  }
}
