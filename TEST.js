const uniformToggle = document.getElementById("mode-uniform");
const btnStep = document.getElementById("btn-step");
const btnReset = document.getElementById("btn-reset");
const inputS = document.getElementById("input-s");
const tRead = document.getElementById("t-read");
const vRead = document.getElementById("v-read");
const sRead = document.getElementById("s-read");
const firstCar = document.querySelector(".car");
const scene = document.querySelector(".scene");

let t = 0, s = 0, xPx = 0, marks = [];
const PX_PER_M = 4;

function addMark() {
    const leftPos = xPx + 30; 
    const mark = document.createElement("div");
    mark.className = "mark";
    mark.style.left = `${leftPos}px`;
    const label = document.createElement("div");
    label.className = "mark-label";
    label.style.left = `${leftPos}px`;
    label.textContent = `t=${t}, s=${s}`;
    scene.appendChild(mark);
    scene.appendChild(label);
    marks.push(mark, label);
}

function updateReadout(v) {
    tRead.textContent = t;
    vRead.textContent = v;
    sRead.textContent = s;
}

function resetExperiment() {
    t = 0; s = 0; xPx = 0;
    firstCar.style.transform = `translateX(0px)`;
    marks.forEach(el => el.remove());
    marks = [];
    updateReadout(inputS.value);
}

btnStep.addEventListener("click", () => {
    if (!uniformToggle.checked) return;
    const v = Number(inputS.value);
    t += 1;
    s += v;
    xPx += v * PX_PER_M;
    firstCar.style.transform = `translateX(${xPx}px)`;
    addMark();
    updateReadout(v);
});

btnReset.addEventListener("click", resetExperiment);
resetExperiment();