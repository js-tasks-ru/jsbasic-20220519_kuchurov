import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {
      noNuts: false,
      maxSpiciness: 4,
      vegeterianOnly: false,
      category: null
    }
    this.render()
  }

  render() {
    this.createGrid()
    this.addProductList()
  }

  createGrid() {
    this.elem = createElement(`
      <div class="products-grid">
        <div class="products-grid__inner"></div>
      </div>
    `)
  }

  addProductList() {
    let container = this.elem.querySelector('.products-grid__inner')
    container.innerHTML = ''
    this.filteredProducts.forEach(product => {
      let productCard = new ProductCard(product);
      container.append(productCard.elem);
    })
  }

  updateFilter(filters) {
    Object.assign(this.filters, filters)
    this.addProductList()
  }

  get filteredProducts() {
    return this.filterProducts()
  }

  filterProducts() {
    return this.products.filter(item => this.filterRules(item))
  }
  filterRules(item) {
    let nuts = (this.filters.noNuts) ? !item.nuts : true;
    let vegans = (this.filters.vegeterianOnly) ? item.vegeterian : true;
    let category = (this.filters.category) ? item.category?.toLowerCase().includes( this.filters.category.toLowerCase() ) : true;

    return item.spiciness <= this.filters.maxSpiciness && category && nuts && vegans
  }
}
