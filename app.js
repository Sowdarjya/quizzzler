const container = document.querySelector(".container");
const question = document.getElementById("question");
const category = document.getElementById("questionCategory");
const optionList = document.getElementById("optionList");

let i = 0;
let correctAnswer;

async function fetchData() {
  try {
    let response = await fetch(
      "https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple"
    );
    let data = await response.json();
    showQuestion(data.results[i]);
    showOptions(data.results[i]);
    correctAnswer = data.results[i].correct_answer;
  } catch (error) {
    console.error(error);
  }
}
fetchData();
function showQuestion(data) {
  question.innerHTML = ` Q${i + 1}. ${data.question}`;
  category.innerHTML = `Category- ${data.category}`;
}

function showOptions(data) {
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
  if (selectedOption === correctAnswer) {
    alert("Correct!");
  } else {
    alert("Incorrect!");
  }
  i++;
  if (i < 10) {
    fetchData();
  } else {
    alert("Quiz Completed!");
  }
}
