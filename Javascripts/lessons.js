document.addEventListener('DOMContentLoaded', () => {
    // NPC itself
    const npcAssistant = document.getElementById('npc-assistant');
    const textElement = document.getElementById('npc-text');
    const nextBtn = document.getElementById('npc-next-btn');

    //close - show
    const closeBtn = document.getElementById('npc-close');
    const showBtn = document.getElementById('npc-show-btn');

    //minimize
    const minimizeBtn = document.getElementById('npc-minimize');
    const resizeHandle = document.getElementById('npc-resize-handle');
    const sidebar = document.querySelector('.sidebar');

    // Example task
    const solutionBtn = document.getElementById('show-solution-btn'); 
    const solutionText = document.getElementById('solution-text');

    

    let currentStep = 0;
    let activeSection = "";

    const texts = {
        section2: [
            "Тоест отправно тяло е това тяло, от чиято гледна точка определяме дали други тела се движат. <p> Пример: има една баба, която вижда дете да кара скейтборд: <p>  ● Ако определим бабата за отправното тяло - според нея детето И скейтборда се движат. Тя вижда детето да се премества от началното си положението.",
           
            "● Ако определим детето за отправното тяло - според него бабата се движи - през неговата гледна точка всичко около него се движи (то е отправното тяло). Въпреки това, че действително то извършва движение, то е оправното тяло и зареди това се определяме според него, а не според други тела.",
            " Също така според него скейтборда не се движи - през неговата гледна точка скейтборда е в покой (действително детето и движещата се дъска извършват едно и също движение и имат еднаква скорост - затова илюзията, че според детето скейтборда не се движи, е вярно само ако то е отправното тяло )"
        ],
        section3: [
            "!!ВАЖНО, ЗАПОМНИ!! - основните мерни единици са единиците SI, които са международна система за измерване на единиците. Те най-основно се използват във Физиката.",
            "Когато искаме да посочим мерната единица на величината, ограждаме я в квадратни скоби.",
            " Когато едно буквено означение се каже, че е 'константа' това означава, че то има постоянна една и съща стойност, която не се променя.  <p> Обаче при случаи, които скоростта е НЕравномерна, тогава скоростта има променлива стойност. (В един момент може да е 5м/сек, а в друг да е 20м/сек).",
            "Този символ 'Δ' се нарича делта и във Физиката се използва в моменти, когато искаме да намерим само частта, в която е използвана някоя величина.", 
            " Пример: когато намираме Δt, ние искаме да намерим само тази част от времето, която ни е нужна. Делта време се намира като от цялото време извадиш времето, което не включваш. ",
            "Често това време, което се изважда, е т.н. 'Начално Време', което се бележи: t₀. Когато искаме да уточним само началото на някоя величина, след нея пишем малко 'о'."
        ],
        section4: [
            "При решаване на тези видове задачи първо пишем дадените величини: S = 250 км. Това е целият път, който ни трябва при намирането на средната скорост, тоест ще ни е от полза.",
            "!!НО ПЪТЯТ НЕ Е ИЗПОЛЗВАН В ОСНОВНАТА СИ МЕРНА ЕДИНИЦА (SI)!! => S = 250 км = 250*10³ м понеже 1 км = 1000 м = 10³ м. ",
            "Друго дадено: t₁ = 1 ч, t₂ = 2 ч. Със сумата на тези времена получаваме цялото време: t = t₁ + t₂ = 3 ч.",
            "ДА НЕ ЗАБРАВИМ SI! t = 3 ч = 3*60 = 180 мин = 180*60 = 10 800 сек. (1ч = 60мин = 3600сек).",
            "Сега да намерим средната скорост: Vср = S/Δt. Тъй като имаме цялото време, Δt = t - t&#8323;, където t&#8323; = 0, защото ние нямаме какво да извадим -> ние си имаме цялото време (t), от което се нуждаем при средната скорост",
            "Финално пресмятаме: Vср = (250*10³) / 10 800. Вече имаме всички данни в SI единици!",
            "Крайната стойност, която получаваме е ≈ 23.148 м/сек"
        ]
    };


    if (solutionBtn) {
    solutionBtn.addEventListener('click', () => {
        if (solutionText.style.display === 'none') {
            solutionText.style.display = 'block';
            solutionBtn.textContent = 'Скрий решението';
            
            if (window.MathJax) {
                MathJax.typesetPromise([solutionText]);
            }
        } else {
            solutionText.style.display = 'none';
            solutionBtn.textContent = 'Решение';
        }
    });
}

    closeBtn.addEventListener('click', () => {
        npcAssistant.style.display = 'none';
        showBtn.style.display = 'flex';
    });

    showBtn.addEventListener('click', () => {
        npcAssistant.style.display = 'block';
        npcAssistant.classList.remove('minimized-left');
        document.body.appendChild(npcAssistant);
        showBtn.style.display = 'none';
        npcAssistant.style.width = '850px';
    });

    minimizeBtn.addEventListener('click', () => {
        const isMinimized = npcAssistant.classList.toggle('minimized-left');
        if (isMinimized) {
            sidebar.appendChild(npcAssistant); 
            minimizeBtn.textContent = '➡️';
            npcAssistant.style.width = '100%';
        } else {
            document.body.appendChild(npcAssistant);
            npcAssistant.style.width = '850px';
            minimizeBtn.textContent = '⬅️';
        }
    });

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            currentStep++;
            if (texts[activeSection] && currentStep < texts[activeSection].length) {
                textElement.innerHTML = texts[activeSection][currentStep];
            }
            if (currentStep === (texts[activeSection] ? texts[activeSection].length - 1 : 0)) {
                nextBtn.style.display = 'none';
            }
        });
    }

    textElement.addEventListener('click', (e) => {
        if (e.target && e.target.id === 'npc-hints-btn') {
            textElement.innerHTML = texts.section4[0];
            nextBtn.style.display = 'block';
        }
    });

    window.addEventListener('scroll', function() {
        const sections = ['section1', 'section2', 'section3', 'section4'];
        const triggerPoint = window.innerHeight / 2;

        sections.forEach(id => {
            const section = document.getElementById(id);
            if (!section) return;
            const rect = section.getBoundingClientRect();

            if (rect.top <= triggerPoint && rect.bottom >= triggerPoint) {
                if (activeSection !== id) {
                    activeSection = id;
                    currentStep = 0;
                    
                    if (id === "section1") {
                        nextBtn.style.display = 'none';
                        textElement.innerHTML = "Виж сега... когато едно тяло изменя положението си <i>(тоест то се мести и си променя началната точка)</i>, след някакъв период от време, то това се нарича Механично движение.";
                    } else if (id === "section4") {
                        textElement.innerHTML = "Ето и една примерна задача, която да решиш. Успех! <br> <button id='npc-hints-btn'; style='background:#0a58ca; color:white; border:none; padding:5px 10px; border-radius:5px; margin-top:10px; cursor:pointer;'>Насоки</button>";
                        nextBtn.style.display = 'none';
                    } else if (texts[id]) {
                        textElement.innerHTML = texts[id][0];
                        nextBtn.style.display = 'block';
                    }
                }
            }
        });
    });
});