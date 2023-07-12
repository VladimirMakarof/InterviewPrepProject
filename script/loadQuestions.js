function toggleAnswer(element) {
  console.log('toggleAnswer called');
  const questionElement = element.parentElement.parentElement;
  const answerElement = questionElement.querySelector('.answer');
  const select = questionElement.querySelector('select');
  if (select.value <= 0) {
    if (!questionElement.classList.contains("show")) {
      questionElement.classList.add("show");

      const minusPoints = answerElement.querySelector('.minus-points');

      select.disabled = true;
      select.value = "-5";
      select.style.color = "red";
      minusPoints.style.display = "inline";
      answerElement.style.display = 'block';
    }
  }
}

function updateScore(select) {
  console.log('updateScore called');
  const questionElement = select.parentElement.parentElement;
  const answerElement = questionElement.querySelector('.answer');
  const minusPoints = answerElement.querySelector('.minus-points');

  if (minusPoints) {
    if (select.value === '-5') {
      minusPoints.style.display = "inline";
      select.disabled = true;
    } else {
      minusPoints.style.display = "none";
      select.disabled = false;
    }
  }
}

fetch('script/questions.json')
  .then(response => response.json())
  .then(data => {
    const questionContainer = document.getElementById('question-container');
    data.forEach(question => {
      const questionDiv = document.createElement('div');
      questionDiv.className = 'question';

      const questionBlockDiv = document.createElement('div');
      questionBlockDiv.className = 'question-block';

      const questionText = document.createElement('p');
      questionText.className = 'question-text';
      questionText.textContent = question.question;

      const answerDiv = document.createElement('div');
      answerDiv.className = 'answer';
      answerDiv.style.display = 'none';

      const answerText = document.createElement('span');
      answerText.className = 'answer-text';
      answerText.textContent = question.answer;

      const hiddenAnswer = document.createElement('span');
      hiddenAnswer.className = 'hidden-answer';
      hiddenAnswer.textContent = '(Правильный ответ)';

      const minusPoints = document.createElement('span');
      minusPoints.className = 'minus-points';
      minusPoints.textContent = 'Оценка -5';

      answerDiv.appendChild(answerText);
      answerDiv.appendChild(hiddenAnswer);
      answerDiv.appendChild(minusPoints);

      questionBlockDiv.appendChild(questionText);
      questionBlockDiv.appendChild(answerDiv);

      questionDiv.appendChild(questionBlockDiv);

      const select = document.createElement('select');
      select.onchange = () => updateScore(select);

      for (let i = -5; i <= 5; i++) {
        if (i === -1 || i === -2 || i === -3 || i === -4) {
          continue;
        }

        const option = document.createElement('option');
        option.value = i;
        option.textContent = i;
        if (i === 0) {
          option.selected = true;
        }
        select.appendChild(option);
      }

      questionDiv.appendChild(select);

      questionContainer.appendChild(questionDiv);
    });

    const questionTextElements = document.querySelectorAll('.question-text');
    questionTextElements.forEach(element => {
      element.addEventListener('click', function () {
        toggleAnswer(this);
      });
    });

    const selectElements = document.querySelectorAll('select');
    selectElements.forEach(element => {
      element.addEventListener('change', function () {
        updateScore(this);
      });
    });
  })
  .catch(error => console.error(error));
