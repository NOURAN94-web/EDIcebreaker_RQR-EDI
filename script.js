
let questionBank = {
  individual: [
    "Tell us where you come from and where did you grow up",
    "What is your favorite cartoon character from your childhood?",
    "What is the biggest sport event you have attended?",
    "Explain the origin of your family name and its meaning",
    "Does your family or region support one sports team in particular? If so, which one?",
    "What is your relationship like with your cousins? Are you close or do you consider family to be only brother/sister/parents?",
    "Is Christmas celebrated in your country? What are the traditions around Christmas?",
    "Does your region have a unique holiday/celebration?",
    "What do you miss the most about your country/region?",
    "What would you say is the most commonly held misconception about people of your culture?"
  ],
  culture: [
    "Do you speak more than one language in your country?",
    "How do people greet one another in your country?",
    "What are the norms around births?",
    "Tell us about one cultural habit from your country",
    "What are the norms around weddings?",
    "Cite one touristic slogan in your city/country",
    "What are the norms around deaths?",
    "Cite two tourist attractions in your city/country",
    "You have how many distinct accents in your country?",
    "What are the most popular sports in your country?",
    "Who is the athlete/celebrity from your region that is most known on an international level?",
    "How often do people spend time with their families?",
    "How is time understood and measured?",
    "Which countries are the most frequently visited by people in your region for vacations?"
  ]
};

let panelCount = 0;

function loadCategory() {
  const category = document.getElementById('category-select').value;
  const questionList = document.getElementById('question-list');
  questionList.innerHTML = '';

  let questions = [];

  if (category === 'random') {
    for (let cat in questionBank) {
      questions.push(...questionBank[cat]);
    }
  } else {
    questions = questionBank[category] || [];
  }

  questions.forEach((text, index) => {
    const div = document.createElement('div');
    div.className = 'question';
    div.textContent = text;
    div.draggable = true;
    div.id = 'q-' + category + '-' + index;
    div.ondragstart = dragStart;
    questionList.appendChild(div);
  });
}

function dragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.id);
}

function allowDrop(e) {
  e.preventDefault();
}

function drop(e) {
  e.preventDefault();
  const id = e.dataTransfer.getData('text/plain');
  const dragged = document.getElementById(id);
  const panel = e.target.closest('.panel');

  if (!panel || panel.classList.contains('filled-panel')) return;

  panelCount++;
  const numberDiv = document.createElement('div');
  numberDiv.className = 'panel-number';
  numberDiv.textContent = panelCount;
  numberDiv.style.fontWeight = 'bold';

  const hidden = document.createElement('div');
  hidden.className = 'hidden-question';
  hidden.style.display = 'none';
  hidden.innerHTML = '<em>' + dragged.textContent + '</em>';

  panel.innerHTML = '';
  panel.appendChild(numberDiv);
  panel.appendChild(hidden);
  panel.classList.add('filled-panel', 'highlighted');

  panel.onclick = () => {
    hidden.style.display = 'block';
    numberDiv.style.display = 'none';
    panel.classList.remove('highlighted');
  };
}

function addPanel() {
  const panel = document.createElement('div');
  panel.className = 'panel';
  panel.ondragover = allowDrop;
  panel.ondrop = drop;
  document.getElementById('question-panels').appendChild(panel);
}

function resetPanels() {
  document.getElementById('question-panels').innerHTML = '';
  panelCount = 0;
}

function toggleSubmitForm() {
  const form = document.getElementById('submit-question-form');
  form.style.display = (form.style.display === 'none') ? 'block' : 'none';
}

function sendQuestion() {
  const question = document.getElementById('new-question').value;
  const category = document.getElementById('new-category').value;
  if (!question || !category) {
    alert("Please enter your question and select a category.");
    return;
  }
  alert("Thank you for submitting your question! It has been sent to the admins for review.");
  document.getElementById('new-question').value = "";
  document.getElementById('new-category').value = "";
  toggleSubmitForm();
}
