let chessBoard;

function setup() {
  createCanvas(600, 700);
  // Centrare canvas folosind CSS
  let c = document.getElementsByTagName('canvas')[0];
  c.style.display = 'block';
  c.style.margin = '40px auto';
  c.style.position = 'absolute';
  c.style.top = '50%';
  c.style.left = '50%';
  c.style.transform = 'translate(-50%, -50%)';
  c.style.borderRadius = '20px';
  c.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.37)';
  c.style.background = 'rgba(255,255,255,0.7)';
  c.style.backdropFilter = 'blur(6px)';
  c.style.border = '1px solid #b0c4de';
  chessBoard = new ChessBoard();
}

function draw() {
  chessBoard.draw();
}


function mousePressed() {
  chessBoard.handleClick(mouseX, mouseY);
}

class ChessPiece {
  constructor(type, color, position) {
    this.type = type;
    this.color = color;
    this.position = position;
    this.hasMoved = false;
  }

  isValidMove(newPosition, board) {
    return false;
  }

  draw(x, y, squareSize) {
    let symbol = this.getSymbol();
    textAlign(CENTER, CENTER);
    textSize(squareSize * 0.6);
    fill(this.color === "white" ? 255 : 0);
    text(symbol, x + squareSize / 2, y + squareSize / 2);
  }
  

  getSymbol() {
    const symbols = {
      pawn: { white: '♙', black: '♟' },
      rook: { white: '♖', black: '♜' },
      knight: { white: '♘', black: '♞' },
      bishop: { white: '♗', black: '♝' },
      queen: { white: '♕', black: '♛' },
      king: { white: '♔', black: '♚' }
    };
    return symbols[this.type][this.color];
  }
}

class Pawn extends ChessPiece {
  constructor(color, position) {
    super("pawn", color, position);
  }

  isValidMove(newPosition, board) {
    const x = this.position.x;
    const y = this.position.y;
    const newX = newPosition.x;
    const newY = newPosition.y;
    // Verificare limite tabla
    if (newX < 0 || newX > 7 || newY < 0 || newY > 7) return false;
    const direction = this.color === "white" ? -1 : 1;
    const startRow = this.color === "white" ? 6 : 1;

    if (newX === x && !board[newY][newX]) {
      if (newY === y + direction) return true;
      if (y === startRow && newY === y + 2 * direction && !board[y + direction][x]) return true;
    }
    if (Math.abs(newX - x) === 1 && newY === y + direction) {
      if (board[newY][newX] && board[newY][newX].color !== this.color) return true;
    }
    return false;
  }
}

class Rook extends ChessPiece {
  constructor(color, position) {
    super("rook", color, position);
  }

  isValidMove(newPosition, board) {
    const x = this.position.x;
    const y = this.position.y;
    const newX = newPosition.x;
    const newY = newPosition.y;
    // Verificare limite tabla
    if (newX < 0 || newX > 7 || newY < 0 || newY > 7) return false;
    if (x !== newX && y !== newY) return false;
    const stepX = x === newX ? 0 : (newX > x ? 1 : -1);
    const stepY = y === newY ? 0 : (newY > y ? 1 : -1);
    let currX = x + stepX;
    let currY = y + stepY;
    while (currX !== newX || currY !== newY) {
      if (currX < 0 || currX > 7 || currY < 0 || currY > 7) return false;
      if (board[currY][currX]) return false;
      currX += stepX;
      currY += stepY;
    }
    return (!board[newY][newX] || board[newY][newX].color !== this.color);
  }
}

class Knight extends ChessPiece {
  constructor(color, position) {
    super("knight", color, position);
  }

  isValidMove(newPosition, board) {
    const x = this.position.x;
    const y = this.position.y;
    const newX = newPosition.x;
    const newY = newPosition.y;
    // Verificare limite tabla
    if (newX < 0 || newX > 7 || newY < 0 || newY > 7) return false;
    const dx = Math.abs(newX - x);
    const dy = Math.abs(newY - y);
    if ((dx === 2 && dy === 1) || (dx === 1 && dy === 2)) {
      return !board[newY][newX] || board[newY][newX].color !== this.color;
    }
    return false;
  }
}

class Bishop extends ChessPiece {
  constructor(color, position) {
    super("bishop", color, position);
  }

  isValidMove(newPosition, board) {
    const x = this.position.x;
    const y = this.position.y;
    const newX = newPosition.x;
    const newY = newPosition.y;
    // Verificare limite tabla
    if (newX < 0 || newX > 7 || newY < 0 || newY > 7) return false;
    if (Math.abs(newX - x) !== Math.abs(newY - y)) return false;
    const stepX = newX > x ? 1 : -1;
    const stepY = newY > y ? 1 : -1;
    let currX = x + stepX;
    let currY = y + stepY;
    while (currX !== newX && currY !== newY) {
      if (currX < 0 || currX > 7 || currY < 0 || currY > 7) return false;
      if (board[currY][currX]) return false;
      currX += stepX;
      currY += stepY;
    }
    return (!board[newY][newX] || board[newY][newX].color !== this.color);
  }
}

class Queen extends ChessPiece {
  constructor(color, position) {
    super("queen", color, position);
  }

  isValidMove(newPosition, board) {
    const rook = new Rook(this.color, this.position);
    const bishop = new Bishop(this.color, this.position);
    return rook.isValidMove(newPosition, board) || bishop.isValidMove(newPosition, board);
  }
}

class King extends ChessPiece {
  constructor(color, position) {
    super("king", color, position);
  }

  isValidMove(newPosition, board) {
    const x = this.position.x;
    const y = this.position.y;
    const newX = newPosition.x;
    const newY = newPosition.y;
    // Verificare limite tabla
    if (newX < 0 || newX > 7 || newY < 0 || newY > 7) return false;
    const dx = Math.abs(newX - x);
    const dy = Math.abs(newY - y);
    if (dx <= 1 && dy <= 1 && (dx > 0 || dy > 0)) {
      return !board[newY][newX] || board[newY][newX].color !== this.color;
    }
    return false;
  }
}

class ChessBoard {
  constructor() {
    this.board = Array(8).fill().map(() => Array(8).fill(null));
    this.selectedPiece = null;
    this.currentPlayer = "white";
    this.gameMode = localStorage.getItem("gameMode") || "pvp";
    this.player1Name = localStorage.getItem("player1Name") || "Jucator 1";
    this.player2Name = localStorage.getItem("player2Name") || "Calculator";
    this.squareSize = 64;
    // Calculăm offset pentru centrare
    this.boardOffsetX = (width - this.squareSize * 8) / 2;
    this.boardOffsetY = 130;
    this.initPieces();
    if (this.gameMode === "pvb" && this.currentPlayer === "black") {
      setTimeout(() => this.aiMove(), 1000);
    }
  }

  initPieces() {
    for (let x = 0; x < 8; x++) {
      this.board[6][x] = new Pawn("white", { x, y: 6 });
      this.board[1][x] = new Pawn("black", { x, y: 1 });
    }
    const pieces = [Rook, Knight, Bishop, Queen, King, Bishop, Knight, Rook];
    for (let x = 0; x < 8; x++) {
      this.board[7][x] = new pieces[x]("white", { x, y: 7 });
      this.board[0][x] = new pieces[x]("black", { x, y: 0 });
    }
  }

  draw() {
    // Fundal general
    background(220);
    // Zona info jucători
    push();
    fill(255, 255, 255, 220);
    stroke('#b0c4de');
    strokeWeight(2);
    rect(30, 20, 540, 90, 18);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(26);
    fill('#1e3c72');
    text(`${this.player1Name} (Alb)`, 160, 50);
    text(`${this.player2Name} (Negru)`, 440, 50);
    textSize(18);
    fill('#0077b6');
    rect(200, 80, 200, 28, 10);
    fill(255);
    text(`Rândul: ${this.currentPlayer === 'white' ? this.player1Name : this.player2Name}`, 300, 94);
    pop();

    // Desenăm tabla centrată
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        fill((x + y) % 2 === 0 ? 200 : color(0, 128, 0));
        rect(this.boardOffsetX + x * this.squareSize, this.boardOffsetY + y * this.squareSize, this.squareSize, this.squareSize);
      }
    }

    // Desenăm piesele
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        if (this.board[y][x]) {
          if (this.selectedPiece && this.selectedPiece.position.x === x && this.selectedPiece.position.y === y) {
            fill(59, 130, 246, 100);
            ellipse(this.boardOffsetX + x * this.squareSize + this.squareSize / 2, this.boardOffsetY + y * this.squareSize + this.squareSize / 2, this.squareSize, this.squareSize);
          }
          this.board[y][x].draw(this.boardOffsetX + x * this.squareSize, this.boardOffsetY + y * this.squareSize, this.squareSize);
        }
      }
    }

    // Butoane centrate sub tablă
    let btnY = this.boardOffsetY + this.squareSize * 8 + 30;
    push();
    textAlign(CENTER, CENTER);
    textSize(20);
    // Reset Joc
    fill(220, 20, 20);
    rect(width/2 - 140, btnY, 120, 40, 10);
    fill(255);
    text("Reset Joc", width/2 - 80, btnY + 20);
    // Înapoi la Meniu
    fill(100);
    rect(width/2 + 20, btnY, 150, 40, 10);
    fill(255);
    text("Inapoi la Meniu", width/2 + 95, btnY + 20);
    pop();
  }

  getSquare(x, y) {
    let boardX = floor((x - this.boardOffsetX) / this.squareSize);
    let boardY = floor((y - this.boardOffsetY) / this.squareSize);
    if (boardX >= 0 && boardX < 8 && boardY >= 0 && boardY < 8) {
      return { x: boardX, y: boardY };
    }
    return null;
  }

  handleClick(mx, my) {
    // Coordonate butoane centrate
    let btnY = this.boardOffsetY + this.squareSize * 8 + 30;
    // Reset Joc
    if (mx >= width/2 - 140 && mx <= width/2 - 20 && my >= btnY && my <= btnY + 40) {
      this.initPieces();
      this.currentPlayer = "white";
      this.selectedPiece = null;
      if (this.gameMode === "pvb" && this.currentPlayer === "black") {
        setTimeout(() => this.aiMove(), 1000);
      }
      return;
    }
    // Înapoi la Meniu
    if (mx >= width/2 + 20 && mx <= width/2 + 170 && my >= btnY && my <= btnY + 40) {
      window.location.href = "index.html";
      return;
    }

    // Verificăm click pe tablă
    let pos = this.getSquare(mx, my);
    if (!pos) return;

    if (this.selectedPiece) {
      let moved = this.movePiece(this.selectedPiece.position, pos);
      if (moved) {
        this.selectedPiece = null;
      } else {
        let piece = this.board[pos.y][pos.x];
        if (piece && piece.color === this.currentPlayer) {
          this.selectedPiece = piece;
        } else {
          this.selectedPiece = null;
        }
      }
    } else {
      let piece = this.board[pos.y][pos.x];
      if (piece && piece.color === this.currentPlayer) {
        this.selectedPiece = piece;
      }
    }
  }

  isKingInCheck(color) {
    // Găsește regele
    let kingPos = null;
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        let piece = this.board[y][x];
        if (piece && piece.type === 'king' && piece.color === color) {
          kingPos = { x, y };
        }
      }
    }
    if (!kingPos) return false;
    // Verifică dacă vreo piesă adversă poate captura regele
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        let piece = this.board[y][x];
        if (piece && piece.color !== color) {
          if (piece.isValidMove(kingPos, this.board)) {
            return true;
          }
        }
      }
    }
    return false;
  }

  hasAnyLegalMove(color) {
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        let piece = this.board[y][x];
        if (piece && piece.color === color) {
          for (let newY = 0; newY < 8; newY++) {
            for (let newX = 0; newX < 8; newX++) {
              let to = { x: newX, y: newY };
              if (piece.isValidMove(to, this.board)) {
                // Simulează mutarea
                let backup = this.board[newY][newX];
                let from = { x, y };
                this.board[newY][newX] = piece;
                this.board[y][x] = null;
                let oldPos = piece.position;
                piece.position = to;
                let inCheck = this.isKingInCheck(color);
                // Revine la starea inițială
                this.board[y][x] = piece;
                this.board[newY][newX] = backup;
                piece.position = oldPos;
                if (!inCheck) return true;
              }
            }
          }
        }
      }
    }
    return false;
  }

  movePiece(from, to) {
    const piece = this.board[from.y][from.x];
    if (!piece || piece.color !== this.currentPlayer) return false;
    if (!piece.isValidMove(to, this.board)) return false;
    // Simulează mutarea pentru a verifica dacă regele rămâne în șah
    let backup = this.board[to.y][to.x];
    let oldPos = piece.position;
    this.board[to.y][to.x] = piece;
    this.board[from.y][from.x] = null;
    piece.position = to;
    let inCheck = this.isKingInCheck(this.currentPlayer);
    if (inCheck) {
      // Mutare ilegală, revine
      this.board[from.y][from.x] = piece;
      this.board[to.y][to.x] = backup;
      piece.position = oldPos;
      return false;
    }
    piece.hasMoved = true;
    // Verifică mat/remiză după mutare
    let nextPlayer = this.currentPlayer === 'white' ? 'black' : 'white';
    // --- verificare mat/remiză înainte de a schimba currentPlayer ---
    let mat = this.isKingInCheck(nextPlayer) && !this.hasAnyLegalMove(nextPlayer);
    let remiza = !this.isKingInCheck(nextPlayer) && !this.hasAnyLegalMove(nextPlayer);
    this.currentPlayer = nextPlayer;
    if (mat) {
      setTimeout(() => {
        this.showEndGameModal(`${this.currentPlayer === 'white' ? this.player2Name : this.player1Name} a câștigat prin șah mat!`);
      }, 100);
    } else if (remiza) {
      setTimeout(() => {
        this.showEndGameModal('Remiză! Niciun jucător nu mai are mutări legale.');
      }, 100);
    }
    if (this.gameMode === "pvb" && this.currentPlayer === "black") {
      setTimeout(() => this.aiMove(), 1000);
    }
    return true;
  }

  showEndGameModal(message) {
    // Elimină orice modal vechi
    let oldModal = document.getElementById('endgame-modal');
    if (oldModal) oldModal.remove();
    // Creează modal nou
    let modal = document.createElement('div');
    modal.id = 'endgame-modal';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.background = 'rgba(0,0,0,0.5)';
    modal.style.display = 'flex';
    modal.style.alignItems = 'center';
    modal.style.justifyContent = 'center';
    modal.style.zIndex = '9999';
    let box = document.createElement('div');
    box.style.background = '#fff';
    box.style.padding = '40px 32px';
    box.style.borderRadius = '18px';
    box.style.boxShadow = '0 8px 32px 0 rgba(31, 38, 135, 0.37)';
    box.style.textAlign = 'center';
    box.style.fontSize = '2rem';
    box.style.color = '#1e3c72';
    box.innerText = message;
    let btn = document.createElement('button');
    btn.innerText = 'OK';
    btn.style.marginTop = '24px';
    btn.style.padding = '10px 32px';
    btn.style.fontSize = '1.2rem';
    btn.style.background = '#0077b6';
    btn.style.color = '#fff';
    btn.style.border = 'none';
    btn.style.borderRadius = '8px';
    btn.style.cursor = 'pointer';
    btn.onclick = () => { modal.remove(); };
    box.appendChild(document.createElement('br'));
    box.appendChild(btn);
    modal.appendChild(box);
    document.body.appendChild(modal);
  }

  aiMove() {
    if (this.gameMode !== "pvb" || this.currentPlayer !== "black") {
      return;
    }
    // Găsește toate mutările valide pentru piesele negre
    let moves = [];
    for (let y = 0; y < 8; y++) {
      for (let x = 0; x < 8; x++) {
        let piece = this.board[y][x];
        if (piece && piece.color === "black") {
          for (let newY = 0; newY < 8; newY++) {
            for (let newX = 0; newX < 8; newX++) {
              let to = { x: newX, y: newY };
              // Verifică dacă mutarea este validă și nu lasă regele în șah
              if (piece.isValidMove(to, this.board)) {
                // Simulează mutarea
                let backup = this.board[newY][newX];
                let oldPos = piece.position;
                this.board[newY][newX] = piece;
                this.board[y][x] = null;
                piece.position = to;
                let inCheck = this.isKingInCheck("black");
                // Revine la starea inițială
                this.board[y][x] = piece;
                this.board[newY][newX] = backup;
                piece.position = oldPos;
                if (!inCheck) {
                  moves.push({ from: { x, y }, to });
                }
              }
            }
          }
        }
      }
    }
    if (moves.length === 0) return;
    // Mutare random
    let randomMove = moves[Math.floor(Math.random() * moves.length)];
    this.movePiece(randomMove.from, randomMove.to);
  }
}