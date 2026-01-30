
const burger = document.querySelector('.navbar-burger');
const menu = document.querySelector('#navbarBasic');

burger.addEventListener('click', () => {
  burger.classList.toggle('is-active');
  menu.classList.toggle('is-active');
});

let body = document.getElementById("body");
let button = document.getElementById("changecolor");
let startButton = document.getElementById("start-button");
let darkMainColor = document.querySelectorAll(".dark-main");
let titles = document.querySelectorAll(".orange-text")
let subtitles = document.querySelectorAll(".white-text");
let bar = document.querySelectorAll(".bar");
let darkSecondaryColor = document.querySelectorAll(".dark-secondary");
let sectionTitle1 = document.getElementById("sectiontitle1");
let gameSectionSubtitle = document.getElementById("games-subtitle");
let card = document.querySelectorAll(".game-card");
let footer = document.getElementById("footer");

button.addEventListener("click", () => {

  const headerBg = getComputedStyle(header).backgroundColor;

  if (headerBg === "rgb(253, 185, 91)") {

    darkMainColor.forEach(darkMainColor => {
      darkMainColor.style.setProperty("background-color", "#323232", "important");
    });

    titles.forEach(titles => {
      titles.style.setProperty("color", "#FF7F00", "important");
    });

    subtitles.forEach(subtitles => {
      subtitles.style.setProperty("color", "white", "important");
    });

    bar.forEach(bar => {
      bar.style.setProperty("background-color", "#EA8B2C", "important");
    });

    header.style.setProperty("border-bottom", "6px solid #934A00", "important");

    startButton?.style.setProperty(
      "box-shadow",
      "0px 5px 8px #1e1e1e",
      "important"
    );

    darkSecondaryColor.forEach(darkSecondaryColor => {
      darkSecondaryColor.style.setProperty("background-color", "#4B4B4B", "important");
    });

    card.forEach(card => {
      card.style.setProperty("background-color", "#FDB95B", "important");
    });

    footer.style.setProperty("background-color", "#FF7F00", "important");

  }

  else if (headerBg === "rgb(50, 50, 50)") {

    darkMainColor.forEach(darkMainColor => {
      darkMainColor.style.removeProperty("background-color");
    });

    titles.forEach(titles => {
      titles.style.removeProperty("color");
    });

    subtitles.forEach(subtitles => {
      subtitles.style.removeProperty("color");
    });

    bar.forEach(bar => {
      bar.style.removeProperty("background-color");
    });

    header.style.removeProperty("border-bottom");

    startButton?.style.removeProperty("box-shadow");

    darkSecondaryColor.forEach(darkSecondaryColor => {
      darkSecondaryColor.style.removeProperty("background-color");
    });

    card.forEach(card => {
      card.style.removeProperty("background-color");
    });

    footer.style.removeProperty("background-color");

  }

});