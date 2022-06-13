function highlight(table) {
  for (let row of table.rows) {
    // rows in tBody
    if (row.rowIndex) {
      // set available/unavailable/hidden
      let status = row.cells[3].dataset.available

      if ( status == 'true' ) {
        row.classList.add('available')
      } else if( status == 'false' ) {
        row.classList.add('unavailable')
      } else if( typeof status === 'undefined' ) {
        row.setAttribute('hidden', '')
      }

      // set male/female
      let genderClass = (row.cells[2].innerHTML == 'm') ? 'male' : 'female';
      row.classList.add(genderClass)

      // set text-decoration
      if (row.cells[1].innerHTML < 18) {
        row.style.textDecoration = 'line-through'
      }
    }
  }
}
