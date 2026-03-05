const participants = [
    ["G-101", "JONY CORTES"], ["G-102", "ATZIRI MEJIA"], ["G-103", "ALEXA CORONA"],
    ["G-104", "JUAN PÉREZ"], ["G-105", "MARÍA GARCÍA"], ["G-106", "CARLOS LÓPEZ"],
    ["G-107", "LUIS HERNÁNDEZ"], ["G-108", "ANA MARTÍNEZ"], ["G-110", "SOFÍA SÁNCHEZ"],
    ["G-111", "ROBERTO GÓMEZ"], ["G-112", "ELENA TORRES"]
];

let attempt = 1;
const btn = document.getElementById('draw-btn');
const nameEl = document.getElementById('current-name');
const folioEl = document.getElementById('current-folio');
const msgEl = document.getElementById('message-bar');
const attemptEl = document.getElementById('attempt');

function startRaffle() {
    if (participants.length < 3) return alert("Pocos participantes registrados.");

    btn.disabled = true;
    btn.style.opacity = "0.3";
    nameEl.style.color = "#fff";
    
    msgEl.innerText = attempt === 3 ? "¡ATENCIÓN! GENERANDO RESULTADO FINAL POR EL PREMIO MAYOR..." : `EXTRAYENDO BOLETO PARA ELIMINACIÓN #${attempt}...`;
    msgEl.style.color = attempt === 3 ? "gold" : "white";

    let duration = 5000; 
    let start = Date.now();
    
    function spin() {
        let elapsed = Date.now() - start;
        let progress = elapsed / duration;

        const random = participants[Math.floor(Math.random() * participants.length)];
        nameEl.innerText = random[1];
        folioEl.innerText = random[0];

        if (progress < 1) {
            // Easing de frenado: cada vez más lento
            let delay = 50 + (Math.pow(progress, 4) * 450);
            setTimeout(spin, delay);
        } else {
            resolve();
        }
    }
    spin();
}

function resolve() {
    const idx = Math.floor(Math.random() * participants.length);
    const selected = participants.splice(idx, 1)[0];

    nameEl.innerText = selected[1];
    folioEl.innerText = selected[0];

    if (attempt < 3) {
        // Mostrar aviso de eliminación tech
        document.getElementById('eliminated-name').innerText = selected[1];
        document.getElementById('eliminated-folio-txt').innerText = `FOLIO IDENTIFICADO: ${selected[0]}`;
        document.getElementById('eliminated-overlay').classList.remove('overlay-hidden');
    } else {
        // GANADOR FINAL
        nameEl.style.color = "gold";
        nameEl.style.textShadow = "0 0 50px gold";
        msgEl.innerText = "SISTEMA COMPLETADO: ¡GANADOR ALFA LOCALIZADO!";
        document.getElementById('winner-tag').classList.remove('hidden');
        launchCelebration();
    }
}

function closeOverlay() {
    document.getElementById('eliminated-overlay').classList.add('overlay-hidden');
    attempt++;
    attemptEl.innerText = attempt;
    btn.disabled = false;
    btn.style.opacity = "1";
    btn.querySelector('.text').innerText = attempt === 3 ? "¡ACTIVAR GIRO FINAL!" : "REANUDAR ESCANEO";
}

function launchCelebration() {
    const end = Date.now() + 6000;
    const colors = ['#D4AF37', '#ffffff', '#000000'];

    (function frame() {
        confetti({ particleCount: 5, angle: 60, spread: 55, origin: { x: 0, y: 0.7 }, colors: colors });
        confetti({ particleCount: 5, angle: 120, spread: 55, origin: { x: 1, y: 0.7 }, colors: colors });
        if (Date.now() < end) requestAnimationFrame(frame);
    }());
}


btn.addEventListener('click', startRaffle);
