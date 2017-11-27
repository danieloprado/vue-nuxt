<script lang="tsx">
import Component from 'nuxt-class-component';
import { Prop } from 'vue-property-decorator';

import { BaseComponent } from '../interfaces/baseComponent';
import { IBreadcrumbItem } from '../interfaces/breadcrumbItem';

interface IProps {
  links: IBreadcrumbItem[];
}

@Component()
export default class Breadcrump extends BaseComponent<IProps> {
  @Prop() links: IBreadcrumbItem[];

  render(h: any) {
    return (
      <nav>
        <ol>
          {this.links.map(link => (
            <li>
              <router-link to={link.link}>{link.display}</router-link>
            </li>
          ))}
        </ol>
      </nav>
    );
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

