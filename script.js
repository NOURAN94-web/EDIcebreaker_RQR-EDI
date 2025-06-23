
let panels = [];
let currentTheme = '';

function loadCategory() {
  const category = document.getElementById('category-select').value;
  const list = document.getElementById('question-list');
  list.innerHTML = '';

  let selectedCategories = [];
  if (category === 'random') {
    const keys = Object.keys(questionBank);
    while (selectedCategories.length < 4) {
      const random = keys[Math.floor(Math.random() * keys.length)];
      if (!selectedCategories.includes(random)) selectedCategories.push(random);
    }
  } else {
    selectedCategories = [category];
  }

  selectedCategories.forEach(cat => {
    questionBank[cat].forEach(q => {
      const div = document.createElement('div');
      div.className = 'question-item';
      div.draggable = true;
      div.innerHTML = q;
      div.addEventListener('dragstart', dragStart);
      list.appendChild(div);
    });
  });

  currentTheme = category === 'random' ? '' : category;
  document.querySelector('.categories').setAttribute('data-theme', currentTheme);
}

function dragStart(e) {
  e.dataTransfer.setData('text/plain', e.target.innerHTML);
}

function addPanel() {
  const panelContainer = document.getElementById('question-panels');
  const panel = document.createElement('div');
  panel.className = 'panel clickable';
  panel.setAttribute('data-theme', currentTheme);
  panel.textContent = 'Drop a question here';
  panel.addEventListener('dragover', e => e.preventDefault());
  panel.addEventListener('drop', dropQuestion);
  panel.addEventListener('click', () => {
    panel.classList.toggle('revealed');
    panel.textContent = panel.classList.contains('revealed') ? panel.getAttribute('data-question') : 'Click to reveal';
  });
  panelContainer.appendChild(panel);
  panels.push(panel);
}

function dropQuestion(e) {
  const text = e.dataTransfer.getData('text/plain');
  const panel = e.target;
  panel.setAttribute('data-question', text);
  panel.textContent = 'Click to reveal';
}

function resetPanels() {
  const container = document.getElementById('question-panels');
  container.innerHTML = '';
  panels = [];
}
