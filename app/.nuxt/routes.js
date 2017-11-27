module.exports = [
  {
    name: 'home',
    path: '/',
    component: 'index.vue'
  },
  {
    name: 'search-all',
    path: '/produtos',
    component: 'search.vue'
  },
  {
    name: 'search-category',
    path: '/categoria/:categorySlug/:categoryId',
    component: 'search.vue'
  },
  {
    name: 'product-details',
    path: '/produto/:slug/:id',
    component: 'product.vue'
  },
  {
    name: 'cart',
    path: '/compra/carrinho',
    component: 'cart.vue'
  }
];
