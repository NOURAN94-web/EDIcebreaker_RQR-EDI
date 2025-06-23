
const questionBank = {}; // Placeholder until loaded by questions.js

let panelCounter = 1;

function addPanel() {
  const panel = document.createElement("div");
  panel.className = "panel";
  panel.innerHTML = `<strong>${panelCounter++}</strong>`;
  panel.onclick = () => {
    if (panel.dataset.revealed !== "true" && panel.dataset.question) {
      panel.innerHTML = `<strong>${panel.dataset.index}</strong><br>${panel.dataset.question}`;
      panel.dataset.revealed = "true";
    }
  };
  document.getElementById("question-panels").appendChild(panel);
}

function resetPanels() {
  document.getElementById("question-panels").innerHTML = "";
  panelCounter = 1;
}

function loadCategory() {
  const selected = document.getElementById("category-select").value;
  const list = document.getElementById("question-list");
  list.innerHTML = "";

  if (!questionBank[selected]) return;

  questionBank[selected].forEach((q, i) => {
    const div = document.createElement("div");
    div.className = "question";
    div.draggable = true;
    div.innerText = q;
    div.ondragstart = e => {
      e.dataTransfer.setData("text/plain", q);
      e.dataTransfer.setData("index", panelCounter);
    };
    list.appendChild(div);
  });
}

function generateRandomPanels(n) {
  resetPanels();
  const categories = ["individual", "culture", "food", "society", "academic"];
  for (let i = 0; i < n; i++) {
    const randCat = categories[Math.floor(Math.random() * categories.length)];
    const randQuestions = questionBank[randCat];
    if (randQuestions && randQuestions.length > 0) {
      const question = randQuestions[Math.floor(Math.random() * randQuestions.length)];
      const panel = document.createElement("div");
      panel.className = "panel";
      panel.dataset.question = question;
      panel.dataset.index = panelCounter;
      panel.dataset.revealed = "false";
      panel.innerHTML = `<strong>${panelCounter++}</strong>`;
      panel.onclick = () => {
        if (panel.dataset.revealed !== "true") {
          panel.innerHTML = `<strong>${panel.dataset.index}</strong><br>${panel.dataset.question}`;
          panel.dataset.revealed = "true";
        }
      };
      document.getElementById("question-panels").appendChild(panel);
    }
  }
}

// Enable drag & drop to panels
document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("question-panels");
  container.addEventListener("dragover", e => e.preventDefault());
  container.addEventListener("drop", e => {
    e.preventDefault();
    const question = e.dataTransfer.getData("text/plain");
    const index = panelCounter;
    const panel = document.createElement("div");
    panel.className = "panel";
    panel.dataset.question = question;
    panel.dataset.index = panelCounter;
    panel.dataset.revealed = "false";
    panel.innerHTML = `<strong>${panelCounter++}</strong>`;
    panel.onclick = () => {
      if (panel.dataset.revealed !== "true") {
        panel.innerHTML = `<strong>${panel.dataset.index}</strong><br>${panel.dataset.question}`;
        panel.dataset.revealed = "true";
      }
    };
    container.appendChild(panel);
  });
});
