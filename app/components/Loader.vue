<script  lang="tsx">
import { addHandler } from '../services/loader';
import { Watch } from 'vue-property-decorator';

import Component from 'nuxt-class-component';
import { BaseComponent } from '../interfaces/baseComponent';

@Component()
export default class Loader extends BaseComponent {
  show: boolean;
  hide: boolean;
  showClass: boolean;
  hideTimeout: any;

  data() {
    return { show: false, hide: false, showClass: false };
  }

  mounted() {
    addHandler(this.change.bind(this));
    setTimeout(() => (this.hide = true), 500);
  }

  @Watch('show')
  onShowChange(): void {
    clearTimeout(this.hideTimeout);

    if (this.show) {
      this.hide = false;
      this.showClass = true;
      return;
    }

    this.showClass = false;
    this.hideTimeout = setTimeout(() => (this.hide = true), 700);
  }

  change(show: boolean) {
    this.show = show;
  }

  render(h: any) {
    return (
      <div class={this.hide ? 'hide loader' : 'loader'}>
        <div class={'overlay animated ' + (this.showClass ? 'fadeIn in' : 'fadeOut out')} />
        <div class={'content animated ' + (this.showClass ? 'fadeInDown in' : 'fadeOutDown out')}>
          <img src={require('../assets/img/loading.svg')} />
          <p>Carregando</p>
        </div>
      </div>
    );
  }
}
</script>

<style lang="scss" scopped>
.loader.hide {
  display: none;
}
</style>