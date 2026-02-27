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

    function updateClock() {
        const clockElement = document.getElementById('live-clock');
        if (clockElement) {
            const now = new Date();
            const hours = String(now.getHours()).padStart(2, '0');
            const minutes = String(now.getMinutes()).padStart(2, '0');
            const seconds = String(now.getSeconds()).padStart(2, '0');
            
            clockElement.textContent = `${hours}:${minutes}:${seconds}`;
        }
    }
    setInterval(updateClock, 1000);
    updateClock();

    const physicsFacts = [
        "Светлината пътува с 299,792,458 метра в секунда.",
        "Атомите са 99.9999999% празно пространство.",
        "Венера е единствената планета, която се върти по часовниковата стрелка.",
        "Диамантите са най-твърдият естествен материал.",
        "Една чаена лъжичка от неутронна звезда би тежала 6 милиарда тона.",
        "Скоростта на светлината във вакуум е точно 299,792,458 метра в секунда.",
        "На Юпитер и Сатурн валят дъждове от диаманти.",
        "Единствената буква, която не присъства в Периодичната таблица на елементите, е буквата J.",
        "Водата може едновременно да кипи и да замръзва – това се нарича тройна точка.",
        "На Марс залезите изглеждат сини, а не червени.",
        "Звукът се движи около 4 пъти по-бързо във вода, отколкото във въздух.",
        "В космоса два метала се заваряват сами чрез процеса студено заваряване.",
        "Сатурн е толкова лек, че ако имаше достатъчно голям океан, планетата би плувала в него.",
        "Гравитацията на Луната е само 1/6 от тази на Земята.",
        "Светлината от Слънцето пътува до нас 8 минути и 20 секунди.",
        "Галактиката Млечен път и Андромеда ще се сблъскат след около 4 милиарда години."
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

    setTimeout(() => {
        const progressBar = document.getElementById('user-progress');
        const progressPercent = document.querySelector('.progress-percent');
        
        if (progressBar) progressBar.style.width = "100%"; 
        if (progressPercent) progressPercent.textContent = "100%";
    }, 2000);
});