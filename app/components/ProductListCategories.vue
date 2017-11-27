<script  lang="tsx">
import Component from 'nuxt-class-component';
import { Prop } from 'vue-property-decorator';

import { BaseComponent } from '../interfaces/baseComponent';
import { ICategory } from '../interfaces/category';

interface IProps {
  categories: ICategory[];
}

@Component()
export default class Header extends BaseComponent<IProps> {
  showCategories: boolean;

  @Prop({ required: true })
  categories: ICategory[];

  toggleCategories() {
    this.showCategories = !this.showCategories;
  }

  data() {
    return { showCategories: false };
  }

  render(h: any) {
    return (
      <div class="panel">
        <div onClick={this.toggleCategories.bind(this)} class="panel-heading">
          Categorias
        </div>
        <div>
          <nav>
            {!this.categories.length && (
              <div>
                <p class="text-center">Nenhuma sub-categoria</p>
              </div>
            )}
            <ul v-accordion={this.showCategories}>
              {this.categories.map(category => (
                <li>
                  <router-link to={category.link}>{category.name}</router-link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    );
  }
}
</script>

<style lang="scss" scoped>
@import '../theme/_index.scss';

p {
  margin: 0;
  padding: 10px;
  font-style: italic;
  opacity: 0.7;
}

ul {
  margin: 0;
  padding: 0;

  @include media-min-breakpoints(md) {
    height: auto !important;
    display: block !important;
  }

  li {
    display: block;

    a {
      display: block;
      padding: 10px 15px;
      color: $black;
      cursor: pointer;

      &:hover {
        text-decoration: none;
        background: $body-background;
      }
    }
  }
}
</style>
