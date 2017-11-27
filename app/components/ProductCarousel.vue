<script  lang="tsx">
import Component from 'nuxt-class-component';
import { Prop } from 'vue-property-decorator';

import ProductItemComponent from './ProductItem.vue';
import { IProduct } from '../interfaces/product';
import { BaseComponent } from '../interfaces/baseComponent';

interface IProps {
  products: IProduct[];
}

@Component()
export default class ProductCarousel extends BaseComponent<IProps> {
  @Prop({ required: true })
  products: IProduct[];

  render(h: any) {
    return (
      <div v-carousel class="product-carousel-component owl-carousel owl-theme">
        {this.products.map(product => (
          <div class="product-content">
            <ProductItemComponent product={product} />
          </div>
        ))}
      </div>
    );
  }
}
</script>

<style lang="scss">
@import '../theme/_index.scss';

.product-carousel-component {
  position: relative;
  margin: 0 20px;
  width: calc(100% - 40px);

  .product-content .panel {
    margin: 0 20px 20px 20px;
  }

  .owl-prev,
  .owl-next {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    left: -20px;
    height: 60px;
    width: 40px;
    background: $product-carousel-nav-background;
    border-radius: 50% 0 0 50%;
    color: white;
    cursor: pointer;
    transition: 0.3s;

    &:before {
      content: '\e079';
      font-family: 'Glyphicons Halflings';
      display: block;
      margin-top: 8px;
      margin-left: 8px;
      font-size: 30px;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.6);
      transition: 0.3s;
    }

    &:hover {
      background: lighten($product-carousel-nav-background, 5%);

      &:before {
        margin-left: 5px;
      }
    }
  }

  .owl-next {
    left: auto;
    right: -20px;
    border-radius: 0 50% 50% 0;

    &:before {
      content: '\e080';
      margin-left: 2px;
    }
  }
}
</style>