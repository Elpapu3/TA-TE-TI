// Seleccionar todas las celdas
const celdas = document.querySelectorAll(".celda");
const resultadoEl = document.querySelector(".Resultado");

let turno = "X";         // Comienza X
let tablero = Array(9).fill(null);
let juegoTerminado = false;

// Combinaciones ganadoras
const COMBINACIONES = [
  [0,1,2],[3,4,5],[6,7,8], // filas
  [0,3,6],[1,4,7],[2,5,8], // columnas
  [0,4,8],[2,4,6]          // diagonales
];

// Manejar click en cada celda
celdas.forEach((celda, i) => {
  celda.addEventListener("click", () => {
    if (juegoTerminado || tablero[i]) return; // si ya hay algo o terminó el juego

    tablero[i] = turno;
    celda.textContent = turno;

    if (hayGanador()) {
      resultadoEl.textContent = `Ganó ${turno}`;
      juegoTerminado = true;
      return;
    }

    if (tablero.every(c => c)) {
      resultadoEl.textContent = "Empate";
      juegoTerminado = true;
      return;
    }

    // Cambiar turno
    turno = turno === "X" ? "O" : "X";
    resultadoEl.textContent = `Turno de ${turno}`;
  });
});

// Verificar ganador
function hayGanador() {
  return COMBINACIONES.some(comb => {
    const [a,b,c] = comb;
    return tablero[a] && tablero[a] === tablero[b] && tablero[a] === tablero[c];
  });
}
// Seleccionamos los botones
const reiniciar = document.getElementById("reiniciar");

// Función para reiniciar el juego
function reiniciarJuego() {
  tablero.fill(null);
  celdas.forEach(celda => celda.textContent = "");
  turno = "X";
  resultadoEl.textContent = `Turno de ${turno}`;
  juegoTerminado = false;
}

// Asociamos los botones a la función
reiniciar.addEventListener("click", reiniciarJuego);


