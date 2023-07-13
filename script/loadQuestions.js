// Переменные для таймера
let intervalId;
let timer;
let initialTimer = 60 * 2;

// Функция запуска таймера
function startTimer(duration, display) {
  timer = duration;
  let minutes, seconds;

  // Функция обновления отображения таймера
  function updateDisplay() {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    display.textContent = "Оставшееся время: " + minutes + ":" + seconds + ", по завершению времени кнопка отправить" +
        " станет не активной, поэтому давай поторопимся";
  }

  updateDisplay();

  // Обновление отображения каждую секунду
  intervalId = setInterval(function () {
    updateDisplay();

    // Уменьшение таймера и проверка на истечение времени
    if (--timer < 0) {
      clearInterval(intervalId);
      display.textContent = "Время истекло";
      const submitButton = document.querySelector('button[onclick="submitTest()"]');
      if (submitButton) {
        submitButton.disabled = true;
      }
    }
  }, 1000);
}

// Инициализация таймера при загрузке страницы
document.addEventListener("DOMContentLoaded", function () {
  const timerContainer = document.createElement("div");
  timerContainer.id = "timer";

  const heading = document.querySelector("h1");
  heading.parentNode.insertBefore(timerContainer, heading.nextSibling);

  const timerDisplay = document.getElementById("timer");

  const storedTimer = localStorage.getItem("timer");
  if (storedTimer) {
    timer = parseInt(storedTimer, 10);
    startTimer(timer, timerDisplay);
  } else {
    timer = initialTimer;
    startTimer(timer, timerDisplay);
    localStorage.setItem("timer", timer.toString());
  }

  // Создание кнопки паузы
  const pauseButton = document.createElement("button");
  pauseButton.id = "pause-button";
  pauseButton.textContent = "Пауза";
  document.body.insertBefore(pauseButton, timerContainer.nextSibling);
  let isPaused = false;

  // Обработчик клика по кнопке паузы
  pauseButton.addEventListener("click", function () {
    if (isPaused) {
      startTimer(timer, timerDisplay);
      pauseButton.textContent = "Пауза";
    } else {
      clearInterval(intervalId);
      pauseButton.textContent = "Продолжить";
    }
    isPaused = !isPaused;
  });

  // Сохранение таймера перед закрытием страницы
  window.addEventListener("beforeunload", function () {
    localStorage.setItem("timer", timer.toString());
  });

  // Создание таблицы с оценками
  const tableContainer = document.createElement("div");
  tableContainer.id = "table-container";

  const table = document.createElement("table");
  table.id = "score-table";
  table.style.borderCollapse = "collapse";

  // Создание заголовка таблицы
  const tableHeader = document.createElement("thead");
  const headerRow = document.createElement("tr");
  const headerCell1 = document.createElement("th");
  headerCell1.textContent = "Оценка";
  const headerCell2 = document.createElement("th");
  headerCell2.textContent = "Описание";
  const headerCell3 = document.createElement("th");
  headerCell3.textContent = "Пояснение";

  headerRow.appendChild(headerCell1);
  headerRow.appendChild(headerCell2);
  headerRow.appendChild(headerCell3);
  tableHeader.appendChild(headerRow);

  const tableBody = document.createElement("tbody");
  const rows = [
    { score: -5, description: "Нет знаний!", explanation: "Нет знаний" },
    { score: 0, description: "Значение по умолчанию!", explanation: "Значение по умолчанию" },
    { score: 1, description: "Начальный уровень. Осведомлен!", explanation: "Поверхностные знания технологии/инструмента, минимальный опыт использования. Может выполнять элементарные задания под руководством наставника." },
    { score: 2, description: "Развивающийся. Знаю!", explanation: "Базовые знания общих правил. Может применить инструмент/технологию в стандартных ситуациях (задачах). Испытывает сложности при решении нестандартных/нетипичных задачах. Обращается за консультацией и советом наставника (руководителя)." },
    { score: 3, description: "Квалифицированный. Умею!", explanation: "Знание и уверенное владение технологией/инструментом в полном объеме. Отвечает на сложные вопросы, комбинирует подходы и методы при решении задач. Способен поставить задачу другому и проверить ее исполнение. В нестандартных ситуациях/при решении нетиповых задач может обращаться за советом более опытных коллег." },
    { score: 4, description: "Профессиональный. Могу научить!", explanation: "Знание особенностей и нюансов технологии/инструмента. Отличное владение технологией/инструментом. Знание лучших отраслевых практик. Решает комплексные, нестандартные задачи в рамках данного производственного/бизнес процесса или предметной области. Может оценивает эффективность применения технологии и инструмента." },
    { score: 5, description: "Экспертный. Формирую новое знание!", explanation: "Глубокое владение знаниями, инновационными подходами к решению задач любого уровня сложности (в т.ч. впервые появившиеся задачи), способность создавать свои собственные паттерны и библиотеки, решающие задачу. Готовность адаптировать либо разрабатывать корпоративные стандарты технологии (методологию, правила, стратегию применения) на уровне Компании." }
  ];

  // Создание строк таблицы
  rows.forEach((row) => {
    const tableRow = document.createElement("tr");
    const cell1 = document.createElement("td");
    cell1.textContent = row.score.toString();
    cell1.style.border = "1px solid black";
    const cell2 = document.createElement("td");
    cell2.textContent = row.description;
    cell2.style.border = "1px solid black";
    const cell3 = document.createElement("td");
    cell3.textContent = row.explanation;
    cell3.style.border = "1px solid black";

    tableRow.appendChild(cell1);
    tableRow.appendChild(cell2);
    tableRow.appendChild(cell3);
    tableBody.appendChild(tableRow);
  });

  table.appendChild(tableHeader);
  table.appendChild(tableBody);
  tableContainer.appendChild(table);

  // Добавление таблицы и информационного текста на страницу
  const infoText = document.createElement("p");
  infoText.textContent = "В случае, если вы не знаете ответа, вы можете нажать на вопрос, и появится ответ, но это будет автоматически означать 'Нет знаний'.";
  infoText.style.color = "red"; // Устанавливаем красный цвет текста

  document.body.insertBefore(tableContainer, pauseButton.nextSibling);
  document.body.insertBefore(infoText, pauseButton.nextSibling);
});

// Функция отображения ответа на вопрос
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

// Функция обновления счета
function updateScore(select) {
  console.log('updateScore called');
  const questionElement = select.parentElement.parentElement;
  const answerElement = questionElement.querySelector('.answer');
  const minusPoints = answerElement.querySelector('.minus-points');

  if (minusPoints) {
    if (select.value === '-5') {
      select.style.color = "red";
      minusPoints.style.display = "inline";
      select.disabled = true;
    } else {
      minusPoints.style.display = "none";
      select.disabled = false;
    }
  }
}

// Загрузка вопросов из файла JSON
fetch('script/questions.json')
    .then(response => response.json())
    .then(data => {
      const questionContainer = document.getElementById('question-container');

      data.forEach(topic => {
        const topicDiv = document.createElement('div');
        topicDiv.className = 'topic';

        const topicHeading = document.createElement('h2');
        topicHeading.textContent = topic.topic;
        topicHeading.classList.add('centered');
        topicHeading.classList.add(topic.topic.toLowerCase());
        topicDiv.appendChild(topicHeading);

        topic.questions.forEach(question => {
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

          // Создание опций для выбора оценки
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

          topicDiv.appendChild(questionDiv);
        });

        questionContainer.appendChild(topicDiv);
      });

      // Добавление обработчиков для отображения ответа и обновления счета
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

// Функция отправки теста
function submitTest() {
  const questionElements = document.getElementsByClassName("question");
  let totalScore = 0;
  let maxScore = 0;
  for (let i = 0; i < questionElements.length; i++) {
    const questionElement = questionElements[i];
    const select = questionElement.querySelector('select');
    const selectedScore = parseInt(select.value);
    const minusPoints = questionElement.querySelector('.minus-points');
    if (minusPoints) {
      if (select.disabled) {
        totalScore -= 5;
      } else {
        totalScore += selectedScore;
        minusPoints.style.display = "none";
      }
    }
    select.disabled = true;
    maxScore += 5;
  }
  const percentage = (totalScore / maxScore) * 100;

  const resultElement = document.getElementById("result");
  resultElement.style.display = "block";
  resultElement.querySelector('#score').textContent = totalScore.toString();
  document.getElementById("percentage").textContent = percentage.toFixed(2);
}
