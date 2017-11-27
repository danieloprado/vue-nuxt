<script  lang="tsx">
import Component from 'nuxt-class-component';
import { Getter } from 'vuex-class';

import Breadcrumbs from '../components/Breadcrumb.vue';
import currencyFilter from '../filters/currency';
import ProductItemCartQuantity from '../components/ProductItemCartQuantity.vue';
import ProductImage from '../components/ProductImage.vue';
import * as confirm from '../services/confirm';
import { BaseComponent } from '../interfaces/baseComponent';
import { IProduct } from '../interfaces/product';

@Component()
export default class Cart extends BaseComponent {
  items: IProduct[];

  @Getter('cart/total') total: number;

  head() {
    return { title: 'Carrinho' };
  }

  data() {
    return {
      items: this.$store.getters['cart/products']
    };
  }

  mounted() {
    this.$store.watch(
      state => state.cart.products.length,
      () => {
        this.items = this.$store.getters['cart/products'];
      }
    );
  }

  async updateProduct(product: IProduct, quantity: number) {
    await this.$store.dispatch('cart/updateProduct', { product, quantity });
    this.items = this.$store.getters['cart/products'];
  }

  async removeProduct(product: IProduct) {
    const ok = await confirm.show(`Deseja realmente remover o produto **${product.name}**?`);
    if (!ok) return;

    await this.$store.dispatch('cart/removeProduct', product.id);
  }

  async cleanCart() {
    const ok = await confirm.show('Deseja realmente esvaziar o carrinho?');
    if (!ok) return;

    await this.$store.dispatch('cart/clean');
  }

  render(h: any) {
    return (
      <section>
        <div class="container">
          <Breadcrumbs
            links={[
              { link: { name: 'home' }, display: 'Home' },
              { link: { name: 'cart' }, display: 'Carrinho' }
            ]}
          />
        </div>

        <hr class="divider" />

        <div class="container">
          <h2>Carrinho de compras</h2>

          <p>
            Confira os ítens da sua lista de compras e se estiver tudo certo, finalize sua compra. É
            prático, rápido e fácil.
          </p>

          {!!this.items.length && (
            <div class="buttons">
              <button class="btn btn-primary" onClick={this.cleanCart.bind(this)}>
                Esvaziar carrinho
              </button>
            </div>
          )}

          <div class="panel">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Item</th>
                  <th class="text-center hidden-xs">Quantidade</th>
                  <th class="text-right hidden-xs">Preço unitário</th>
                  <th class="text-right hidden-xs">Preço Total</th>
                  <th class="text-right hidden-xs" />
                </tr>
              </thead>
              <tbody>
                {this.items.map(product => (
                  <tr>
                    <td class="visible-xs">
                      <ProductImage product={product} />

                      <p>
                        <strong>{product.name}</strong>
                      </p>

                      <div class="clearfix">
                        <ProductItemCartQuantity
                          class="quantity-field"
                          v-model={product.quantity}
                          value-change={value => this.updateProduct(product, value)}
                        />

                        <div>
                          <button
                            class="btn btn-danger btn-sm"
                            onClick={this.removeProduct.bind(this, product)}>
                            Remover
                          </button>
                        </div>
                      </div>

                      <div class="row prices">
                        <div class="col-xs-6">
                          <label>Preço unitário</label>
                          <p>{currencyFilter(product.price)}</p>
                        </div>

                        <div class="col-xs-6">
                          <label>Total</label>
                          <p>{currencyFilter(product.totalPrice)}</p>
                        </div>
                      </div>
                    </td>
                    <td class="hidden-xs">
                      <div class="product-img">
                        <ProductImage product={product} />
                      </div>

                      {product.name}
                    </td>
                    <td class="text-center hidden-xs">
                      <ProductItemCartQuantity
                        class="quantity-field"
                        v-model={product.quantity}
                        value-change={value => this.updateProduct(product, value)}
                      />
                    </td>
                    <td class="text-right hidden-xs">{currencyFilter(product.price)}</td>
                    <td class="text-right hidden-xs">{currencyFilter(product.totalPrice)}</td>
                    <td class="hidden-xs text-right">
                      <button
                        class="btn btn-danger btn-sm"
                        onClick={this.removeProduct.bind(this, product)}>
                        Remover
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {!this.items.length && <p class="empty-message">Nenhum item adicionado</p>}
          </div>

          {!this.items.length && (
            <div class="text-center">
              <router-link to={{ name: 'search-all' }} class="btn btn-primary">
                Continuar comprando
              </router-link>
            </div>
          )}

          {!!this.items.length && (
            <div>
              <div class="row">
                <div class="col-xs-12 col-sm-7 extra-info">
                  <div class="row form-group">
                    <div class="col-xs-8">
                      <input class="form-control" placeholder="Cupom de desconto" />
                    </div>
                    <div class="col-xs-4">
                      <button class="btn btn-primary btn-block">OK</button>
                    </div>
                  </div>

                  <div class="form-group m-none">
                    <label class="label-control">Observações</label>
                    <textarea
                      class="form-control"
                      placeholder="Gostaria de inserir alguma informação no seu pedido?"
                    />
                  </div>
                </div>

                <div class="col-xs-12 visible-xs">
                  <hr />
                </div>

                <div class="col-xs-12 col-sm-5 table-prices">
                  <table class="table">
                    <tr>
                      <td>Subtotal</td>
                      <td>{currencyFilter(this.total)}</td>
                    </tr>
                    <tr>
                      <td>Frete</td>
                      <td>
                        <a href="#" class="btn">
                          Informe seu cep
                          <i class="glyphicon glyphicon-chevron-right" />
                        </a>
                      </td>
                    </tr>
                    <tr>
                      <td>Preço Total</td>
                      <td class="strong">{currencyFilter(this.total)}</td>
                    </tr>
                  </table>
                </div>
              </div>

              <div class="clearfix action-buttons">
                <router-link to={{ name: 'search-all' }} class="btn btn-primary">
                  <i class="glyphicon glyphicon-chevron-left" />
                  Continuar comprando
                </router-link>

                <router-link to={{ name: 'home' }} class="btn btn-accent">
                  Finalizar compra
                </router-link>
              </div>
            </div>
          )}
        </div>
      </section>
    );
  }
}
</script>

<style lang="scss" scoped>
@import '../theme/_index.scss';

section {
  padding: 15px 0 40px;
}

table td {
  vertical-align: middle !important;
}

h2 {
  margin-top: 0;
  color: $primary-color-dark;
  font-weight: normal;
}

.buttons {
  margin-bottom: 15px;
  text-align: right;
}

.quantity-field {
  margin: auto;
  float: none !important;
}

.product-img {
  display: inline-block;
  width: 50px;
  height: 50px;
  margin-right: 10px;
  text-align: center;
  line-height: 50px;

  img {
    max-width: 100%;
  }
}

.visible-xs {
  .quantity-field {
    width: calc(100% - 110px);
    margin-right: 20px;
    max-width: none;
    float: left !important;
  }

  img {
    margin: auto;
    display: block;
    max-height: 100px;

    + p {
      text-align: center;
      margin: 10px 0;
    }
  }
}

.empty-message {
  padding: 10px 0;
  text-align: center;
  opacity: 0.8;
  font-style: italic;
}

.prices {
  margin-top: 20px;

  label {
    text-transform: uppercase;
    font-size: 11px;
    margin-bottom: 0;
    text-align: right;
    display: block;
  }

  p {
    text-align: right;
  }
}

.extra-info {
  @include media-min-breakpoints(sm) {
    border-right: 1px solid $hr;
  }
}

.table-prices {
  table {
    margin: 0;
  }

  td {
    height: 25px;
  }

  td:first-child {
    letter-spacing: 0.5;
  }

  td:last-child {
    text-align: right;
  }

  tr:last-child td {
    font-weight: bold;
  }

  .btn {
    box-shadow: none;
    padding-left: 0;
    padding-right: 0;

    i {
      margin-right: 0;
      margin-left: 5px;
    }
  }
}

.action-buttons {
  margin-top: 40px;

  .btn {
    width: 100%;

    + .btn {
      margin-top: 20px;
    }
  }

  @include media-min-breakpoints(sm) {
    .btn {
      width: auto;

      + .btn {
        margin-top: 0;
        margin-left: 10px;
      }
    }

    .btn:last-child {
      float: right;
    }
  }
}
</style>

