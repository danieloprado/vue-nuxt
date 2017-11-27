<script  lang="tsx">
import Component from 'nuxt-class-component';
import { Watch } from 'vue-property-decorator';

import LoginForm from './LoginForm.vue';
import LoginRegistration from './LoginRegistration.vue';
import { addLoginHandler } from '../services/auth';
import { BaseComponent } from '../interfaces/baseComponent';

@Component()
export default class Login extends BaseComponent {
  id: string;
  resolve: (data: boolean) => void;
  showModal: boolean;
  step: string;
  modal: JQuery;

  @Watch('showModal')
  onChangeShowModal(show: boolean) {
    this.modal.modal(show ? 'show' : 'hide');
  }

  data() {
    return {
      id: 'login-modal',
      resolve: null as Function,
      showModal: false,
      step: ''
    };
  }

  mounted() {
    addLoginHandler(this.show.bind(this));

    this.modal = $('#' + this.id);
    this.modal.on('hidden.bs.modal', () => this.cancel());
  }

  show(step: string) {
    return new Promise(resolve => {
      if (this.resolve) this.resolve(false);
      this.resolve = resolve;
      this.step = step || 'login';
      this.showModal = true;
    });
  }

  changeStep(step: string) {
    this.step = step;
  }

  cancel() {
    this.resolve(false);
    this.showModal = false;
  }

  complete() {
    this.resolve(true);
    this.showModal = false;
  }

  render(h: any) {
    return (
      <div class="modal fade" id={this.id} tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">
                <span aria-hidden="true">&times;</span>
              </button>

              <h4 class="modal-title">{this.step === 'login' ? 'Login' : 'Cadastre-se'}</h4>
            </div>

            {this.showModal && this.step === 'login' ? (
              <div class="modal-body">
                <h4>
                  Não é cliente?
                  <br />
                  <small>Rápido e simples</small>
                </h4>

                <div class="text-center">
                  <button
                    class="btn btn-primary"
                    on-click={this.changeStep.bind(this, 'registration')}>
                    Cadastrar-se
                  </button>
                </div>

                <hr />
                <LoginForm complete-callback={this.complete.bind(this)} />
              </div>
            ) : null}

            {this.showModal && this.step === 'registration' ? (
              <LoginRegistration
                back-callback={this.changeStep.bind(this, 'login')}
                complete-callback={this.complete.bind(this)}
              />
            ) : null}
          </div>
        </div>
      </div>
    );
  }
}
</script>

<style lang="scss" scoped>
@import '../theme/_index.scss';

.modal-body h4 {
  text-align: center;
  margin-bottom: 20px;
}
</style>
