let gameMode = '';
let player1Name = '';
let player2Name = '';

function setup() {
  createCanvas(600, 400);
  // Centrare canvas folosind CSS
  let c = document.getElementsByTagName('canvas')[0];
  c.style.display = 'block';
  c.style.margin = '40px auto';
  c.style.borderRadius = '20px';
  c.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.37)';
  c.style.background = 'rgba(255,255,255,0.7)';
  c.style.backdropFilter = 'blur(6px)';
  c.style.border = '1px solid #b0c4de';
  textAlign(CENTER, CENTER);
  textSize(24);
}


function draw() {
  // Fundal gradient
  setGradient(0, 0, width, height, color(58,123,213), color(0,210,255), 1);
  fill(0, 51, 102, 180);
  noStroke();
  rect(30, 30, width-60, height-60, 30);
  fill(255);
  textSize(32);
  text("Mod Joc", width / 2, 70);
  textSize(24);
  

  // Buton PvP
  drawButton(150, 120, 150, 50, "Player vs Player", gameMode === 'pvp');
  // Buton PvB
  drawButton(300, 120, 150, 50, "Player vs Bot", gameMode === 'pvb');

  // Câmpuri input nume
  if (gameMode !== '') {
    drawInput(150, 210, 300, 40, player1Name || "Nume Jucator 1", gameMode !== 'pvp' || mouseY <= 250);
    if (gameMode === 'pvp') {
      drawInput(150, 270, 300, 40, player2Name || "Nume Jucator 2", mouseY > 250);
    }
    // Buton Start Joc
    drawButton(150, 340, 300, 40, "Start Joc", false, true);
  }
}

// Functie pentru gradient de fundal
function setGradient(x, y, w, h, c1, c2, axis) {
  noFill();
  for (let i = y; i <= y + h; i++) {
    let inter = map(i, y, y + h, 0, 1);
    let c = lerpColor(c1, c2, inter);
    stroke(c);
    line(x, i, x + w, i);
  }
  
}

// Functie pentru butoane moderne
function drawButton(x, y, w, h, label, selected, isStart) {
  push();
  strokeWeight(selected ? 4 : 2);
  stroke(selected ? '#00d2ff' : '#b0c4de');
  fill(selected ? '#0077b6' : (isStart ? '#43aa8b' : '#1e3c72'));
  rect(x, y, w, h, 16);
  fill(255);
  textSize(isStart ? 26 : 20);
  text(label, x + w / 2, y + h / 2);
  pop();
}

// Functie pentru input vizual modern
function drawInput(x, y, w, h, label, active) {
  push();
  strokeWeight(active ? 3 : 1);
  stroke(active ? '#00d2ff' : '#b0c4de');
  fill(255, 255, 255, 220);
  rect(x, y, w, h, 12);
  fill('#1e3c72');
  textSize(20);
  text(label, x + w / 2, y + h / 2);
  pop();
}


function mousePressed() {
  // Click pe buton PvP
  if (mouseX >= 150 && mouseX <= 300 && mouseY >= 120 && mouseY <= 170) {
    gameMode = 'pvp';
  }
  // Click pe buton PvB
  if (mouseX >= 300 && mouseX <= 450 && mouseY >= 120 && mouseY <= 170) {
    gameMode = 'pvb';
  }
  // Click pe buton Start Joc
  if (mouseX >= 150 && mouseX <= 450 && mouseY >= 340 && mouseY <= 380 && gameMode !== '') {
    if (!player1Name) {
      alert("Introdu numele Jucatorului 1!");
      return;
    }
    if (gameMode === 'pvp' && !player2Name) {
      alert("Introdu numele Jucatorului 2!");
      return;
    }
    localStorage.setItem('gameMode', gameMode);
    localStorage.setItem('player1Name', player1Name);
    localStorage.setItem('player2Name', gameMode === 'pvp' ? player2Name : 'Calculator');
    window.location.href = 'chess.html';
  }
}

function keyPressed() {
  if (gameMode === '') return;
  if (keyCode === BACKSPACE) {
    if (mouseY > 270 && gameMode === 'pvp') {
      player2Name = player2Name.slice(0, -1);
    } else {
      player1Name = player1Name.slice(0, -1);
    }
  } else if (key.length === 1) {
    if (mouseY > 270 && gameMode === 'pvp') {
      player2Name += key;
    } else {
      player1Name += key;
    }
  }
}