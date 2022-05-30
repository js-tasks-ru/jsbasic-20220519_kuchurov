function factorial(n) {
  let f = n
  while (--n > 1) f = f * n
  return f || 1
}
