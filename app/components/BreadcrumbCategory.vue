<script lang="tsx">
import { Prop } from 'vue-property-decorator';
import Component from 'nuxt-class-component';

import Breadcrump from './Breadcrumb.vue';
import { BaseComponent } from '../interfaces/baseComponent';
import { ICategory } from '../interfaces/category';
import { IBreadcrumbItem } from '../interfaces/breadcrumbItem';
import * as categoryTreeFactory from '../factories/categoryTree';

interface IProps {
  'category-id': number;
}

@Component()
export default class BreadcrumbCategory extends BaseComponent<IProps> {
  @Prop({ required: true })
  categoryId: number;

  get categoryTree(): IBreadcrumbItem[] {
    const defaultLinks: IBreadcrumbItem[] = [
      { link: { name: 'home' }, display: 'Home' },
      { link: { name: 'search-all' }, display: 'Produtos' }
    ];

    const categories: ICategory[] = this.$store.getters['core/categories'];
    const category = categories.find(c => c.id === this.categoryId);

    if (!category) return defaultLinks;

    const tree = categoryTreeFactory.up(category, categories).reverse();
    tree.push(category);

    return [...defaultLinks, ...tree.map(c => ({ link: c.link, display: c.name }))];
  }

  render(h: any) {
    return <Breadcrump links={this.categoryTree} />;
  }
}
</script>

<style lang="scss" scoped>
@import '../theme/_index.scss';
ol {
  margin: 8px 0 0 0;
  padding: 0;
  display: inline-block;
  a {
    color: $black;
    position: relative;
    &:before {
      content: '';
      position: absolute;
      background: $black;
      left: 0;
      right: 100%;
      bottom: -1px;
      height: 1px;
      transition: 0.3s;
    }
    &:hover,
    &:focus {
      text-decoration: none;
      &:before {
        right: 0;
      }
    }
  }
  li {
    display: inline-block;
    + li:before {
      font-family: 'Glyphicons Halflings';
      content: '\e080';
      color: $black;
      float: left;
      opacity: 0.8;
      margin: -1px 5px 0;
    }
  }
}
</style>

