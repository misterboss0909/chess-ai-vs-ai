function drawBoard() {
  // crtanje sahovske ploce
  let chessBoard = `<table class="red"
                          align="center"
                          cellspacing="1"
                          style="border: 1px solid #black;"
                          unselectable="on"
                          onselectstart="return false;"
                          onmousedown="return false;"`;
  for (let row = 0; row < 8; row++) {
    // napravi red
    chessBoard += '<tr>';
    // napravi kolonu
    for (let column = 0; column < 16; column++) {
      let file, rank;
      file = column;
      rank = row;
      //inicijliziraj polja
      let square = rank * 16 + file;

      if ((square & 0x88) == 0) {
        // oboji polja na ploci
        chessBoard += `<td align="center" width="65" height="65" style="font-size: 45px;" id="${square}"
         
          bgcolor= "${(column + row) % 2 ? '#7EA3B6' : '#D8E3E7'}"
          > ${pieces[board[square] & 15]}</td>`;
      }
    }
    chessBoard += '</tr>';
  }
  chessBoard += '</table>';
  // renderuj plocu
  document.getElementById('board').innerHTML = chessBoard;
}

let arr = [];
// nelegalan potez
function draw() {
  for (let square = 0; square < 128; square++)
    if ((square & 0x88) == 0) {
      if (document.getElementById(bestEndSquare) == 0) {
        console.log('draw');
      }
    }
}
draw();

let newDiv = document.querySelector('#text');

function engineMove(depth) {
  newDiv.style.display = 'none';
  let score = alfaBeta(onMove, -10000, 10000, depth);
  drawBoard();

  // crni igrac je matiran
  if (score <= -9999) {
    drawBoard();
    for (let square = 0; square < 128; square++)
      if (board[square] == 19)
        document.getElementById(square).classList.add('mat');
    setTimeout(function () {
      if (alert('White wins!!')) {
      } else window.location.reload();
    }, 10);

    // kraj
    return;
  }

  //pomakni crne figure
  board[bestEndSquare] = board[bestStartSquare];

  board[bestStartSquare] = 0;

  if (
    (board[bestEndSquare] == 9 && bestEndSquare >= 0 && bestEndSquare <= 7) ||
    (board[bestEndSquare] == 18 && bestEndSquare >= 112 && bestEndSquare <= 119)
  )
    // promocija
    board[bestEndSquare] |= 7;

  onMove = 24 - onMove;

  // bijeli igrac je matiran
  if (score >= 9998) {
    drawBoard();
    document.getElementById(bestEndSquare).classList.add('hl');

    for (let square = 0; square < 128; square++)
      if (board[square] == 11)
        document.getElementById(square).classList.add('mat');

    setTimeout(function () {
      if (alert('Black Wins')) {
      } else window.location.reload();
    }, 10);

    // kraj
    return;
  } else {
    drawBoard();
    document.getElementById(bestEndSquare).classList.add('hl');
  }
  setTimeout(function () {
    engineMove(searchDepth);
  }, moveTime);
}

drawBoard();
