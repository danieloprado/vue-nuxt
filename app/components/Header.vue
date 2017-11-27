<script  lang="tsx">
import Component from 'nuxt-class-component';

import CartButton from './CartButton.vue';
import * as authService from '../services/auth';
import { BaseComponent } from '../interfaces/baseComponent';

@Component()
export default class Header extends BaseComponent {
  small: boolean;

  data() {
    return { small: false };
  }

  mounted() {
    let timeout: any = null;
    window.addEventListener('scroll', () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        this.small = (document.scrollingElement || document.body).scrollTop > 50;
      }, 10);
    });
  }

  login() {
    authService.openLogin();
  }

  registration() {
    authService.openRegistration();
  }

  render(h: any) {
    return (
      <header class={this.small ? 'small-header' : ''}>
        <div class="container">
          <div class="row">
            <div class="col-sm-12">
              <router-link to={{ name: 'home' }} class="logo">
                <img class="visible-xxs" src="http://placehold.it/115x115/23887a/ffffff" />
                <img class="hidden-xxs" src="http://placehold.it/189x115/23887a/ffffff" />
              </router-link>
              <div class="search-box">
                <ul class="hidden-xs">
                  <li>
                    <a href="#">Central de atendimento</a>
                  </li>
                  <li class="visible-lg-inline-block">Demais localidades</li>
                </ul>
                <form>
                  <input type="text" placeholder="Buscar produtos" class="form-control" />
                  <button>
                    <i class="glyphicon glyphicon-search" />
                  </button>
                </form>
              </div>

              <div class="user-box">
                <ul class="hidden-xs">
                  <li>
                    <a href="#" on-click={this.login.bind(this)}>
                      <i class="glyphicon glyphicon-user hidden-sm" />
                      <span>Entrar</span>
                    </a>
                  </li>

                  <li>
                    <a href="#" on-click={this.registration.bind(this)}>
                      <i class="glyphicon glyphicon-pencil hidden-sm" />
                      <span>Cadastre-se</span>
                    </a>
                  </li>
                </ul>

                <CartButton />
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}
</script>

<style lang="scss" scoped>
@import '../theme/_index.scss';

header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: $secondary-color;
  padding: 10px 0 15px;
  box-shadow: 0px 0px 5px 1px rgba(0, 0, 0, 0.5);
  transition: 0.1s;
  z-index: 99;
}

.logo {
  width: 80px;
  height: auto;
  vertical-align: middle;
  text-align: center;
  transition: 0.3s;
  float: left;
  margin-right: 10px;

  @include media-min-breakpoints(xs) {
    margin-right: 30px;
    width: 190px;
  }

  @include media-min-breakpoints(sm) {
    margin-right: 0;
    display: inline-block;
    float: none;
  }

  img {
    max-width: 90px;
    max-height: 70px;
    transition: 0.3s;
  }

  &:hover img {
    transform: translateY(-2px);
  }
}

.search-box {
  display: inline-block;
  vertical-align: middle;
  width: calc(100% - 90px);
  float: left;

  @include media-min-breakpoints(xs) {
    margin-top: 20px;
    width: calc(100% - 220px);
  }

  @include media-min-breakpoints(sm) {
    width: calc(100% - 430px);
    padding: 0 30px;
    float: none;
    margin-top: 0;
  }

  @include media-min-breakpoints(md) {
    width: calc(100% - 470px);
    padding: 0 50px;
  }

  ul {
    display: block;
    text-align: center;
    padding: 0;
    margin: 0 0 10px 0;

    li {
      display: inline-block;
      color: white;
      font-size: 12px;
      padding: 0 10px;
      border-left: 1px solid white;
      text-shadow: 0 1px 5px rgba(113, 113, 113, 0.5);

      &:first-child {
        border-left: none;
      }

      a {
        color: inherit;
        transition: 0.3s;
        display: inline-block;

        &:hover {
          text-decoration: none;
          transform: translateY(-2px);
        }
      }
    }
  }

  form {
    position: relative;

    input {
      border-radius: 50px;
      border: none;
      padding: 6px 35px 6px 20px;
      box-shadow: 0 1px 5px rgba(113, 113, 113, 0.5);
      transition: 0.3s;
      text-overflow: ellipsis;

      &:focus {
        box-shadow: 0 3px 5px rgba(113, 113, 113, 0.6);
        transform: translateY(-2px);

        + button {
          transform: translateY(-2px);
        }
      }
    }

    button {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      border: none;
      background: none;
      width: 50px;
      transition: 0.3s;
    }
  }
}

.user-box {
  display: inline-block;
  width: calc(100% - 90px);
  vertical-align: middle;
  float: left;
  margin-top: 5px;
  transition: 0.3s;

  @include media-min-breakpoints(xs) {
    width: calc(100% - 220px);
  }

  @include media-min-breakpoints(sm) {
    float: none;
    width: 220px;
    margin-top: 0;
  }

  @include media-min-breakpoints(md) {
    width: 270px;
  }

  ul {
    padding: 0;
    margin: 0;
    display: table;
    width: 100%;

    li {
      display: table-cell;
      text-align: center;

      a {
        color: white;
        padding: 5px 10px;
        font-size: 14px;
        text-transform: uppercase;
        transition: 0.3s;
        display: block;
        text-shadow: 0 1px 5px rgba(113, 113, 113, 0.5);

        &:hover {
          text-decoration: none;
          transform: translateY(-2px);
        }

        i {
          margin-right: 10px;
        }
      }
    }
  }
}

.small-header {
  box-shadow: 0px 0px 15px 1px rgba(0, 0, 0, 0.5);

  .logo {
    max-width: 100px;
    max-height: 60px;
  }

  .cart-button {
    margin-top: 0;
  }

  .search-box {
    margin-top: 0;
    width: calc(100% - 130px);

    @include media-min-breakpoints(sm) {
      width: calc(100% - 320px);
      padding: 0 30px;
    }

    @include media-min-breakpoints(md) {
      width: calc(100% - 370px);
      padding: 0 30px;
    }
  }

  .user-box {
    width: calc(100% - 130px);

    @include media-min-breakpoints(sm) {
      width: 220px;
    }

    @include media-min-breakpoints(md) {
      width: 270px;
    }
  }
}
</style>