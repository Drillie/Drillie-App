const card = document.querySelector(".card__inner");
const cardFlip = document.querySelector(".flipCard");
const cardFlip2 = document.querySelector(".flipCard2");

cardFlip.addEventListener("click", function (e) {
  card.classList.toggle('is-flipped');
});

cardFlip2.addEventListener("click", function (e) {
    card.classList.toggle('is-flipped');
  });