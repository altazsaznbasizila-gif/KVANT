function calculateGrade() {
    let totalPoints = 0;
    const questions = document.querySelectorAll('.question-block');

    questions.forEach((block) => {
        const inputs = block.querySelectorAll('input[type="radio"]');
        let selectedInput = block.querySelector('input[type="radio"]:checked');
        
        inputs.forEach((input) => {
            const label = input.parentElement;
            const value = parseFloat(input.value);

            if (value > 0) {
                label.classList.add('correct');
            }

            if (selectedInput && input === selectedInput && value === 0) {
                label.classList.add('wrong');
            }
        });

        if (selectedInput) {
            totalPoints += parseFloat(selectedInput.value);
        }
    });

    const openInputs = document.querySelectorAll('.open-answer');
    openInputs.forEach((input) => {
        const userAnswer = parseFloat(input.value);
        const correctAnswer = parseFloat(input.dataset.answer);

        if (userAnswer === correctAnswer) {
            totalPoints += 2;
            input.classList.add('correct');
        } else {
            input.classList.add('wrong');
        }
    });

    let grade = 2;
    let color = "#ff0019";
    let typeText = "";

    if (totalPoints >= 26.5) {
        grade = 6;
        color = "#00ff3c";
        typeText = 'Отличен';
    } else if (totalPoints >= 22.5) {
        grade = 5;
        color = "#00ddff";
        typeText = 'Много Добър';
    } else if (totalPoints >= 16.5) {
        grade = 4;
        color = "#ffbf00";
        typeText = 'Добър';
    } else if (totalPoints >= 11.5) {
        grade = 3;
        color = "#ff7300";
        typeText = 'Среден';
    } else {
        grade = 2;
        color = "#ff0019";
        typeText = 'Слаб';
    }

    const resultBox = document.getElementById('result-box');
    const scoreDisplay = document.getElementById('score-text');
    const gradeDisplay = document.getElementById('grade-text');

    resultBox.classList.remove('hidden');
    scoreDisplay.innerText = `Твоите точки: ${totalPoints} от 30т`;
    
    gradeDisplay.innerText = `Оценка: ${typeText} ${grade}`;
    gradeDisplay.style.color = color;

    resultBox.scrollIntoView({ behavior: 'smooth' });
}