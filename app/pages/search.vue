<script  lang="tsx">
import { Watch } from 'vue-property-decorator';

import ProductListCategoriesComponent from '../components/ProductListCategories.vue';
import ProductItemComponent from '../components/ProductItem.vue';
import CategoryBreadcrumb from '../components/BreadcrumbCategory.vue';
import * as queryFactory from '../factories/productsQuery';
import * as productService from '../services/product';
import * as loaderService from '../services/loader';

import Component from 'nuxt-class-component';
import { BaseComponent } from '../interfaces/baseComponent';
import { ICategory } from '../interfaces/category';
import { IProduct } from '../interfaces/product';
import { IProductQuery } from '../factories/productsQuery';
import {} from 'nuxt';

@Component()
export default class Cart extends BaseComponent {
  total: number;
  query: IProductQuery;
  products: IProduct[];

  get categories(): ICategory[] {
    const categoryId = this.query.categoryId;
    return this.$store.getters['core/categories'].filter(c => {
      return (!categoryId && !c.parentId) || c.parentId === categoryId;
    });
  }

  @Watch('query', { deep: true })
  onQueryChange() {
    const query = queryFactory.fromModel(this.query);
    this.$router.replace({ query });
    this.queryProducts();
  }

  head() {
    return { title: 'Produtos' };
  }

  async asyncData({ query, params }: any) {
    const modelQuery = queryFactory.fromQuery(query);
    modelQuery.categoryId = params.categoryId ? Number(params.categoryId) : null;

    const { total, data } = await productService.list(modelQuery);

    return {
      total,
      products: data,
      query: modelQuery,
      showCategories: false
    };
  }

  async queryProducts() {
    const { total, data } = await loaderService.fromPromise(productService.list(this.query));

    this.total = total;
    this.products = data;
  }

  render(h: any) {
    return (
      <section>
        <div class="container header">
          <CategoryBreadcrumb category-id={this.query.categoryId} />

          <form method="get" class="text-right">
            <select v-model={this.query.pageSize} class="form-control">
              <option value="12">12 itens</option>
              <option value="18">18 itens</option>
              <option value="24">24 itens</option>
              <option value="30">30 itens</option>
            </select>
            <select v-model={this.query.order} class="form-control">
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
              <option value="price-asc">Menor preço</option>
              <option value="price-desc">Maior preço</option>
            </select>
            <select v-model={this.query.type} class="form-control">
              <option value="">Todos</option>
              <option value="1">Nenhuma Carne de Porco 2</option>
              <option value="2">Sem Álcool</option>
              <option value="3">Sem Lactóse</option>
              <option value="4">Vegetariano</option>
              <option value="5">Sem Glutem</option>
              <option value="6">Nenhuma Carne de Porco</option>
            </select>
          </form>
        </div>
        <hr class="divider" />

        <div class="container">
          <div class="row">
            <div class="col-md-3">
              <ProductListCategoriesComponent categories={this.categories} />
            </div>

            <div class="col-md-9">
              <div class="row product-list">
                {this.products.map(product => (
                  <div class="col-xs-12 col-sm-6 col-md-4">
                    <ProductItemComponent product={product} />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}
</script>

<style lang="scss" scoped>
@import '../theme/_index.scss';

.header {
  padding: 10px 15px;

  nav {
    margin-bottom: 20px;

    @include media-min-breakpoints(md) {
      margin-bottom: 0;
      float: left;
    }
  }

  form {
    @include media-min-breakpoints(md) {
      display: inline-block;
      float: right;
    }

    .form-control {
      margin-bottom: 10px;

      @include media-min-breakpoints(sm) {
        margin-bottom: 0;
        width: 33.333%;
        display: inline-block;

        + .form-control {
          width: calc(33.333% - 10px);
          margin-left: 10px;
        }
      }

      @include media-min-breakpoints(md) {
        width: auto;
      }
    }
  }

  + hr {
    margin-top: 0;
  }
}

.product-list {
  padding-right: 8px;
  padding-left: 8px;

  > div {
    padding-right: 7px;
    padding-left: 7px;
  }
}
</style>