<script  lang="tsx">
import LoaderComponent from '../components/Loader.vue';

import Vue from 'vue';
import Component from 'nuxt-class-component';

@Component({
  props: ['error']
})
export default class Error extends Vue {
  error: any;
  loaded: boolean;

  data() {
    return { loaded: false };
  }

  beforeMount() {
    switch (this.error.statusCode) {
      case 404:
        this.error.message = 'Página não encontrada';
        break;
      default:
        this.error.message = 'Erro Inesperado';
        break;
    }
  }

  mounted() {
    this.loaded = true;
  }

  render(h: any) {
    return (
      <section class="text-center" v-show={this.loaded}>
        <LoaderComponent />

        <h1 class="title">{this.error.statusCode}</h1>
        <h2 class="info">{this.error.message}</h2>
        <router-link to={{ name: 'home' }} class="btn btn-primary">
          <i class="glyphicon glyphicon-chevron-left" />
          Voltar para o inicio
        </router-link>
      </section>
    );
  }
}
</script>

<style lang="scss">
@import '../theme/styles.scss';
</style>

<style lang="scss" scoped>
@import '../theme/_index.scss';

section {
  background: $body-background;
  margin: 0;
  padding: 0;
  min-height: 100vh;
  min-width: 100vw;
}

.title {
  margin-top: 15px;
  font-size: 5em;
}

.info {
  font-weight: 300;
  margin: 0;
}

.btn {
  margin-top: 50px;
}

.logo {
  background: $secondary-color;
  padding: 20px 0;
  box-shadow: $box-shadow;
}
</style>
