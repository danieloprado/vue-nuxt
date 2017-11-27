<script  lang="tsx">
import Component from 'nuxt-class-component';

import { BaseComponent } from '../interfaces/baseComponent';

@Component()
export default class Footer extends BaseComponent {
  render(h: any) {
    return (
      <footer>
        <div class="container">
          <div class="infos">
            <div class="payments">
              <p>Formas de Pagamento:</p>
              <div>
                <img src={require('../assets/img/credito.jpg')} />
                <img src={require('../assets/img/vale.jpg')} />
              </div>
            </div>

            <div class="call-center">
              <p>
                Central de Atendimento
                <span class="visible-xs-inline">&nbsp;|</span>
              </p>
              <a href="phone:9230908080"> (92) 3090-8000</a>
            </div>

            <div class="social">
              <p>Siga-nos</p>

              <a href="#" class="hover-facebook">
                <i class="fa fa-facebook-official" />
              </a>

              <a href="#" class="hover-instagram">
                <i class="fa fa-instagram" />
              </a>
            </div>
          </div>
        </div>

        <hr />
        <div class="container">
          <p class="disclaimer">
            Valor total de sua compra poderá ser alterado (para maior ou menor) por conta dos
            produtos de peso variável.<br />Garantimos a quantidade mínima de 12 unidades de cada
            produto, ou até o fim do estoque. Para melhor atender nossos clientes, não vendemos por
            atacado e reservamo-nos o direito de limitar a 12 unidades, por cliente, a quantidade
            dos produtos anunciados. Preços, ofertas e condições exclusivos para internet e válidos
            durante o dia de hoje, podendo sofrer alterações sem prévia notificação. As "ofertas
            Mais" são exclusivas para cliente Mais.
          </p>
          <p class="disclaimer-alcohol">
            A VENDA E O CONSUMO DE BEBIDAS ALCOÓLICAS SÃO PROIBIDOS PARA MENORES DE 18 ANOS.<br />BEBIDA
            ALCOÓLICA PODE CAUSAR DEPENDÊNCIA QUÍMICA E, EM EXCESSO, PROVOCA GRAVES MALES À SAÚDE.
            BEBA COM MODERAÇÃO
          </p>
          <p class="disclaimer">
            Venda sujeita à disponibilidade de estoque no dia da entrega. No caso de faltar algum
            produto, este não será entregue e o valor correspondente não será cobrado.
          </p>
        </div>
      </footer>
    );
  }
}
</script>

<style lang="scss" scoped>
@import '../theme/_index.scss';

footer {
  background: $black;
  color: white;
  border: none;
  text-align: left;
  padding: 16px 0;
}

hr {
  margin: 20px 0;
  border: 1px dashed rgba(255, 255, 255, 0.5);
}

.infos {
  font-size: 11px;

  @include media-min-breakpoints(sm) {
    display: table;
    width: 100%;

    > div {
      display: table-cell;
      vertical-align: middle;

      + div {
        padding-left: 20px;
      }
    }
  }

  .payments {
    margin-bottom: 20px;

    p {
      margin-bottom: 5px;
    }

    > div {
      background: white;
      text-align: center;
      border-radius: 3px;
      box-shadow: inset 0 0 5px $black;
      padding: 5px;

      @include media-min-breakpoints(sm) {
        img {
          max-width: 50%;
        }
      }
    }
  }
}

.call-center {
  margin-bottom: 15px;

  p {
    text-transform: uppercase;
    display: inline-block;
    margin: 0;
  }

  a {
    color: white;
  }

  @include media-min-breakpoints(sm) {
    margin-bottom: 0;

    p {
      display: block;
    }
  }
}

.social {
  p {
    margin: 0 10px 5px 0;
    display: inline-block;
  }

  @include media-min-breakpoints(sm) {
    p {
      display: block;
    }
  }

  i {
    font-size: 25px;
  }

  a {
    color: white;
    vertical-align: sub;

    + a {
      margin-left: 10px;
    }

    i {
      transition: 0.3s;
    }

    &.hover-facebook i:hover {
      transform: scale(1.2);
      color: $facebook-color;
    }

    &.hover-instagram i:hover {
      transform: scale(1.2);
      color: $instagram-color;
    }
  }
}

.disclaimer,
.disclaimer-alcohol,
.address {
  text-align: center;
  font-size: 11px;
}

.disclaimer-alcohol {
  border: 1px solid white;
  text-transform: uppercase;
  padding: 10px;
  margin: 20px 10px;
}

.address {
  color: $secondary-color;
  margin-top: 10px;
}
</style>