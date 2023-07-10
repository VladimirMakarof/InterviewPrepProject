function toggleAnswer(element) {
    const questionElement = element.parentElement.parentElement;
    const answerElement = questionElement.querySelector('.answer');
    const select = questionElement.querySelector('select');
    if (select.value <= 0 ){
        if (!questionElement.classList.contains("show")) {
            questionElement.classList.add("show");


            const minusPoints = answerElement.querySelector('.minus-points');

            select.disabled = true;
            select.value = "-5";
            select.style.color = "red";
            minusPoints.style.display = "inline";
        }
    }

}

function updateScore(select) {
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
    resultElement.querySelector('.score').textContent = totalScore.toString();
    document.getElementById("percentage").textContent = percentage.toFixed(2);
}
