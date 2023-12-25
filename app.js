const container = document.querySelector(".container");
const slide = document.querySelector(".slides");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

let slideInterval = 3000;
let slideId;

let slides = document.querySelectorAll(".slide");
let index = 1;

const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

firstClone.id = "first-clone";
lastClone.id = "last-clone";

slide.append(firstClone);
slide.prepend(lastClone);

let slideWidth = (slides[0].getBoundingClientRect().width);

console.log(slideWidth)

slide.style.transform = `translateX(-${slideWidth * index}px)`;


const getSlides = () => document.querySelectorAll(".slide");

const startSlide = () => {
  slideWidth = (slides[0].getBoundingClientRect().width);
  slideId = setInterval(function () {
    moveToNextSlide();
  }, slideInterval);
};

const moveToNextSlide = () => {
  index++;
  slide.style.transform = `translateX(-${slideWidth * index}px)`;
  slide.style.transition = "0.8s";
};

const moveToPreviousSlide = () => {
  index--;
  slide.style.transform = `translateX(-${slideWidth * index}px)`;
  slide.style.transition = "0.8s";
};

slide.addEventListener("transitionend", () => {
  slides = getSlides();
  slideWidth = (slides[0].getBoundingClientRect().width);
  if (slides[index].id === firstClone.id) {
    index = 1;
    slide.style.transition = "none";
    slide.style.transform = `translateX(-${slideWidth * index}px)`;
  }

  if (slides[index].id === lastClone.id) {
    index = slides.length - 2;
    slide.style.transition = "none";
    slide.style.transform = `translateX(-${slideWidth * index}px)`;
  }
});

container.addEventListener("mouseenter", () => {
  clearInterval(slideId);
});

container.addEventListener("mouseleave", startSlide);

nextBtn.addEventListener("click", () => {
  slides = getSlides();
  if (index >= slides.length - 1) return;
  slideWidth = (slides[0].getBoundingClientRect().width);
  moveToNextSlide();
});

prevBtn.addEventListener("click", () => {
  slides = getSlides();
  slideWidth = (slides[0].getBoundingClientRect().width);
  if (index <= 0) return;
  moveToPreviousSlide();
});

startSlide();
