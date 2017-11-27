<script  lang="tsx">
import LoaderComponent from '../components/Loader.vue';
import ConfirmComponent from '../components/Confirm.vue';
import LoginComponent from '../components/Login.vue';
import HeaderComponent from '../components/Header.vue';
import FooterComponent from '../components/Footer.vue';
import CategoryLinksComponent from '../components/CategoryLinks.vue';
import BottomLinksComponent from '../components/BottomLinks.vue';

import Vue from 'vue';
import Component from 'nuxt-class-component';

@Component({})
export default class Header extends Vue {
  loaded: boolean;

  data() {
    return { loaded: false };
  }
  mounted() {
    this.loaded = true;
  }
  render(h: any) {
    return (
      <div>
        <LoaderComponent />

        <div v-show={this.loaded} class="body-content">
          <ConfirmComponent />
          <LoginComponent />
          <HeaderComponent />

          <div class="main-content">
            <CategoryLinksComponent />
            <transition name="slide-fade">
              <nuxt />
            </transition>
          </div>

          <BottomLinksComponent />
          <FooterComponent />
        </div>
      </div>
    );
  }
}
</script>

<style lang="scss">
@import '../theme/styles.scss';
</style>
