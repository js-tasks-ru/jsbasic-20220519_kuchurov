/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
 export default class UserTable {

  constructor(rows) {
    this.rows = rows
    this.elem = this.createTable()
  }

  createTable() {
    const table = document.createElement('table')

    // insert Rows
    this.rows.forEach(user => {
      // new Row
      const tr = table.insertRow()

      // ! >>>>> add Remove Button <<<<<
      const removeButton = this.#createRemoveButton()
      removeButton.addEventListener('click', () => tr.remove(), { once: true })

      // insert Remove Button
      tr.insertCell().insertAdjacentElement('beforeend', removeButton)

      // insert User Data
      tr.insertAdjacentHTML('afterbegin', `
        <td>${user.name}</td>
        <td>${user.age}</td>
        <td>${user.salary}</td>
        <td>${user.city}</td>
      `)
    })

    // add Headers to Table
    table.insertAdjacentHTML('afterbegin', `
      <thead>
        <tr>
          <th>Имя</th>
          <th>Возраст</th>
          <th>Зарплата</th>
          <th>Город</th>
          <th></th>
        </tr>
      </thead>
    `)

    return table
  }


  #createRemoveButton() {
    const button = document.createElement('button')
    button.innerHTML = 'X'
    return button
  }
}
