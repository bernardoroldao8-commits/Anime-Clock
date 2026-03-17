const minutos = document.getElementById('minutos');
const segundos = document.getElementById('segundos');

function calcularTempoRestante() {
    let agora = new Date();

    let min = agora.getMinutes();
    let sec = agora.getSeconds();

    let totalSegundos = min * 60 + sec;

    let ciclo = 10 * 60; // 7 minutos = 420 segundos

    let resto = totalSegundos % ciclo;

    return ciclo - resto;
}

let tempo = calcularTempoRestante();

function atualizarTimer() {
    let min = Math.floor(tempo / 60);
    let sec = tempo % 60;

    minutos.textContent = String(min).padStart(2, '0');
    segundos.textContent = String(sec).padStart(2, '0');

    tempo--;

    if (tempo < 0) {
        tempo = 7 * 60;

        som.play();

        minutos.textContent = "✔";
        segundos.textContent = "GO";

        document.querySelector(".relogio").classList.add("ativo");

        setTimeout(() => {
            document.querySelector(".relogio").classList.remove("ativo");
        }, 3000);
    }
}

setInterval(atualizarTimer, 1000);

setInterval(() => {
    tempo = calcularTempoRestante();
}, 10000);


const som = document.getElementById("somAlerta");
som.currentTime = 0;
som.play();
document.body.addEventListener("click", () => {
    som.play().then(() => {
        som.pause();
        som.currentTime = 0;
    }).catch(() => { });
}, { once: true });
som.volume = 0.5;