
const riddles = [
  { question: "Welches legendäre Schwert kann nur von jemandem geführt werden, der als Held der Zeit gilt (Zelda)?", answer: "master schwert", seal: "seal1.svg" },
  { question: "Was ergibt die Summe aus den Zahlen auf einem W20, wenn alle Seiten einmal vorkommen?", answer: "210", seal: "seal2.svg" },
  { question: "Welcher Zauberspruch aus Harry Potter öffnet verschlossene Türen?", answer: "alohomora", seal: "seal3.svg" },
  { question: "In Skyrim: Wie heißt der Drachenschrei für 'Feueratem'?", answer: "yol toor shul", seal: "seal4.svg" },
  { question: "Ein Palindrom aus vier Buchstaben, das auch ein Dungeon in Zelda sein könnte?", answer: "anna", seal: "seal5.svg" },
  { question: "Welcher Spieltitel beginnt mit einem Helden namens Geralt?", answer: "the witcher", seal: "seal6.svg" },
  { question: "Die ersten Buchstaben aller vorherigen Lösungen ergeben zusammen den Schlüssel für das letzte Siegel. Wie lautet es?", answer: "makyatk", seal: "seal7.svg" }
];

const hint = "Merke dir den Schlüssel zum öffnen dieses Siegels."

let solved = JSON.parse(localStorage.getItem("solved") || "[]");

function render() {
  const app = document.getElementById("app");
  app.innerHTML = "<div class='grid'></div>";
  const grid = app.querySelector(".grid");

  for (let i = 0; i < riddles.length; i++) {
    const isSolved = solved[i];
    const isOpen = i <= solved.filter(Boolean).length;
    const card = document.createElement("div");
    card.className = "card" + (isSolved ? " solved" : isOpen ? "" : " locked");
    card.style.backgroundImage = `url(${riddles[i].seal})`;
    if (isOpen) {
      card.onclick = () => showDialog(i);
    }
    grid.appendChild(card);
  }

  
  // Prüfen, ob alle Rätsel gelöst sind
  if (solved.length === riddles.length && solved.every(Boolean)) {
    const solution = document.createElement("div");
    solution.className = "solution";
    solution.innerText = "Nutze purple um die korrekte Schrift zu finden";
    app.appendChild(solution);
  }

}

function showDialog(i) {
  const r = riddles[i];
  const dialog = document.createElement("div");
  dialog.className = "dialog";
  dialog.innerHTML = `<h2>Siegel ${i + 1}</h2><p>${r.question}</p><p>${hint}</p><input type='text' id='answer'><button id='submit'>Antwort prüfen</button>`;
  const app = document.getElementById("app");
  app.innerHTML = "";
  app.appendChild(dialog);

  document.getElementById("submit").onclick = () => {
    const input = document.getElementById("answer").value.trim().toLowerCase();
    if (input === r.answer) {
      solved[i] = true;
      localStorage.setItem("solved", JSON.stringify(solved));
      render();
    } else {
      alert("Falsche Antwort!");
    }
  };
}

render();
