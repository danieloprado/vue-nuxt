<script lang="tsx">
import { Prop } from 'vue-property-decorator';

import * as toast from '../services/toast';
import * as loader from '../services/loader';
import * as authService from '../services/auth';

import Component from 'nuxt-class-component';
import { BaseComponent } from '../interfaces/baseComponent';

interface IProps {
  'complete-callback': () => void;
}

@Component()
export default class LoginForm extends BaseComponent<IProps> {
  model: { email: string; password: string };

  @Prop({ required: true })
  completeCallback: () => void;

  data() {
    return {
      model: { email: '', password: '' }
    };
  }

  async submitLogin(event: Event) {
    event.preventDefault();

    const isValid = await this.$validator.validateAll();
    if (!isValid) return toast.show('Por favor, revise os dados');

    await loader.fromPromise(authService.login(this.model.email, this.model.password));
    this.completeCallback();
  }

  render(h: any) {
    return (
      <div>
        <h4>Já é cliente? Faça o login abaixo:</h4>

        <div class="text-center form-group">
          <button class="btn btn-facebook">
            <i class="fa fa-facebook" />
            Entrar com o Facebook
          </button>
        </div>

        <p class="text-center">OU</p>

        <form onSubmit={this.submitLogin.bind(this)}>
          <div class="form-group" v-validation={this.errors}>
            <input
              type="email"
              name="email"
              v-model={this.model.email}
              v-validate
              data-vv-rules={'required|email'}
              class="form-control"
              placeholder="E-mail"
            />
          </div>

          <div class="form-group" v-validation={this.errors}>
            <input
              type="password"
              name="senha"
              v-model={this.model.password}
              v-validate
              data-vv-rules={'required'}
              class="form-control"
              placeholder="Senha"
            />
          </div>

          <div class="form-group text-right">
            <a href="#" class="pull-left">
              Esqueci minha senha
            </a>
            <button class="btn btn-accent">Entrar</button>
          </div>
        </form>
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

form {
  max-width: 300px;
  margin-left: auto;
  margin-right: auto;
}
</style>
