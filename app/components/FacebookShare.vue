<script  lang="tsx">
import Component from 'nuxt-class-component';

import { BaseComponent } from '../interfaces/baseComponent';

@Component()
export default class FacebookShare extends BaseComponent {
  share() {
    (window as any).FB.ui({
      method: 'feed',
      link: window.location.href
    });
  }

  render(h: any) {
    return (
      <button onClick={this.share.bind(this)} class="btn">
        <i class="fa fa-facebook-official" />
        Compartilhar
      </button>
    );
  }
}
</script>

<style lang="scss" scoped>
.btn {
  background-color: #3b5998;
  color: white;
  font-weight: normal;
  letter-spacing: 0.5px;
  font-size: 12px;
  transition: 0.3s;
  box-shadow: 0 3px 5px hsla(0, 0%, 44%, 0.1);

  i {
    font-size: 16px;
    vertical-align: center;
  }

  &:hover {
    background-color: lighten(#3b5998, 5%);
    transform: translateY(-3px);
    box-shadow: 0 3px 5px hsla(0, 0%, 44%, 0.6);
  }
}
</style>
