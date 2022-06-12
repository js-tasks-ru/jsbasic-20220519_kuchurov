function camelize(str) {
  str = str.split('-')

  str.forEach((word, index) => {
    if (!index) return
    str[index] = word[0]?.toUpperCase() + word?.slice(1)
  })

  return str.join('')
}
