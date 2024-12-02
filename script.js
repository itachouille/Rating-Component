const stars = document.querySelectorAll(".rating-star");
const replayButton = document.querySelector(".replay-btn");
const historyCard = document.getElementById("history-list");

let lastRatingIndex = null;

const starDefault = "./assets/star.png";
const starPrevious = "./assets/star_full.png";
const starHover = "./assets/star_hover.png";
const starActive = "./assets/star_selected.png";
const starUnselected = "./assets/star_not_selected.png";

function addStar() {
  stars.forEach((star, index) => {
    star.addEventListener("mouseover", () => {
      if (lastRatingIndex === null) {
        stars.forEach((s, i) => {
          if (i < index) {
            s.src = starPrevious;
          } else if (i === index) {
            s.src = starHover;
          } else {
            s.src = starDefault;
          }
        });
      }
    });

    star.addEventListener("mouseout", () => {
      if (lastRatingIndex === null) {
        stars.forEach((s) => (s.src = starDefault));
      }
    });

    star.addEventListener("click", () => {
      if (lastRatingIndex === null) {
        stars.forEach((innerStar, i) => {
          if (i <= index) {
            innerStar.src = starActive;
          } else {
            innerStar.src = starUnselected;
          }
        });
        const rating = index + 1;
        lastRatingIndex = saveToHistory(rating);
      }
    });
  });
}

function resetLastRating() {
  replayButton.addEventListener("click", () => {
    if (lastRatingIndex !== null) {
      let history = JSON.parse(localStorage.getItem("history")) || [];
      if (history.length > lastRatingIndex) {
        history.splice(lastRatingIndex, 1);
        localStorage.setItem("history", JSON.stringify(history));
        displayHistory(history);
        lastRatingIndex = null;
        resetStarUI();
      }
    }
  });
}

function saveToHistory(rating) {
  let history = JSON.parse(localStorage.getItem("history")) || [];
  const currentDate = new Date().toLocaleString();
  history.push({ rating, date: currentDate });
  localStorage.setItem("history", JSON.stringify(history));
  displayHistory(history);
  return history.length - 1;
}

function displayHistory(history) {
  historyCard.innerHTML = "";
  history.forEach((entry, i) => {
    const listItem = document.createElement("li");
    listItem.textContent = `Note ${i + 1}: ${entry.rating}/5 (le ${
      entry.date
    })`;
    historyCard.appendChild(listItem);
  });
}

function resetStarUI() {
  stars.forEach((star) => (star.src = starDefault));
}

function init() {
  addStar();
  resetLastRating();
  const history = JSON.parse(localStorage.getItem("history")) || [];
  displayHistory(history);
}

init();
