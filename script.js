const quizBox = document.querySelector('.quiz-container');
const play = document.querySelector('.play');

const quiz = [
    {
        question: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        correctAnswer: "Paris"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Saturn"],
        correctAnswer: "Mars"
    },
    {
        question: "What is the largest mammal in the world?",
        options: ["Elephant", "Blue Whale", "Giraffe", "Great White Shark"],
        correctAnswer: "Blue Whale"
    },
    {
        question: "Who wrote 'To Kill a Mockingbird'?",
        options: ["Harper Lee", "Mark Twain", "J.K. Rowling", "Ernest Hemingway"],
        correctAnswer: "Harper Lee"
    }
];

let index = 0;
let arrLength = quiz.length;
let score = 0;

function submit(selectedValue,index) {
    let correctAns = document.createElement('div');
    correctAns.className = "correctAns";
    if (selectedValue == quiz[index].correctAnswer) {
        correctAns.textContent = "Correct!";
        score++;
    } else {
        correctAns.innerHTML = `Incorrect Answer. <br> The correct answer is: ${quiz[index].correctAnswer}`;
    }
    quizBox.appendChild(correctAns);

    setTimeout(() => {
        createQuizQues(index + 1);
    }, 2000);
}

function createQuizQues(index) {
    quizBox.innerHTML = "";
    if (index >= arrLength) {
        let result = document.createElement('div');
        result.className = "result";
        result.innerHTML = `Quiz completed! <br> Score: ${score}/4`;
        return quizBox.appendChild(result);
    }

    const mainDiv = document.createElement('div');
    mainDiv.className = "quizDiv";

    const firstInnerDiv = document.createElement('div');
    firstInnerDiv.className = "quesBox";
    firstInnerDiv.textContent = quiz[index].question;
    mainDiv.appendChild(firstInnerDiv);

    const secondInnerDiv = document.createElement('div');
    secondInnerDiv.className = "option";
    secondInnerDiv.innerHTML = `
        <p>Select an option:</p>
        ${quiz[index].options.map(option =>
            `<label><input type="radio" name="option" value="${option}"> ${option}</label><br>`
        ).join('')}
        <button type="submit" class="sub">Submit</button>
    `;
    mainDiv.appendChild(secondInnerDiv);

    quizBox.appendChild(mainDiv);

    document.querySelector('.sub').addEventListener('click', function() {
        const currentRadios = mainDiv.querySelectorAll('input[name="option"]');
        let selectedValue;

        currentRadios.forEach(radio => {
            if (radio.checked) {
                selectedValue = radio.value;
            }
        });

        if (selectedValue !== undefined) {
            submit(selectedValue,index); // Pass selectedValue to the submit function
        } else {
            alert("Please select an answer first.");
        }
    });
}

play.addEventListener('click', function() {
    createQuizQues(0);
});
