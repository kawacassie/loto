// Création d'un tableau avec tous les nombres possibles de 1 à 90
const numbers = Array.from({ length: 90 }, (_, i) => i + 1);

// Fonction pour choisir un nombre aléatoire et le retirer du tableau des nombres disponibles
function pickNumber(numbers) {
  const randomIndex = Math.floor(Math.random() * numbers.length);
  const [number] = numbers.splice(randomIndex, 1);
  return number;
}

// Création d'un tableau avec 15 chiffres choisis aléatoirement
const chosenNumbers = Array.from({ length: 15 }, () => pickNumber(numbers));

// Fonction pour créer une ligne de 9 cases, dont 5 avec des chiffres choisis aléatoirement
function createRow() {
  const row = [];
  const emptyCells = [0, 0, 0, 0, 0, 1, 1, 1, 1];
  emptyCells.sort(() => Math.random() - 0.5);
  for (let i = 0; i < 9; i++) {
    if (emptyCells[i]) {
      row.push('<div class="empty-cell"></div>');
    } else {
      const number = pickNumber(chosenNumbers);
      row.push(`<div>${number}</div>`);
    }
  }
  return row.join('');
}

// Création de la grille de loto
const grid = document.querySelector('#grid');
for (let i = 0; i < 3; i++) {
  const row = createRow();
  grid.insertAdjacentHTML('beforeend', row);
}

// Récupération des éléments HTML nécessaires
const jouerButton = document.getElementById("jouer");
const resultatsDiv = document.getElementById("resultats");

// Déclaration d'un tableau pour stocker les nombres déjà tirés
let numerosTires = [];

// Fonction qui génère un nombre aléatoire entre 1 et 90, en évitant les doublons
function tirageNumero() {
  let numero;
  do {
    numero = Math.floor(Math.random() * 90) + 1;
  } while (numerosTires.includes(numero)); // tant que le numéro est déjà dans le tableau, on recommence
  numerosTires.push(numero); // on ajoute le numéro au tableau des numéros déjà tirés
  return numero;
}

// Fonction qui affiche le numéro tiré dans la liste des résultats
function afficherResultat(numero) {
  const resultatElement = document.createElement("span");
  resultatElement.innerText = numero + " - ";
  resultatsDiv.insertBefore(resultatElement, resultatsDiv.firstChild);

  // on ajoute un élément span supplémentaire à la fin de la liste, qui ne contient pas de tiret
  const finElement = document.createElement("span");
  finElement.innerText = "";
  resultatsDiv.appendChild(finElement);
}

// Fonction qui gère le clic sur le bouton "Jouer"
function onClickJouer() {
  const numeroTire = tirageNumero();
  afficherResultat(numeroTire);
}

// Ajout d'un gestionnaire d'événement sur le bouton "Jouer"
jouerButton.addEventListener("click", onClickJouer);

// Récupération de tous les éléments de la grille
const cells = document.querySelectorAll("#grid div");

// Fonction qui colore en vert une cellule contenant un numéro tiré
function colorerCellule(numero) {
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].textContent == numero) {
      cells[i].style.backgroundColor = "lightgreen";
    }
  }
}

// Fonction qui compare les numéros tirés aux numéros de la grille et colore en vert les cellules correspondantes
function verifierGrille() {
  for (let i = 0; i < numerosTires.length; i++) {
    colorerCellule(numerosTires[i]);
  }
}

// Événement déclenché par le bouton "Jouer"
jouerButton.addEventListener("click", () => {
  // Tirage d'un nouveau numéro
  const numero = tirageNumero();

  // Affichage du résultat
  afficherResultat(numero);

  // Vérification de la grille
  verifierGrille();
});
