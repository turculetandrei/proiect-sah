function resetTabla() {

  
    piese[0] = ["♜","♞","♝","♛","♚","♝","♞","♜"];
  
    piese[1] = ["♟","♟","♟","♟","♟","♟","♟","♟"];
  
    for (let i = 2; i <= 5; i++) piese[i] = ["","","","","","","",""];
  
    piese[6] = ["♙","♙","♙","♙","♙","♙","♙","♙"];
  
    piese[7] = ["♖","♘","♗","♕","♔","♗","♘","♖"];
  
    creeazaTabla();
  
  }

  const tabla = document.getElementById("tabla");

const piese = [
  ["♜","♞","♝","♛","♚","♝","♞","♜"],
  ["♟","♟","♟","♟","♟","♟","♟","♟"],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["","","","","","","",""],
  ["♙","♙","♙","♙","♙","♙","♙","♙"],
  ["♖","♘","♗","♕","♔","♗","♘","♖"]
];

function creeazaTabla() {
  tabla.innerHTML = "";
  for (let i = 0; i < 8; i++) {
    const rand = document.createElement("div");
    rand.className = "flex";
    for (let j = 0; j < 8; j++) {
      const celula = document.createElement("div");
      celula.className = `w-16 h-16 flex items-center justify-center text-2xl ${
        (i + j) % 2 === 0 ? "bg-gray-200" : "bg-gray-800 text-white"
      }`;
      celula.textContent = piese[i][j];

      celula.addEventListener("mouseenter", () => {
        celula.classList.add("ring", "ring-yellow-400");
      });
      celula.addEventListener("mouseleave", () => {
        celula.classList.remove("ring", "ring-yellow-400");
      });

      rand.appendChild(celula);
    }
    tabla.appendChild(rand);
  }
}

function resetTabla() {
  piese[0] = ["♜","♞","♝","♛","♚","♝","♞","♜"];
  piese[1] = ["♟","♟","♟","♟","♟","♟","♟","♟"];
  for (let i = 2; i <= 5; i++) piese[i] = ["","","","","","","",""];
  piese[6] = ["♙","♙","♙","♙","♙","♙","♙","♙"];
  piese[7] = ["♖","♘","♗","♕","♔","♗","♘","♖"];
  creeazaTabla();
}

function afiseazaNumele() {
  const input = document.getElementById("numeInput");
  const afisare = document.getElementById("numeAfisat");
  afisare.textContent = "Jucator: " + input.value;
}

window.onload = creeazaTabla;