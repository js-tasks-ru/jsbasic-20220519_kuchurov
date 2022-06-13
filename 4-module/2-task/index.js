function makeDiagonalRed(table) {
  let rowColored = 0;
  let cellColored = 0;
  for (let row of table.rows) {
    table.rows[rowColored++].cells[cellColored++].style.backgroundColor = 'red'
  }
}
