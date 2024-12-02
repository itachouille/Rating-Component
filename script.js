const stars = document.querySelectorAll(".rating-star");
const replayButton = document.querySelector(".replay-btn");
const historyCard = document.getElementById("history-list");

function addStar() {
  stars.forEach((star, index) => {
    star.addEventListener("mouseover", () => {
      for (let i = 0; i <= index; i++) {
        stars[i].classList.add("hovered");
      }
    });
    star.addEventListener("mouseout", () => {
      stars.forEach((s) => s.classList.remove("hovered"));
    });
    star.addEventListener("click", () => {
      stars.forEach((innerStar, i) => {
        if (i <= index) {
          innerStar.classList.add("active");
        } else {
          innerStar.classList.remove("active");
        }
      });
      const rating = index + 1;
      localStorage.setItem("rating", rating);
      saveToHistory(rating);
    });
  });
}

function resetStars() {
  replayButton.addEventListener("click", () => {
    stars.forEach((star) => star.classList.remove("active"));
    localStorage.removeItem("rating");
    localStorage.removeItem("history");
    historyCard.innerHTML = "";
  });
}

function saveToHistory(rating) {
  let history = JSON.parse(localStorage.getItem("history")) || [];
  history.push(rating);
  if (history.length > 5) history.shift();
  localStorage.setItem("history", JSON.stringify(history));
  displayHistory(history);
}

function displayHistory(history) {
  historyCard.innerHTML = "";
  history.forEach((rating, i) => {
    const listItem = document.createElement("li");
    listItem.textContent = `Note ${i + 1}: ${rating}/5`;
    historyCard.appendChild(listItem);
  });
}

function init() {
  addStar();
  resetStars();
  const savedRating = localStorage.getItem("rating");
  if (savedRating) {
    stars.forEach((star, i) => {
      if (i < savedRating) star.classList.add("active");
    });
  }
  const history = JSON.parse(localStorage.getItem("history")) || [];
  displayHistory(history);
}

init();
