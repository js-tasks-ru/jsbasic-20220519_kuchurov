export default class Cart {
  cartItems = []; // [product: {...}, count: N]

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (!product) return

    let cartItem = this.cartItems.find(item => item.product.id == product.id);

    if (cartItem) {
      cartItem.count++
    } else {
      cartItem = { count: 1 }
      cartItem.product = product
      this.cartItems.push(cartItem)
    }

    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    let cartIndex = 0
    let cartItem = this.cartItems.find((item, index) => {
      cartIndex = index
      return item.product.id == productId
    })

    if (!cartItem) return

    cartItem.count = cartItem.count + amount

    if ( cartItem.count <= 0 ) return this.cartItems.splice(cartIndex, 1);

    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return !Boolean(this.cartItems.length)
  }

  getTotalCount() {
    return this.cartItems.reduce((count, item) => count + item.count, 0)
  }

  getTotalPrice() {
    return this.cartItems.reduce((total, item) => total + (item.product.price * item.count), 0)
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

