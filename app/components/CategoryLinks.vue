<script lang="tsx">
import Component from 'nuxt-class-component';
import { Getter } from 'vuex-class';

import { ICategory } from '../interfaces/category';
import { BaseComponent } from '../interfaces/baseComponent';

@Component()
export default class CategoryLinks extends BaseComponent {
  showMenu: boolean;
  showMobile: boolean;
  opened: boolean;

  @Getter('core/mainCategories') categories: ICategory[];

  data() {
    return { showMenu: false, showMobile: false };
  }

  mounted() {
    document.body.addEventListener('click', () => {
      this.showMenu = this.showMobile = false;
    });
  }

  toggleMobile(event: Event) {
    event.stopPropagation();
    this.showMobile = !this.showMobile;
  }

  toggleMenu() {
    event.stopPropagation();
    this.showMenu = !this.showMenu;
  }

  render(h: any) {
    return (
      <div class="content">
        <a
          onClick={this.toggleMobile.bind(this)}
          class={'mobile-menu visible-xs ' + (this.opened ? 'showMobile' : '')}>
          <img src={require('../assets/img/menu.png')} />Categorias
        </a>

        <div class="container">
          <ul v-accordion={this.showMobile}>
            <li class={this.opened ? 'showMenu' : ''}>
              <a onClick={this.toggleMenu.bind(this)} class="hidden-xs">
                <img src={require('../assets/img/menu.png')} />
                <span>
                  Todos os <br /> produtos
                </span>
              </a>

              <router-link to={{ name: 'search-all' }} class="visible-xs">
                <img src={require('../assets/img/menu.png')} />
                <span>
                  Todos os <br /> produtos
                </span>
              </router-link>

              <ul v-accordion={this.showMenu} class="submenu">
                {this.categories.map(category => (
                  <li>
                    <router-link to={category.link}>{category.name}</router-link>
                  </li>
                ))}
              </ul>
            </li>
            {this.categories.map(category => (
              <li>
                <router-link to={category.link}>
                  <img src={(category.image || { url: null }).url} />
                  <span>{category.name}</span>
                </router-link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
</script>

<style lang="scss" scoped>
@import '../theme/_index.scss';

.content {
  background: $category-links-background;
}

.container {
  padding: 0;
}

.mobile-menu {
  text-align: center;
  display: block;
  padding: 10px 0;
  color: $category-links-color;
  border-bottom: 2px solid lighten($category-links-color, 20%);
  text-decoration: none;
  cursor: pointer;
  transition: 0.3s;
  user-select: none;

  img {
    max-width: 30px;
    max-height: 30px;
    margin-right: 10px;
    opacity: 0.5;
  }

  &.opened {
    background: lighten($category-links-background, 10%);
  }
}

.container > ul {
  padding: 0;
  margin: 0;
  text-align: center;
  display: table;
  table-layout: fixed;
  width: 100%;
  border: none;
  background-color: transparent;
  border-radius: 0;
  box-shadow: none;

  > li {
    display: table-cell;
    vertical-align: middle;
    position: relative;
    letter-spacing: 0.5px;

    @include media-min-max-breakpoints(xs, sm) {
      float: left;
      width: 20%;

      &:nth-child(5n) {
        border-right: none;
      }
    }

    @include media-max-breakpoints(xs) {
      float: left;
      width: 25%;

      &:nth-child(4n) {
        border-right: none;
      }
    }

    @include media-min-breakpoints(sm) {
      border-bottom: none;

      &:last-child {
        border-right: none;
      }
    }

    &:hover,
    &.opened {
      background: lighten($category-links-background, 10%);

      > a {
        transform: scale(1.1);
      }
    }

    > a,
    .dropdown > a {
      height: 88px;
      display: block;
      transition: 0.3s;
      cursor: pointer;
      padding: 15px 0 10px;

      &:hover {
        transform: scale(1.1);
      }
    }

    img {
      display: block;
      margin: auto;
      opacity: 0.5;
      max-width: 35px;
      max-height: 35px;
      margin-bottom: 3px;
    }

    span {
      font-size: 11px;
      line-height: 11px;
      display: inline-block;
      color: $category-links-color;
    }
  }
}

.submenu {
  position: absolute;
  left: 0;
  top: 88px;
  margin: 0;
  padding: 0;
  box-shadow: 0 3px 5px -1px rgba(0, 0, 0, 0.3);
  min-width: 200px;
  border-radius: 0 0 5px 5px;
  border: none;
  z-index: 1;

  @include media-max-breakpoints(sm) {
    display: none;
  }

  li {
    display: block;
    text-align: left;

    a {
      display: block;
      padding: 15px 20px;
      color: $category-links-color;
      transition: 0.3s;
      background: lighten($category-links-background, 10%);

      &:hover {
        text-decoration: none;
        background: $category-links-background;
      }
    }
  }
}

@include media-max-breakpoints(sm) {
  .container > ul {
    display: block;

    &:before,
    &:after {
      display: table;
      content: ' ';
    }

    &:after {
      clear: both;
    }

    &.collapse:not(.in) {
      display: none;
    }
  }
}
</style>