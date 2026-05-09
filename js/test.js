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
        grade = 6.00;
        color = "#00ff3c";
        typeText = 'Отличен';
    } else if (totalPoints >= 23) {
        grade = 5.50;
        color = "#00ff3c"; 
        typeText = 'Отличен';
    } else if (totalPoints >= 22.5) {
        grade = 5.00;
        color = "#00ddff";
        typeText = 'Много Добър';
    } else if (totalPoints >= 16.5) {
        grade = 4.00;
        color = "#ffbf00";
        typeText = 'Добър';
    } else if (totalPoints >= 11.5) {
        grade = 3.00;
        color = "#ff7300";
        typeText = 'Среден';
    } else {
        grade = 2.00;
        color = "#ff0019";
        typeText = 'Слаб';
    }

    const resultBox = document.getElementById('result-box');
    const scoreDisplay = document.getElementById('score-text');
    const gradeDisplay = document.getElementById('grade-text');

    resultBox.classList.remove('hidden');
    scoreDisplay.innerText = `Твоите точки: ${totalPoints} от 28т`;
    
    gradeDisplay.innerText = `Оценка: ${typeText} ${grade}`;
    gradeDisplay.style.color = color;

    resultBox.scrollIntoView({ behavior: 'smooth' });


    localStorage.setItem('test1Grade', grade);
    localStorage.setItem('hasNewReward', 'true'); 

}


let testGrades = {
    test1: 0.00,
    test2: 0.00
};

function checkSavedUnlocks() {
    const savedGrade1 = localStorage.getItem('test1Grade');
    const hasNew = localStorage.getItem('hasNewReward');
    const badge = document.getElementById('inventory-badge');

    if (savedGrade1 !== null) {
        let g1 = parseFloat(savedGrade1);
        if (g1 >= 6.00) {
            unlock("reward1");
            unlock("reward2");
        } else if (g1 >= 5.50) {
            unlock("reward2");
        }
    }

    if (hasNew === 'true' && savedGrade1 !== null && badge) {
        badge.classList.remove('hidden');
    }
}

function clearNotification() {
    const badge = document.getElementById('inventory-badge');
    if (badge) {
        badge.classList.add('hidden');
    }
    localStorage.setItem('hasNewReward', 'false');
}

function unlock(id) {
    const element = document.getElementById(id);
    if (element) {
        element.classList.remove("locked");
        element.classList.add("unlocked");

        const img = element.querySelector('img');
        if (img) {
            img.src = "./Images/skill_unlock.png";
            img.style.width = "7vw";
            img.style.height = "3.5vw";
        }
    }
}

window.addEventListener('DOMContentLoaded', checkSavedUnlocks);

function finishTest1(grade) {
    testGrades.test1 = grade;
    checkUnlocks();
}

function finishTest2(grade) {
    testGrades.test2 = grade;
    checkUnlocks();
}
