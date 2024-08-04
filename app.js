const container = document.querySelector(".container");
const question = document.getElementById("question");
const category = document.getElementById("questionCategory");
const optionList = document.getElementById("optionList");

let i = 0;

async function fetchData() {
  try {
    let response = await fetch(
      "https://opentdb.com/api.php?amount=10&difficulty=medium&type=multiple"
    );
    let data = await response.json();
    showQuestion(data.results[i]);
    showOptions(data.results[i]);
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
  let option;
  options.forEach((element) => {
    option = document.createElement("button");
    option.classList.add("btn");
    option.innerHTML = element;
    optionList.appendChild(option);
  });

  console.log(option);
}
