function namify(users) {
  let usersNames = []

  users.forEach((user) => {
    usersNames.push(user.name)
  })

  return usersNames
}
