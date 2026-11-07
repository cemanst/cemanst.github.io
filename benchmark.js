const image = document.querySelector("#slide");
const previous = document.querySelector("#previous-slide");
const next = document.querySelector("#next-slide");
const number = document.querySelector("#slide-number");
const slideCount = 18;
let currentSlide = 1;

function showSlide(target) {
  if (target < 1 || target > slideCount) return;
  currentSlide = target;
  image.src = "assets/benchmark-slides/" + currentSlide + ".png";
  image.alt = "Robo Router benchmark presentation slide " + currentSlide;
  number.textContent = currentSlide + " / " + slideCount;
  previous.disabled = currentSlide === 1;
  next.disabled = currentSlide === slideCount;
}

previous.addEventListener("click", () => showSlide(currentSlide - 1));
next.addEventListener("click", () => showSlide(currentSlide + 1));
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") showSlide(currentSlide - 1);
  if (event.key === "ArrowRight") showSlide(currentSlide + 1);
});
