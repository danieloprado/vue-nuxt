<script  lang="tsx">
import Component from 'nuxt-class-component';

import CarouselComponent from '../components/Carousel.vue';
import ProductCarouselComponent from '../components/ProductCarousel.vue';
import * as contentService from '../services/content';
import * as productService from '../services/product';
import { BaseComponent } from '../interfaces/baseComponent';
import { IProduct } from '../interfaces/product';
import { IBanner } from '../interfaces/banner';
import { ISlide } from '../interfaces/slides';

@Component()
export default class Cart extends BaseComponent {
  slides: ISlide[];
  banners: IBanner[];
  products: IProduct[];

  head() {
    return { title: 'Home' };
  }

  async asyncData() {
    const [slides, banners, products] = await Promise.all([
      contentService.slides(),
      contentService.banners(),
      productService.featured()
    ]);

    return { slides, banners, products };
  }

  render(h: any) {
    return (
      <section>
        <CarouselComponent slides={this.slides} />

        <div class="container">
          <header class="clearfix">
            <h3>Novidades</h3>
          </header>
          <ProductCarouselComponent products={this.products} />

          <header class="clearfix">
            <h3>Mais Vendidos</h3>
          </header>
          <ProductCarouselComponent products={this.products} />

          <div class="banners">
            {this.banners.map(banner => {
              <span>
                <hr class="divider" />
                <a href={banner.url}>
                  <img src={banner.image} />
                </a>
              </span>;
            })}
          </div>

          <hr class="divider" />
        </div>
      </section>
    );
  }
}
</script>

<style lang="scss" scoped>
@import '../theme/_index.scss';

.container {
  padding-top: 40px;
  padding-bottom: 40px;
}

header {
  margin: 0 40px 30px;
  border-bottom: 2px solid $primary-color;

  h3 {
    color: $primary-color;
    text-transform: uppercase;
  }
}

.product-content {
  padding: 0 10px;
}

.banners {
  text-align: center;
  margin: 20px 0;

  hr.divider {
    margin: 10px 0 15px 0;
  }

  @include media-min-breakpoints(xs) {
    text-align: left;
  }

  > span {
    @include media-max-breakpoints(xs) {
      &:not(:first-child) hr.divider {
        display: none;
      }
    }

    @include media-min-max-breakpoints(xs, md) {
      &:nth-child(2n) hr.divider {
        display: none;
      }
    }

    @include media-min-breakpoints(md) {
      &:not(:first-child) hr.divider {
        display: none;
      }

      &:nth-child(3n + 1) hr.divider {
        display: block;
      }

      a {
        width: 33.333%;
      }
    }
  }

  a {
    display: inline-block;
    overflow: hidden;
    padding: 8px;
    width: 100%;

    @include media-min-breakpoints(xs) {
      width: 50%;
    }
  }

  img {
    max-height: 100%;
    max-width: 100%;
    transition: 0.3s;
    border-radius: 15px;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.5);

    &:hover {
      transform: scale(0.95);
    }
  }
}
</style>