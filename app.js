const container = document.querySelector(".container");
const question = document.getElementById("question");
const questionCount = document.getElementById("questionCount");

let i = 0;

async function fetchData() {
  try {
    let response = await fetch(
      "https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple"
    );
    let data = await response.json();
    console.log(data.results[i]);
    showQuestion(data.results[i]);
    showOptions(data.results[i]);
  } catch (error) {
    console.error(error);
  }
}
fetchData();
function showQuestion(data) {
  question.innerHTML = ` Q${i + 1}. ${data.question}`;
}

function showOptions(data) {
  let arr = data.incorrect_answers;
  arr[0] = data.correct_answer;
  console.log(arr);
}
