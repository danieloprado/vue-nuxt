<script  lang="tsx">
import ImageComponent from './ProductImage.vue';
import CartComponent from './ProductItemCart.vue';
import currencyFilter from '../filters/currency';

import Component from 'nuxt-class-component';
import { Prop } from 'vue-property-decorator';

import { IProduct } from '../interfaces/product';
import { BaseComponent } from '../interfaces/baseComponent';

interface IProps {
  product: IProduct;
}

@Component()
export default class ProductImageGallery extends BaseComponent<IProps> {
  @Prop({ required: true })
  product: IProduct;

  render(h: any) {
    return (
      <div class="panel">
        <div class="panel-body">
          <router-link to={this.product.link} class="product-link">
            <div class="image">
              <div>
                <ImageComponent product={this.product} />
              </div>
            </div>
            <h5>{this.product.name}</h5>
            <p>
              <span>
                por:<span>R$</span>
              </span>
              {currencyFilter(this.product.price)}
            </p>
          </router-link>

          <hr />

          <CartComponent product={this.product} />
        </div>
      </div>
    );
  }
}
</script>

<style lang="scss" scoped>
@import '../theme/_index.scss';

.panel {
  text-align: center;
}

.image {
  display: table;
  width: 100%;

  div {
    height: 200px;
    width: 100%;
    text-align: center;
    display: table-cell;
    vertical-align: middle;

    img {
      width: auto;
      max-width: 100%;
      max-height: 100%;
      margin: auto;
    }
  }
}

.product-link {
  display: block;
  overflow: hidden;
  margin-bottom: 10px;
  color: $font-color;
  transition: 0.3s;

  &:hover {
    text-decoration: none;
    transform: translateY(-4px);
    opacity: 0.8;
  }

  h5 {
    height: 40px;
    line-height: 20px;
    letter-spacing: 0.5px;
  }

  > p {
    font-size: 30px;
    color: $primary-text-color;
    text-align: left;
    display: inline-block;
    margin: 0;

    > span:first-child {
      display: inline-block;
      font-size: 14px;

      span {
        font-size: 18px;
        vertical-align: top;
        display: block;
        margin: -2px 5px 0 0;
      }
    }
  }
}
</style>