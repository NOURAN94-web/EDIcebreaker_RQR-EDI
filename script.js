
// Load questions from the selected category
function loadCategory() {
  const category = document.getElementById('category-select').value;
  const listContainer = document.getElementById('question-list');
  const categoriesBlock = document.querySelector('.categories');
  listContainer.innerHTML = '';

  // Update theme class
  categoriesBlock.dataset.theme = category;

  if (category === 'random') {
    const allQuestions = Object.values(questions).flat();
    shuffleArray(allQuestions).forEach(q => addQuestionToList(q, listContainer));
    return;
  }

  if (!category || !questions[category]) return;
  questions[category].forEach(q => addQuestionToList(q, listContainer));
}

function addQuestionToList(q, listContainer) {
  const item = document.createElement('div');
  item.className = 'question-item';
  item.draggable = true;
  item.textContent = q;
  item.addEventListener('dragstart', (e) => {
    e.dataTransfer.setData('text/plain', q);
  });
  listContainer.appendChild(item);
}

// Add a new panel
function addPanel() {
  const panelContainer = document.getElementById('question-panels');
  const panel = document.createElement('div');
  panel.className = 'panel';
  panel.textContent = '?';
  panel.setAttribute('data-filled', 'false');

  panel.addEventListener('dragover', (e) => {
    e.preventDefault();
  });
  panel.addEventListener('drop', (e) => {
    e.preventDefault();
    if (panel.getAttribute('data-filled') === 'true') return;
    const data = e.dataTransfer.getData('text/plain');
    panel.setAttribute('data-question', data);
    panel.setAttribute('data-filled', 'true');
    panel.textContent = '?';
    panel.classList.add('clickable');
  });

  panel.addEventListener('click', () => {
    if (panel.getAttribute('data-filled') === 'true') {
      panel.textContent = panel.getAttribute('data-question');
    }
  });

  panelContainer.appendChild(panel);
}

// Clear all panels
function resetPanels() {
  const panelContainer = document.getElementById('question-panels');
  panelContainer.innerHTML = '';
}

// Shuffle helper
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
