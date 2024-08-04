const container = document.querySelector(".container");
const question = document.getElementById("question");
const category = document.getElementById("questionCategory");
const optionList = document.getElementById("optionList");
const questionCount = document.getElementById("questionCount");
const resultsContainer = document.getElementById("results-container");
const result = document.getElementById("result");

let i = 0;
let correctAnswer;
let count = 1;
let score = 0;

async function fetchData() {
  try {
    let response = await fetch(
      "https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple"
    );
    let data = await response.json();
    showQuestion(data.results[i]);
    showOptions(data.results[i]);
    correctAnswer = data.results[i].correct_answer;
  } catch (error) {}
}
fetchData();
function showQuestion(data) {
  question.innerHTML = ` Q${i + 1}. ${data.question}`;
  category.innerHTML = `Category- ${data.category}`;
  questionCount.innerHTML = `${count}/10`;
}

function showOptions(data) {
  // result.innerHTML = " ";
  let options = data.incorrect_answers;

  options[3] = data.correct_answer;
  options.sort();

  optionList.innerHTML = "";

  let option;
  options.forEach((element) => {
    option = document.createElement("button");
    option.classList.add("btn");
    option.innerHTML = element;
    option.addEventListener("click", () => checkAnswer(element));
    optionList.appendChild(option);
  });
}

function checkAnswer(selectedOption) {
  result.innerHTML = " ";
  if (selectedOption === correctAnswer) {
    result.innerHTML = "✅";
    resultsContainer.appendChild(result);
    score++;
  } else {
    result.innerHTML = `❌ <br> <span>Correct: ${correctAnswer}</span>`;
    resultsContainer.appendChild(result);
  }
  i++;
  count++;
  if (i < 10) {
    fetchData();
  } else {
    container.innerHTML = `<h1>Quizzzler</h1>
    <h1>QUIZ COMPLETED!!👏</h1>
    <h3>Your score: ${score}</h3>`;
    container.style.padding = "4rem";
  }
}
