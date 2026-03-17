const minutos = document.getElementById('minutos');
const segundos = document.getElementById('segundos');
const som = document.getElementById("somAlerta");

function calcularTempoRestante() {
    let agora = new Date();

    let min = agora.getMinutes();
    let sec = agora.getSeconds();

    let totalSegundos = min * 60 + sec;

    let ciclo = 7 * 60;

    let offset = 2 * 60; // 👈 AJUSTE AQUI (baseado no jogo)

    let resto = (totalSegundos - offset) % ciclo;

    if (resto < 0) resto += ciclo;

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