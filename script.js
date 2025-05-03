(function(){
    // The Functions
    function beginQuiz(){
        // The variable to store  HTML output
        const output = [];

        // for all question...
        myQuestions.forEach(
            (presentQuestion, question_Number) => {

                // The variable to store  list of possible answers
                const answers = [];

                // and for all available answer...
                for(letter in presentQuestion.answers){

                    // ...add an HTML radio button
                    answers.push(
                        `<label>
                            <input type="radio" name="question${question_Number}" value="${letter}"/>
                            ${letter} :
                            ${presentQuestion.answers[letter]}
                        </label>`
                    );
                }

                // add this question and its answers to output
                output.push(
                    `<div class="slide">
                        <div class="question"> ${presentQuestion.question} </div>
                        <div class="answers"> ${answers.join("")} </div>
                    </div>`
                );
            }
        );

        // finally combine our output the list into one string of HTML and put it on the page
        quizContainer.innerHTML = output.join('');
    }

    function showResults(){

        // gather answer containers from our quiz
        const answerContainers = quizContainer.querySelectorAll('.answers');

        // keep track of the user's answers
        let num_Correct = 0;

        // for all question...
        myQuestions.forEach( (presentQuestion, question_Number) => {

            // find selected answer
            const answerContainer = answerContainers[question_Number];
            const selector = `input[name=question${question_Number}]:checked`;
            const userAnswer = (answerContainer.querySelector(selector) || {}).value;

            // if answer is correct
            if(userAnswer === presentQuestion.correctAnswer){
                // add to  number of the correct answers
                num_Correct++;

                // color the answers green
                answerContainers[question_Number].style.color = 'lightgreen';
            }
            // if answer is blank or wrong
            else{
                // color the answers red
                answerContainers[question_Number].style.color = 'red';
            }
        });

        // show number of right answers out of total
        resultsContainer.innerHTML = `${num_Correct} out of ${myQuestions.length}`;
    }

    function showSlide(n) {
        theSlides[presentSlide].classList.remove('active-slide');
        theSlides[n].classList.add('active-slide');
        presentSlide = n;
        if(presentSlide === 0){
            pastButton.style.display = 'none';
        }
        else{
            pastButton.style.display = 'inline-block';
        }
        if(presentSlide === theSlides.length-1){
            nextButton.style.display = 'none';
            submitButton.style.display = 'inline-block';
        }
        else{
            nextButton.style.display = 'inline-block';
            submitButton.style.display = 'none';
        }
    }

    function show_Next_Slide() {
        showSlide(presentSlide + 1);
    }

    function show_PreviousSlide() {
        showSlide(presentSlide - 1);
    }

    // The Variables
    const quizContainer = document.getElementById('quizes');
    const resultsContainer = document.getElementById('scores');
    const submitButton = document.getElementById('finish');
    const myQuestions = [
        {
            question: "What does HTML stand for?",
            answers: {
                a: "Hyperlinks and Text Markup language",
                b: "Home Tool Markup Language",
                c: "Hyper Text Markup Language",
                d: "Hyper To Markup Language"
            },
            correctAnswer: "c"
        },
        {
            question: "What is the color of An apple?",
            answers: {
                a: "Brown",
                b: "Blue",
                c: "Orange",
                d: "Red"
            },
            correctAnswer: "d"
        },
        {
            question: "What is the currency of Bahrain ?",
            answers: {
                a: "Yen",
                b: "Dinar",
                c: "Won",
                d: "dirham"
            },
            correctAnswer: "b"
        },
        {
            question: "What is the currency of UAE ?",
            answers: {
                a: "Yen",
                b: "Dinar",
                c: "Dirham",
                d: "Dolar"
            },
            correctAnswer: "c"
        },
        {
            question: "What is the currency of USA?",
            answers: {
                a: "Yen",
                b: "Dinar",
                c: "Dolar",
                d: "dirham"
            },
            correctAnswer: "c"
        }
    ];

    // Kick things off
    beginQuiz();

    
    const pastButton = document.getElementById("previousQuestion");
    const nextButton = document.getElementById("nextQuestion");
    const theSlides = document.querySelectorAll(".slide");
    let presentSlide = 0;

    // Show  first slide
    showSlide(presentSlide);

    submitButton.addEventListener('click', showResults);
    pastButton.addEventListener("click", show_PreviousSlide);
    nextButton.addEventListener("click", show_Next_Slide);
})();