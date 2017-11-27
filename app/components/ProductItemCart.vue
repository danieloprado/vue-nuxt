<script  lang="tsx">
import Component from 'nuxt-class-component';
import { Prop } from 'vue-property-decorator';

import * as toast from '../services/toast';
import ProductItemCartQuantity from './ProductItemCartQuantity.vue';
import { IProduct } from '../interfaces/product';
import { BaseComponent } from '../interfaces/baseComponent';

interface IProps {
  product: IProduct;
  'full-button'?: Boolean;
}

@Component()
export default class ProductImageGallery extends BaseComponent<IProps> {
  quantity: number;

  @Prop({ required: true })
  product: IProduct;

  @Prop({ default: false })
  fullButton: boolean;

  data() {
    return { quantity: 1 };
  }

  minus() {
    if (this.quantity === 1) return;
    this.quantity--;
  }

  plus() {
    this.quantity++;
  }

  add(event: Event) {
    event.preventDefault();

    this.$store
      .dispatch('cart/addProduct', {
        product: this.product,
        quantity: this.quantity
      })
      .then(() => {
        toast.show(
          `${this.quantity}x **${this.product.name}**  \nAdicionado no carrinho`,
          this.product.thumbnail
        );
      });
  }
  render(h: any) {
    return (
      <div class={this.fullButton ? 'full-button' : null}>
        {this.product.available === 0 ? (
          <p class="unavailable">Indisponível</p>
        ) : (
          <form onSubmit={this.add.bind(this)} class="clearfix">
            <ProductItemCartQuantity v-model={this.quantity} />

            <button class="btn btn-primary btn-icon">
              <i class="glyphicon glyphicon-shopping-cart" />
              {this.fullButton && <span class="cart-button-text">Comprar</span>}
            </button>
          </form>
        )}
      </div>
    );
  }
}
</script>

<style lang="scss" scoped>
@import '../theme/_index.scss';

.cart-button-text {
  margin-left: 10px;
  font-size: 18px;
}

.unavailable {
  margin: 9px 0;
  color: $red;
  font-size: 16px;
  display: block;
}

.input-group {
  width: calc(100% - 40px);
  float: left;
  max-width: 200px;

  .form-control {
    border-radius: 30px;
    text-align: center;
    height: 30px;
    margin: 0 10px;
    width: calc(100% - 20px);
  }

  .btn {
    border-radius: 30px;
    width: 25px;
    height: 25px;
    font-size: 12px;
    padding: 4px 0;
    text-align: center;
  }

  .input-group-btn:last-child .btn {
    padding-left: 2px;
  }
}

form > .btn {
  color: $primary-text-color !important;
  background: none;
  border: none;
  font-size: 20px;
  padding: 3px 10px;
  box-shadow: none;
  float: right;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    background: none;
    transform: scale(1.05);
  }
}

@include media-max-breakpoints(xs) {
  .full-button {
    .input-group {
      width: 100%;
      max-width: 100vw;
      float: none;
    }

    form > .btn {
      display: block;
      width: 100%;
      margin-top: 10px;
      float: none;
    }
  }
}
</style>