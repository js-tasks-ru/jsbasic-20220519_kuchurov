function getMinMax(str) {
  str = str.split(' ')
        .filter(item => parseFloat(item))
        .map(item => Number(item))

  return {
    min: Math.min(...str),
    max: Math.max(...str)
  }
}
