let calculator = {
  operandA: 0,
  operandB: 0,
  read(a, b) {
    this.operandA = a
    this.operandB = b
  },
  sum() {
    return this.operandA + this.operandB
  },
  mul() {
    return this.operandA * this.operandB
  },
  isNumber(n) {
    return typeof n === 'number' && isFinite(n)
  }
};

// НЕ УДАЛЯТЬ СТРОКУ, НУЖНА ДЛЯ ПРОВЕРКИ
window.calculator = calculator; // делает ваш калькулятор доступным глобально
