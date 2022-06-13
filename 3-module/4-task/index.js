function showSalary(users, age) {
  str = ''

  users.forEach(user => {
    if (user.age > age) return
    str += user.name + ', ' + user.balance + '\n'
  })

  return str.slice(0, -1)
}
