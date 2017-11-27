<script lang="tsx">
import Component from 'nuxt-class-component';
import { Getter } from 'vuex-class';

import { BaseComponent } from '../interfaces/baseComponent';
import { IStaticPage } from '../interfaces/staticPage';

@Component()
export default class BottomLinks extends BaseComponent {
  @Getter('core/staticBottomPages') pages: IStaticPage[];

  render(h: any) {
    return (
      <section class="content">
        <div class="container">
          <ul>
            {this.pages.map(page => (
              <li>
                <router-link to={{ name: 'home' }}>{page.title}</router-link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    );
  }
}
</script>

<style lang="scss" scoped>
@import '../theme/_index.scss';

.container {
  padding: 0;
}

.content {
  background: $bottom-links-background;
  color: $bottom-links-color;
}

ul {
  margin: 10px 0;
  padding: 0;
  display: block;
  text-align: center;

  @include media-min-breakpoints(sm) {
    display: table;
    table-layout: fixed;
    width: 100%;
  }

  li {
    display: inline-block;
    width: 50%;

    @include media-min-breakpoints(sm) {
      display: table-cell;
      padding: 0;
      border-right: 1px solid $bottom-links-color;
    }

    &:last-child {
      border-right: none;
    }

    a {
      display: inline-block;
      padding: 7px 0;
      color: $bottom-links-color;
      transition: 0.3s;
      text-transform: uppercase;
      font-size: 12px;
      font-weight: bold;

      &:hover {
        text-decoration: none;
        transform: scale(1.1);
      }
    }
  }
}
</style>