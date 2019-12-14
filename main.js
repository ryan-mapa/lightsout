let DIFFICULTY = 1;

function toggleCell(y, x) {
  if ((x > 6 || x < 0) || (y > 4 || y < 0)) return;

  let cellId = `cell-${y}-${x}`;
  let cell = document.getElementById(cellId);

  if (cell.classList.length < 2) {
    cell.classList.add('on');
  } else {
    cell.classList.remove('on');
  }
  
  // fancy!
  // cell.classList.toggle('on');
}

function handleCellClick(e) {
  let cellId = e.target.id;
  let y = Number(cellId[5]);
  let x = Number(cellId[7]);
  toggleCellAndNeighbors(y, x);
  checkForWin() ? handleWin() : false
}


function toggleCellAndNeighbors(y , x) {
  toggleCell(y, x);
  toggleCell(y+1, x);
  toggleCell(y-1, x);
  toggleCell(y, x+1);
  toggleCell(y, x-1);
}


function checkForWin() {
  let cells = document.querySelectorAll('.cell');
  
  for(let i = 0; i < cells.length; i++) {
    if (cells[i].classList.contains('on')) return false;
  }
  return true;
}

function handleWin() {
  setTimeout(() => {
    if (confirm(`YOU BEAT LEVEL ${DIFFICULTY}!`)) {
      DIFFICULTY += 1;
      newGame(DIFFICULTY);
    }
  }, 100);
}

function newGame(difficulty) {
  // sample some coordinates and use toggleCellAndNeighbors
  for (let i = 0; i < difficulty; i++) {
    let y = Math.floor(Math.random() * 5)
    let x = Math.floor(Math.random() * 7) 
    toggleCellAndNeighbors(y, x)
  }
}

function addClickListeners() {
  let cells = document.querySelectorAll('.cell');

  for (let i = 0; i < cells.length; i++) {
    cells[i].addEventListener('click', handleCellClick);
  }

  // fancy!
  // for (let cell of cells) {
  //   cell.addEventListener('click', handleCellClick);
  // }
}


document.addEventListener('DOMContentLoaded', () => {
    let cells = document.querySelectorAll('.cell');
    
    for(let i = 0; i < cells.length; i++) {
        cells[i].addEventListener('click', handleCellClick);
    }
    addClickListeners();
    newGame(DIFFICULTY);
})
