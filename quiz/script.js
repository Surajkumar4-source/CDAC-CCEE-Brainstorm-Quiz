




// prevent from copying question   ,but small bug counter of attempt decrease in last attempt when we click on the previos selected option







// let currentQuestionIndex = 0;
// let questions = [];
// let correctAnswersCount = 0;
// let userAttempts = 0;
// let selectedSubject = "";
// let maxQuestions = 10;
// let lastSelectedOption = null;

// // Fisher-Yates shuffle function
// function shuffleArray(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//         let j = Math.floor(Math.random() * (i + 1));
//         [array[i], array[j]] = [array[j], array[i]];
//     }
// }

// // Start quiz with selected subject and shuffle questions and options
// function startQuiz() {
//     selectedSubject = document.getElementById("subject-select").value;
//     maxQuestions = parseInt(document.getElementById("question-count").value) || 10;

//     fetch(`data/${selectedSubject}.json`)
//         .then((response) => {
//             if (!response.ok) throw new Error("JSON file not found");
//             return response.json();
//         })
//         .then((data) => {
//             if (data.length === 0) throw new Error("No questions available");

//             shuffleArray(data); // Shuffle questions
//             questions = data.slice(0, maxQuestions);
//             questions.forEach(q => shuffleArray(q.options)); // Shuffle options

//             currentQuestionIndex = 0;
//             correctAnswersCount = 0;
//             userAttempts = 0;
//             lastSelectedOption = null; // Reset selection tracking

//             document.getElementById("quiz-container").style.display = "block";
//             displayProgress();
//             loadQuestion();
//         })
//         .catch((error) => {
//             alert(`Error: ${error.message}`);
//         });
// }

// // Load a question
// function loadQuestion() {
//     if (currentQuestionIndex >= questions.length) {
//         showResults();
//         return;
//     }

//     const questionData = questions[currentQuestionIndex];
//     const questionElement = document.getElementById("question");
//     questionElement.textContent = `Q. ${questionData.question}`;

//     // Disable text selection for MCQ
//     questionElement.style.userSelect = "none";
//     questionElement.style.webkitUserSelect = "none";
//     questionElement.style.mozUserSelect = "none";
//     questionElement.style.msUserSelect = "none";

//     const buttons = document.querySelectorAll(".option");
//     buttons.forEach((button, index) => {
//         button.textContent = questionData.options[index];
//         button.style.backgroundColor = "#00ff00";
//         button.disabled = false;

//         const correctAnswer = questionData.answer || questionData.correct;
//         button.onclick = () => checkAnswer(button, questionData.options[index], correctAnswer);
//     });

//     document.getElementById("feedback").textContent = "";
//     document.getElementById("attempts").textContent = `You have 3 attempts.`;
//     document.getElementById("attempts").style.display = "block";
//     document.getElementById("next-btn").disabled = true;
// }

// // Check answer (Bug Fixed)
// function checkAnswer(button, selectedAnswer, correctAnswer) {
//     const feedback = document.getElementById("feedback");
//     const attemptsText = document.getElementById("attempts");

//     if (selectedAnswer === lastSelectedOption) return; // Prevent re-clicking the same option

//     lastSelectedOption = selectedAnswer;

//     if (userAttempts < 3) {
//         if (selectedAnswer === correctAnswer) {
//             button.style.backgroundColor = "green";
//             feedback.textContent = "✅ Correct!";
//             correctAnswersCount++;
//             document.getElementById("next-btn").disabled = false;
//             attemptsText.style.display = "none";
//         } else {
//             button.style.backgroundColor = "red";
//             userAttempts++;

//             if (userAttempts < 3) {
//                 feedback.textContent = `❌ Incorrect! ${3 - userAttempts} attempts left.`;
//             } else {
//                 feedback.textContent = `❌ Incorrect! Correct answer: ${correctAnswer}`;
//                 document.getElementById("next-btn").disabled = false;
//                 attemptsText.style.display = "none";
//             }
//         }
//     }

//     if (userAttempts === 3 || selectedAnswer === correctAnswer) {
//         document.querySelectorAll(".option").forEach((btn) => (btn.disabled = true));
//     }
// }

// // Load next question
// function nextQuestion() {
//     userAttempts = 0;
//     lastSelectedOption = null; // Reset for new question
//     currentQuestionIndex++;

//     if (currentQuestionIndex < questions.length) {
//         displayProgress();
//         loadQuestion();
//     } else {
//         showResults();
//     }
// }

// // Display progress
// function displayProgress() {
//     document.getElementById("progress").textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
// }

// // Show results and auto-refresh after 5 seconds
// function showResults() {
//     document.getElementById("quiz-container").innerHTML = `
//         <h1>🎉 Quiz Complete!</h1>
//         <p>You answered ${correctAnswersCount} out of ${questions.length} questions correctly!</p>
//         <p>Thanks for participating!</p>
//         <p>🔄 The quiz will restart in <span id="timer">5</span> seconds...</p>
//     `;

//     let countdown = 5;
//     const timer = setInterval(() => {
//         countdown--;
//         document.getElementById("timer").textContent = countdown;
//         if (countdown === 0) {
//             clearInterval(timer);
//             location.reload();
//         }
//     }, 1000);
// }

// // 🔒 Security: Prevent text copying and inspection
// document.addEventListener("DOMContentLoaded", () => {
//     document.addEventListener("contextmenu", (event) => event.preventDefault()); // Disable right-click

//     document.addEventListener("keydown", (event) => {
//         if (
//             (event.ctrlKey && (event.key === "c" || event.key === "u" || event.key === "s" || event.key === "p")) ||
//             (event.ctrlKey && event.shiftKey && (event.key === "I" || event.key === "J" || event.key === "C"))
//         ) {
//             event.preventDefault(); // Disable copy, inspect, source view, print
//         }
//     });
// });




















// prevent from copying question  and all bugs fixed of counter









let currentQuestionIndex = 0;
let questions = [];
let correctAnswersCount = 0;
let userAttempts = 0;
let selectedSubject = "";
let maxQuestions = 10;
let lastWrongSelections = new Set();

// Fisher-Yates shuffle function
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

// Start quiz with selected subject and shuffle questions and options
function startQuiz() {
    selectedSubject = document.getElementById("subject-select").value;
    maxQuestions = parseInt(document.getElementById("question-count").value) || 10;

    fetch(`data/${selectedSubject}.json`)
        .then((response) => {
            if (!response.ok) throw new Error("JSON file not found");
            return response.json();
        })
        .then((data) => {
            if (data.length === 0) throw new Error("No questions available");

            shuffleArray(data); // Shuffle questions
            questions = data.slice(0, maxQuestions);
            questions.forEach(q => shuffleArray(q.options)); // Shuffle options

            currentQuestionIndex = 0;
            correctAnswersCount = 0;
            userAttempts = 0;
            lastWrongSelections.clear(); // Reset wrong selection tracking

            document.getElementById("quiz-container").style.display = "block";
            displayProgress();
            loadQuestion();
        })
        .catch((error) => {
            alert(`Error: ${error.message}`);
        });
}

// Load a question
function loadQuestion() {
    if (currentQuestionIndex >= questions.length) {
        showResults();
        return;
    }

    const questionData = questions[currentQuestionIndex];
    const questionElement = document.getElementById("question");
    questionElement.textContent = `Q. ${questionData.question}`;

    // Disable text selection for MCQ
    questionElement.style.userSelect = "none";
    questionElement.style.webkitUserSelect = "none";
    questionElement.style.mozUserSelect = "none";
    questionElement.style.msUserSelect = "none";

    const buttons = document.querySelectorAll(".option");
    buttons.forEach((button, index) => {
        button.textContent = questionData.options[index];
        button.style.backgroundColor = "#00ff00";
        button.disabled = false;

        const correctAnswer = questionData.answer || questionData.correct;
        button.onclick = () => checkAnswer(button, questionData.options[index], correctAnswer);
    });

    document.getElementById("feedback").textContent = "";
    document.getElementById("attempts").textContent = `You have 3 attempts.`;
    document.getElementById("attempts").style.display = "block";
    document.getElementById("next-btn").disabled = true;
}

// Check answer (Bug Fixed)
function checkAnswer(button, selectedAnswer, correctAnswer) {
    const feedback = document.getElementById("feedback");
    const attemptsText = document.getElementById("attempts");

    if (selectedAnswer === correctAnswer) {
        button.style.backgroundColor = "green";
        feedback.textContent = "✅ Correct!";
        correctAnswersCount++;
        document.getElementById("next-btn").disabled = false;
        attemptsText.style.display = "none";

        // Disable all buttons after correct answer
        document.querySelectorAll(".option").forEach((btn) => (btn.disabled = true));
        return;
    }

    // If the selected wrong option is new, count the attempt
    if (!lastWrongSelections.has(selectedAnswer)) {
        lastWrongSelections.add(selectedAnswer);
        userAttempts++;
    }

    button.style.backgroundColor = "red";

    if (userAttempts < 3) {
        feedback.textContent = `❌ Incorrect! ${3 - userAttempts} attempts left.`;
    } else {
        feedback.textContent = `❌ Incorrect! Correct answer: ${correctAnswer}`;
        document.getElementById("next-btn").disabled = false;
        attemptsText.style.display = "none";

        // Disable all buttons after max attempts
        document.querySelectorAll(".option").forEach((btn) => (btn.disabled = true));
    }
}

// Load next question
function nextQuestion() {
    userAttempts = 0;
    lastWrongSelections.clear(); // Reset wrong selections for new question
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        displayProgress();
        loadQuestion();
    } else {
        showResults();
    }
}

// Display progress
function displayProgress() {
    document.getElementById("progress").textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
}

// Show results and auto-refresh after 5 seconds
function showResults() {
    document.getElementById("quiz-container").innerHTML = `
        <h1>🎉 Quiz Complete!</h1>
        <p>You answered ${correctAnswersCount} out of ${questions.length} questions correctly!</p>
        <p>Thanks for participating!</p>
        <p>🔄 The quiz will restart in <span id="timer">5</span> seconds...</p>
    `;

    let countdown = 5;
    const timer = setInterval(() => {
        countdown--;
        document.getElementById("timer").textContent = countdown;
        if (countdown === 0) {
            clearInterval(timer);
            location.reload();
        }
    }, 1000);
}

// 🔒 Security: Prevent text copying and inspection
document.addEventListener("DOMContentLoaded", () => {
    document.addEventListener("contextmenu", (event) => event.preventDefault()); // Disable right-click

    document.addEventListener("keydown", (event) => {
        if (
            (event.ctrlKey && (event.key === "c" || event.key === "u" || event.key === "s" || event.key === "p")) ||
            (event.ctrlKey && event.shiftKey && (event.key === "I" || event.key === "J" || event.key === "C"))
        ) {
            event.preventDefault(); // Disable copy, inspect, source view, print
        }
    });
});
