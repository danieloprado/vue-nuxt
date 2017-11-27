<script lang="tsx">
import Component from 'nuxt-class-component';
import { Getter } from 'vuex-class';

import ProductImageComponent from './ProductImage.vue';
import currencyFilter from '../filters/currency';
import { IProduct } from '../interfaces/product';
import { BaseComponent } from '../interfaces/baseComponent';

@Component()
export default class CartButton extends BaseComponent {
  opened: boolean;

  @Getter('cart/total') total: number;
  @Getter('cart/products') items: IProduct[];

  data() {
    return {
      opened: false
    };
  }

  mounted() {
    document.body.addEventListener('click', () => (this.opened = false));
  }

  toggle() {
    this.opened = !this.opened;
  }

  preventToggle(event: Event) {
    event.stopPropagation();
  }

  remove(product: IProduct) {
    this.$store.dispatch('cart/removeProduct', product.id);
  }

  navigateCart() {
    this.opened = false;
    this.$router.push({ name: 'cart' });
  }

  render(h: any) {
    return (
      <div
        class={this.opened ? 'opened cart-button' : 'cart-button'}
        onClick={this.preventToggle.bind(this)}>
        <div onClick={this.toggle.bind(this)}>
          <i class="glyphicon glyphicon-shopping-cart" />
          <span>Meu Carrinho</span>
          <span class="pull-right">{currencyFilter(this.total)}</span>
        </div>

        <div v-accordion={this.opened} class="details">
          <ul>
            {this.items.map(item => (
              <li>
                <ProductImageComponent product={item} />
                <div>
                  <h5>{item.name}</h5>
                  <small>
                    {item.quantity}x
                    {currencyFilter(item.price)} =&nbsp;
                    {currencyFilter(item.totalPrice)}
                  </small>
                </div>

                <i onClick={this.remove.bind(this, item)} class="glyphicon glyphicon-remove" />
              </li>
            ))}
            <li>
              Valor Total
              <span class="pull-right">{currencyFilter(this.total)}</span>
            </li>
            {!!this.items.length && (
              <li>
                <button onClick={this.navigateCart.bind(this)} class="btn btn-block btn-accent">
                  Fechar compra
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    );
  }
}
</script>

<style lang="scss" scoped>
@import '../theme/_index.scss';
$background: darken($secondary-color, 5%);

.cart-button {
  position: relative;
  background: $background;
  color: white;
  margin-top: 10px;
  display: block;
  border-radius: 10px;
  font-size: 14px;
  transition: 0.3s;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.125);

  > div:first-child {
    cursor: pointer;
    user-select: none;
    padding: 8px 16px;

    span:first-of-type {
      display: none;
    }

    @include media-min-breakpoints(xs) {
      span:first-of-type {
        display: inline;
      }
    }
  }

  &:hover:not(.opened) {
    text-decoration: none;
    box-shadow: 0 3px 3px rgba($primary-color, 0.74);
    transform: translateY(-2px);
  }

  &.opened {
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
  }

  i {
    margin-right: 10px;
  }
}

.details {
  position: absolute;
  background: $background;
  right: 1px;
  top: 30px;
  width: calc(100% - 2px);
  min-width: 268px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;

  &.in {
    box-shadow: 0 3px 3px rgba($primary-color, 0.74);
  }

  ul {
    padding: 0;
    margin: 0;
    background: white;
    margin: 10px;
    border-radius: 3px;
    color: $black;

    li {
      position: relative;
      display: block;
      padding: 10px;

      &:not(:last-child) {
        border-bottom: 1px solid #ededed;
      }

      img {
        width: 50px;
        height: 50px;
        vertical-align: middle;
      }

      div {
        width: calc(100% - 80px);
        display: inline-block;
        margin-left: 15px;
        vertical-align: middle;
      }

      h5 {
        margin: 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      small {
        color: $primary-text-color;
        font-weight: bold;
      }

      i {
        position: absolute;
        top: 0;
        bottom: 0;
        right: 3px;
        margin: auto;
        height: 20px;
        width: 20px;
        padding-top: 5px;
        text-align: center;
        color: red;
        cursor: pointer;
      }

      span {
        font-weight: bold;
        color: $primary-text-color;
        font-size: 16px;
      }
    }
  }
}
</style>