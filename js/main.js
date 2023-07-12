"use strict";

let grigliaContainer; // Dichiarazione della variabile globale
const numCells = 100; // Numero totale di celle
const cellsPerRow = 10; // Numero di celle per riga
const numFiori = 16; // Numero di fiori nel gioco

// FUNZIONE GENERA GRIGLIA
function generaGriglia() {
  const griglia = document.getElementById("griglia");
  griglia.innerHTML = "";

  // CREO ELEMENT GRIGLIA
  grigliaContainer = document.createElement("div");
  grigliaContainer.classList.add("griglia-container");
  griglia.appendChild(grigliaContainer);

  // Calcolo la larghezza delle celle
  const cellWidth = `${100 / cellsPerRow}%`;

  // CICLO FOR + CREO ELEMENT CELLA
  for (let i = 1; i <= numCells; i++) {
    const cella = document.createElement("div");
    cella.classList.add("cella");
    cella.textContent = i;

    // Imposta la larghezza della cella
    cella.style.width = cellWidth;

    // Imposta l'attributo "data-fiore" sulla cella
    cella.dataset.fiore = "false";

    // ADD EVENT LISTENER CLICK - COLORO CELLA O TERMINO GIOCO
    cella.addEventListener("click", function () {
      if (cella.dataset.fiore === "true") {
        cella.classList.add("fiore-perduto");
        terminaGioco(false);
        alert("Hai perso!");
      } else {
        coloraCella(cella);
      }
    });

    // INSERISCO CELLA IN CONTAINER
    grigliaContainer.appendChild(cella);
  }

  // Genera array di numeri casuali per i fiori
  const fioriGenerati = generaNumeriCasuali(numFiori, numCells);

  // Aggiungi fiori alla griglia
  const celle = grigliaContainer.querySelectorAll(".cella");
  for (let i = 0; i < fioriGenerati.length; i++) {
    const indiceFiori = fioriGenerati[i];
    const cellaCorrente = celle[indiceFiori];
    cellaCorrente.classList.add("fiore");

    // Imposta l'attributo "data-fiore" sulla cella
    cellaCorrente.dataset.fiore = "true";
  }
}

// Funzione per generare un array di numeri casuali unici
function generaNumeriCasuali(numFiori, numCells) {
  const numeriCasuali = [];

  while (numeriCasuali.length < numFiori) {
    const numeroCasuale = Math.floor(Math.random() * numCells);
    if (!numeriCasuali.includes(numeroCasuale)) {
      numeriCasuali.push(numeroCasuale);
    }
  }

  return numeriCasuali;
}

// FUNZIONE TERMINA GIOCO
function terminaGioco(vittoria) {
  const celle = grigliaContainer.querySelectorAll(".cella");

  for (let i = 0; i < celle.length; i++) {
    celle[i].removeEventListener("click", coloraCella);
    celle[i].removeEventListener("click", terminaGioco);
    if (vittoria) {
      if (celle[i].dataset.fiore === "true") {
        celle[i].classList.add("fiore-vinto");
      }
    }
  }
}

// FUNZIONE COLORA CELLA
function coloraCella(cella) {
  if (cella.dataset.fiore !== "true") {
    cella.style.backgroundColor = "lightblue";
  }
}

// Aggiungi event listener al bottone "generaGriglia"
const btnGeneraGriglia = document.getElementById("generaGriglia");
btnGeneraGriglia.addEventListener("click", generaGriglia);
