import { data } from "./data.js";
// slider
const slider = document.getElementById("slider");
const slidesWrap = document.getElementById("slides");
const slides = document.querySelectorAll(".slider__item");
const prevButton = document.querySelector(".prev-button");
const nextButton = document.querySelector(".next-button");

const slideWidth = slides[0].offsetWidth;
const firstSlidePos = slides[0].offsetLeft + slides[0].offsetWidth;
const secondSlidePos = slides[1].offsetLeft;
const gap = firstSlidePos - secondSlidePos;
const slideOffset = slideWidth - gap;

slidesWrap.style.transform = 0;

const slidesPerView = 8;
let index = 0;
const maxIndex = slides.length - slidesPerView;
const sliderTiming = {
  duration: 700,
  iterations: 1,
  fill: "both",
};

prevButton.addEventListener("click", showPrevSlide);
nextButton.addEventListener("click", showNextSlide);

const enableButton = el => {
  el.classList.remove("button--disabled");
};

const disableButton = el => {
  el.classList.add("button--disabled");
};

function showPrevSlide() {
  if (index) {
    slidesWrap.animate(
      [
        { transform: `translateX(${-slideOffset * index}px)` },
        { transform: `translateX(${-slideOffset * index + slideOffset}px)` },
      ],
      sliderTiming,
    );
    index -= 1;

    if (!index) {
      disableButton(prevButton);
    }
  }
  if (index !== maxIndex) {
    enableButton(nextButton);
  }
}

function showNextSlide() {
  if (index !== maxIndex) {
    slidesWrap.animate(
      [
        { transform: `translateX(${-slideOffset * index}px)` },
        { transform: `translateX(${-(slideOffset * index + slideOffset)}px)` },
      ],
      sliderTiming,
    );
    index += 1;

    if (index === maxIndex) {
      disableButton(nextButton);
    }
  }
  if (index !== 0) {
    enableButton(prevButton);
  }
}

// popup
const popupTiming = {
  duration: 500,
  iterations: 1,
  easing: "ease-in-out",
};
const ratingButton = document.getElementById("rating-button");
const closeRatingButton = document.getElementById("close-rating-button");
const overlay = document.getElementById("overlay");
const ratingPopup = document.getElementById("rating-popup");
const ratingTable = document.getElementById("rating-table");

const renderRatingTableRow = (index, avatar, name, lastName, rating, nameCellClass) => {
  const row = document.createElement("div");
  row.classList.add("popup-content__row", "popup-row");
  console.log("className", nameCellClass);

  const rowContent = `
    <p class="popup-row__text">${index}</p>
    <img src="/src/assets/img/${avatar}"
      alt="Аватар ${name}" class="popup-row__img"/>
    <p class=${nameCellClass}>${name} ${lastName}</p>
    <p class="popup-row__text">${rating}</p>
  `;

  row.innerHTML = rowContent;
  return row;
};

const renderRatingRows = () => {
  data.rating.map(item => {
    const isFriend = data.friends.some(friend => friend.id === item.id);
    const className = isFriend ? "popup-row__text--highlighted" : "popup-row__text";
    const row = renderRatingTableRow(
      item.id,
      item.img,
      item.name,
      item.lastName,
      item.points,
      className,
    );
    ratingTable.append(row);
  });
};

const animatePopup = options => {
  ratingPopup.animate(
    [
      { transform: "translateY(-100%)", opacity: 0 },
      { transform: "translateY(0)", opacity: 1 },
    ],
    options,
  );
};

const openPopup = () => {
  overlay.classList.add("overlay--visible");
  renderRatingRows();
  animatePopup(popupTiming);
};

const closePopup = () => {
  animatePopup({ ...popupTiming, direction: "reverse" });
  setTimeout(() => {
    overlay.classList.remove("overlay--visible");
  }, 400);
};

ratingButton.addEventListener("click", () => {
  openPopup();
});

closeRatingButton.addEventListener("click", () => {
  closePopup();
});
