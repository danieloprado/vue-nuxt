<script  lang="tsx">
import Component from 'nuxt-class-component';
import { Getter } from 'vuex-class';

import ProductListCategoriesComponent from '../components/ProductListCategories.vue';
import ImageComponent from '../components/ProductImageGallery.vue';
import CartComponent from '../components//ProductItemCart.vue';
import FacebookShareButton from '../components//FacebookShare.vue';
import CategoryBreadcrumb from '../components/BreadcrumbCategory.vue';
import currencyFilter from '../filters/currency';

import * as productService from '../services/product';
import { FACEBOOK_ID, HOST } from '../config';

import { BaseComponent } from '../interfaces/baseComponent';
import { ICategory } from '../interfaces/category';
import { IProduct } from '../interfaces/product';

@Component()
export default class Cart extends BaseComponent {
  product: IProduct;

  @Getter('core/mainCategories') categories: ICategory[];

  head() {
    const image = (this.product.images[0] || { url: null }).url;

    return {
      title: (this.product || { name: '' }).name,
      meta: [
        { hid: 'fb:app_id', property: 'fb:app_id', content: FACEBOOK_ID },
        { hid: 'twitter:card', name: 'summary' },
        {
          hid: 'description',
          property: 'description',
          content: this.product.description
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: HOST + this.$nuxt.$route.path
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: `${(this.product || { name: '' }).name}`
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: this.product.description
        },
        { hid: 'og:image', property: 'og:image', content: image }
      ]
    };
  }

  async asyncData({ params }: any) {
    const product = await productService.details(params.slug);
    return { product };
  }

  render(h: any) {
    return (
      <section class="product-page">
        <div class="container">
          <CategoryBreadcrumb category-id={this.product.category.id} />
        </div>

        <hr class="divider" />

        <div class="container">
          <div class="row">
            <div class="col-md-3">
              <ProductListCategoriesComponent categories={this.categories} />
            </div>

            <div class="col-md-9">
              <h2>{this.product.name}</h2>

              <div class="row">
                <div class="col-md-5">
                  <ImageComponent product={this.product} class="product-image" />
                </div>

                <div class="col-md-7">
                  <div>
                    <div
                      class="product-page-description"
                      domPropsInnerHTML={this.product.long_description}
                    />
                  </div>

                  <p class="price">
                    <span>
                      por:<span>R$</span>
                    </span>
                    {currencyFilter(this.product.price, 'no-symbol')}
                  </p>

                  <CartComponent product={this.product} full-button={true} />

                  <hr />

                  <div class="text-right">
                    <FacebookShareButton />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
</script>

<style lang="scss">
.product-page .product-page-description > * {
  font-size: 14px !important;
}

.product-page .product-page-description p:empty {
  display: none;
}
</style>

<style lang="scss" scoped>
@import '../theme/_index.scss';

section {
  padding: 10px 0 20px;
}

h2 {
  margin-top: 0;
}

label {
  font-size: 14px;
  text-transform: uppercase;
  margin-bottom: 0;

  &:not(.first) {
    margin-top: 20px;
  }
}

.price {
  font-size: 30px;
  color: $primary-text-color;
  text-align: left;
  display: inline-block;
  margin-bottom: 20px;

  > span:first-child {
    display: inline-block;
    font-size: 13px;

    span {
      font-size: 18px;
      vertical-align: top;
      display: block;
      margin: -2px 5px 0 0;
    }
  }
}

.product-image {
  width: 100%;
  margin-bottom: 20px;
}
</style>