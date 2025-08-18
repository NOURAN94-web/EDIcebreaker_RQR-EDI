// Complete question bank with all categories
let questionBank = {
  individual: [
    "Parlez-nous d'où vous venez et où vous avez grandi / Tell us where you come from and where did you grow up",
    "Quel est votre personnage favori de bande dessinée de votre enfance ? / What is your favorite cartoon character from your childhood?",
    "Quel est le plus grand événement sportif auquel vous avez assisté ? / What is the biggest sport event you have attended?",
    "Expliquez l'origine de votre nom de famille et son sens s'il y en a un / Explain the origin of your family name and its meaning",
    "Y a-t-il une équipe sportive que votre famille ou votre région supporte en particulier ? Si oui, laquelle ? / Does your family or region support one sports team in particular? If so, which one?",
    "Quelle est votre relation avec vos cousins et cousines ? / What is your relationship like with your cousins?",
    "Fêtez-vous Noël dans votre pays ? Quelles sont les coutumes ? / Is Christmas celebrated in your country? What are the traditions?",
    "Y a-t-il une fête/congé unique à votre région ? / Does your region have a unique holiday/celebration?",
    "Qu'est-ce qui vous manque le plus de votre pays ? / What do you miss the most about your country?",
    "Quelle est la perception erronée la plus courante à propos des gens de votre culture ? / What is the most commonly held misconception about your culture?"
  ],
  culture: [
    "Parlez-vous plus d'une langue dans votre pays ? / Do you speak more than one language in your country?",
    "Comment les gens se saluent dans votre pays ? / How do people greet one another in your country?",
    "Quelles sont les normes et coutumes entourant les naissances ? / What are the norms around births?",
    "Parlez-nous d'une habitude culturelle dans votre pays / Tell us about one cultural habit from your country",
    "Quelles sont les normes et coutumes entourant les mariages ? / What are the norms around weddings?",
    "Citez un slogan touristique dans votre ville/pays / Cite one touristic slogan from your region",
    "Quelles sont les normes et coutumes entourant les décès ? / What are the norms around deaths?",
    "Citez deux attractions touristiques dans votre ville/pays / Cite two tourist attractions in your city/country",
    "Y a-t-il différents accents dans votre pays ? / Are there different accents in your country?",
    "Quels sont les sports les plus populaires dans votre pays ? / What are the most popular sports in your country?",
    "Quel athlète ou célébrité est le plus connu à l'international ? / Who is the most internationally known athlete or celebrity from your country?",
    "À quelle fréquence les gens passent-ils du temps en famille ? / How often do people spend time with family?",
    "Comment le temps est perçu ? (ex : retard) / How is time perceived in your culture? (e.g., being late)",
    "Quels pays sont le plus visités par les gens de votre région ? / What countries are most visited for vacations?"
  ],
  food: [
    "Est-ce qu'il neige dans la région/pays d'où vous venez ? / Does it snow in your region?",
    "Parlez-nous de la location géographique dans votre pays / Tell us about the geographic location of your country",
    "Parlez-nous de deux repas traditionnels dans votre ville/pays / Tell us about two traditional meals from your region",
    "Quels sont les fruits traditionnels locaux de votre pays ? / What are the traditional fruits in your country?",
    "À quoi ressemble une randonnée dans votre pays ? / What is a walk in nature like in your country?",
    "Quels animaux rencontre-t-on souvent dans votre région ? / What animals are commonly found in your region?",
    "Quel est l'animal le plus impressionnant de votre région ? / What is the most impressive animal from your region?",
    "Quelle est la relation avec les animaux de compagnie ? / What's your country's relationship with pets?"
  ],
  society: [
    "Est-ce que votre pays considère la discrimination via ses lois ? / Does your country address discrimination through its laws?",
    "Est-ce que vous avez un service militaire dans votre pays ? / Do you have military service or citizen duty?",
    "Est-ce que votre pays pratique une ou plusieurs religions ? / Does your country practice one or multiple religions?",
    "Y a-t-il différents groupes ethniques dans votre pays ? / Are there various ethnic groups in your country?",
    "Les femmes ont-elles les mêmes droits d'emploi ? / Do women have equal job rights in your country?",
    "Quel est le statut légal de la prostitution ? / What's the legal and social view on prostitution?",
    "Avez-vous des droits LGBTQIA+ ? / Are LGBTQIA+ rights recognized in your country?",
    "Donnez un exemple de groupe minoritaire discriminé. / Give an example of a discriminated minority group in your country.",
    "Quelle est la consommation d'alcool/tabac/marijuana ? / What's alcohol/tobacco/marijuana use like in your country?"
  ],
  academic: [
    "Quelle est la monnaie utilisée et son équivalence ? / What currency is used and how much is it in CAD?",
    "Quel est le salaire minimum ? / What is the minimum wage?",
    "Quelles sont les heures de travail ? / What are the work hours?",
    "Comment fonctionne la location d'appartement ? / How is renting managed in your country?",
    "Les universités sont-elles privées ou publiques ? / Are universities mainly private or public?",
    "Comment est la sélection aux études supérieures ? / How is the selection process for graduate studies?",
    "Est-ce le même système qu'au Canada ? / Is it the same system as in Canada?",
    "Différences en recherche entre ici et votre pays ? / Research differences between your country and Canada?",
    "Quelle est l'industrie principale dans votre région ? / What's the main industry in your region?"
  ]
};

let panelCount = 0;

function loadCategory() {
  const category = document.getElementById('category-select').value;
  const questionList = document.getElementById('question-list');
  questionList.innerHTML = '';

  let questions = [];

  if (category === 'random') {
    // Combine all questions from all categories
    for (let cat in questionBank) {
      questions.push(...questionBank[cat]);
    }
  } else {
    questions = questionBank[category] || [];
  }

  // Display ALL questions for the selected category
  questions.forEach((text, index) => {
    const div = document.createElement('div');
    div.className = 'question';
    div.innerHTML = text; // Use innerHTML to preserve formatting
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

  const hidden = document.createElement('div');
  hidden.className = 'hidden-question';
  hidden.style.display = 'none';
  hidden.innerHTML = dragged.innerHTML; // Preserve HTML formatting

  panel.innerHTML = '';
  panel.appendChild(numberDiv);
  panel.appendChild(hidden);
  panel.classList.add('filled-panel');

  panel.onclick = () => {
    if (hidden.style.display === 'none') {
      hidden.style.display = 'block';
      numberDiv.style.display = 'none';
    } else {
      hidden.style.display = 'none';
      numberDiv.style.display = 'block';
    }
  };
}

function addPanel() {
  const panel = document.createElement('div');
  panel.className = 'panel';
  panel.ondragover = allowDrop;
  panel.ondrop = drop;
  panel.innerHTML = '<div style="color: #999;">Glisser la question ici / Drag question here</div>';
  document.getElementById('question-panels').appendChild(panel);
}

function resetPanels() {
  document.getElementById('question-panels').innerHTML = '';
  panelCount = 0;
}

function surpriseMe() {
  const count = parseInt(document.getElementById('surprise-count').value);
  
  // Get all questions from all categories
  let allQuestions = [];
  for (let cat in questionBank) {
    questionBank[cat].forEach((question, index) => {
      allQuestions.push({
        text: question,
        id: 'q-' + cat + '-' + index
      });
    });
  }
  
  // Shuffle the questions
  for (let i = allQuestions.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [allQuestions[i], allQuestions[j]] = [allQuestions[j], allQuestions[i]];
  }
  
  // Add the specified number of panels with random questions
  for (let i = 0; i < count; i++) {
    const panel = document.createElement('div');
    panel.className = 'panel filled-panel';
    panel.ondragover = allowDrop;
    panel.ondrop = drop;
    
    panelCount++;
    const numberDiv = document.createElement('div');
    numberDiv.className = 'panel-number';
    numberDiv.textContent = panelCount;
    
    const hidden = document.createElement('div');
    hidden.className = 'hidden-question';
    hidden.style.display = 'none';
    hidden.innerHTML = allQuestions[i].text;
    
    panel.appendChild(numberDiv);
    panel.appendChild(hidden);
    
    panel.onclick = () => {
      if (hidden.style.display === 'none') {
        hidden.style.display = 'block';
        numberDiv.style.display = 'none';
      } else {
        hidden.style.display = 'none';
        numberDiv.style.display = 'block';
      }
    };
    
    document.getElementById('question-panels').appendChild(panel);
  }
}

function toggleSubmitForm() {
  const form = document.getElementById('submit-question-form');
  form.style.display = (form.style.display === 'none' || form.style.display === '') ? 'block' : 'none';
  
  // Clear previous messages when opening the form
  if (form.style.display === 'block') {
    document.getElementById('success-message').style.display = 'none';
    document.getElementById('error-message').style.display = 'none';
  }
}

function showMessage(type, message) {
  const successDiv = document.getElementById('success-message');
  const errorDiv = document.getElementById('error-message');
  
  if (type === 'success') {
    successDiv.textContent = message;
    successDiv.style.display = 'block';
    errorDiv.style.display = 'none';
  } else {
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    successDiv.style.display = 'none';
  }
}

function sendQuestion() {
  const question = document.getElementById('new-question').value.trim();
  const category = document.getElementById('new-category').value;
  const sendButton = document.getElementById('send-button');
  
  if (!question || !category) {
    showMessage('error', "Please enter your question and select a category.");
    return;
  }
  
  // Disable button and show loading state
  sendButton.disabled = true;
  sendButton.textContent = 'Sending...';
  
  // Create the email subject and body
  const subject = `EDIcebreaker Tool - New Question Submission`;
  const body = `New question submitted via EDIcebreaker Tool:

Question: ${question}

Category: ${category}

Submitted at: ${new Date().toLocaleString()}`;
  
  // Create mailto link
  const mailtoLink = `mailto:nour.94.an@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
  // Open email client
  window.location.href = mailtoLink;
  
  // Show success message and reset form
  setTimeout(() => {
    showMessage('success', "Email client opened! Please send the email to submit your question.");
    document.getElementById('new-question').value = "";
    document.getElementById('new-category').value = "";
    sendButton.disabled = false;
    sendButton.textContent = 'Send to Admins';
  }, 1000);
}

// Initialize with some panels
window.onload = function() {
  addPanel();
  addPanel();
};