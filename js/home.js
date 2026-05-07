document.addEventListener('DOMContentLoaded', () => {
    
    const loader = document.getElementById('loading-screen');
    if (loader) {
        if (!sessionStorage.getItem('visited')) {
            setTimeout(function() {
                loader.style.opacity = '0';
                setTimeout(() => {
                    loader.style.display = 'none';
                }, 500);
                sessionStorage.setItem('visited', 'true');
            }, 1000); 
        } else {
            loader.style.display = 'none';
        }
    }



    const physicsFacts = [
        "При равноускорително движение ускорението е постоянна величина с положителен знак.",
    "Скоростта се увеличава с еднакви стойности за равни интервали време.",
    "При равнозакъснително движение ускорението е насочено обратно на посоката на движение.",
    "Скоростта намалява равномерно докато тялото спре напълно в даден момент.",
    "Ускорението показва промяната на скоростта на тялото за единица време.",
    "Моментната скорост е скоростта в точно определен момент от времето.",
    "Спидометърът в колата ни показва моментната скорост в реално време.",
    "Векторът на моментната скорост винаги е допирателен към самата траектория.",
    "При равномерно движение средната и моментната скорост са напълно еднакви.",
    "Свободното падане е движение под влияние само на земното притегляне.",
    "Всички тела падат с еднакво ускорение при липса на въздух.",
    "Земното ускорение има средна стойност от девет цяло осемдесет и едно.",
    "Масата на телата не влияе върху скоростта при свободно падане.",
    "Пътят при свободно падане зависи правопропорционално от квадрата на времето.",
    "Във вакуум перо и оловно топче падат за еднакво време.",
    "Галилео Галилей първи доказва законите за движението на падащите тела.",
    "При вертикално хвърляне нагоре скоростта в най-високата точка е нула.",
    "Ускорението при свободно падане е насочено винаги право към центъра.",
    "Графиката на скоростта при равноускорително движение е винаги наклонена права.",
    "Разстоянието се увеличава бързо поради постоянното нарастване на моментната скорост.",
    ];

    function updateFact() {
        const factText = document.getElementById('daily-fact');
        if (factText) {
            const randomFact = physicsFacts[Math.floor(Math.random() * physicsFacts.length)];
            factText.style.opacity = 0;
            setTimeout(() => {
                factText.textContent = randomFact;
                factText.style.opacity = 1;
            }, 500);
        }
    }
    
    if (document.getElementById('daily-fact')) {
        setInterval(updateFact, 8000);
        updateFact();
    }
});



function getTodayDate() {
    return new Date().toISOString().split('T')[0];
}

const today = getTodayDate();
const savedDate = localStorage.getItem('kvantDate');
let totalSeconds = parseInt(localStorage.getItem('kvantTime')) || 0;

if (savedDate !== today) {
    totalSeconds = 0;
    localStorage.setItem('kvantTime', 0);
    localStorage.setItem('kvantDate', today);
}

function updateTimer() {
    totalSeconds++;
    localStorage.setItem('kvantTime', totalSeconds);

    let hours = Math.floor(totalSeconds / 3600);
    let minutes = Math.floor((totalSeconds % 3600) / 60);
    let seconds = totalSeconds % 60;

    const displayH = hours < 10 ? "0" + hours : hours;
    const displayM = minutes < 10 ? "0" + minutes : minutes;
    const displayS = seconds < 10 ? "0" + seconds : seconds;

    const timerElement = document.getElementById("session-timer");
    if (timerElement) {
        timerElement.innerText = `${displayH}:${displayM}:${displayS}`;
    }
}

function info() {
    const trigger = document.getElementById('img-info');
    const box = document.getElementById('info-box');

    if (trigger && box) {
        trigger.addEventListener('mouseenter', () => {
            box.style.opacity = '1';
            box.style.visibility = 'visible';
            box.style.transform = 'translateY(0)';
        });

        trigger.addEventListener('mouseleave', () => {
            box.style.opacity = '0';
            box.style.visibility = 'hidden';
            box.style.transform = 'translateY(-5px)';
        });
    }
}

window.onload = info;

info();
updateTimer();
setInterval(updateTimer, 1000);