<script  lang="tsx">
import { Prop } from 'vue-property-decorator';
import Component from 'nuxt-class-component';

import masks from '../filters/masks';
import * as toast from '../services/toast';
import * as loader from '../services/loader';
import * as authService from '../services/auth';
import { BaseComponent } from '../interfaces/baseComponent';

interface IProps {
  'complete-callback': () => void;
  'back-callback': () => void;
}

interface IModel {
  name: string;
  email: string;
  phone: string;
  cellphone: string;
  document: string;
  gender: string;
  password: string;
  confirmPassword: string;
}

@Component()
export default class LoginRegistration extends BaseComponent<IProps> {
  model: IModel;

  @Prop({ required: true })
  completeCallback: () => void;

  @Prop({ required: true })
  backCallback: () => void;

  data() {
    return {
      model: {
        name: '',
        email: '',
        phone: '',
        cellphone: '',
        document: '',
        gender: '',
        password: '',
        confirmPassword: ''
      }
    };
  }

  mounted() {
    this.$validator.reset();
  }

  async submitLogin(event: Event) {
    event.preventDefault();

    const isValid = await this.$validator.validateAll();
    if (!isValid) return toast.show('Por favor, revise os dados');

    await loader.fromPromise(authService.registration(this.model));
    this.completeCallback();
  }

  render(h: any) {
    return (
      <form onSubmit={this.submitLogin.bind(this)}>
        <div class="modal-body">
          <h4>Dados para cadastro</h4>

          <div class="form-group" v-validation={this.errors}>
            <label class="control-label required">Nome</label>
            <input
              type="text"
              name="nome"
              v-model={this.model.name}
              v-validate
              data-vv-rules={'required'}
              class="form-control"
            />
          </div>

          <div class="row">
            <div class="col-xs-12 col-sm-7">
              <div class="form-group" v-validation={this.errors}>
                <label class="control-label required">Email</label>
                <input
                  type="email"
                  name="email"
                  v-model={this.model.email}
                  v-validate
                  data-vv-rules={'required|email'}
                  class="form-control"
                />
              </div>
            </div>

            <div class="col-xs-12 col-sm-5">
              <div class="form-group" v-validation={this.errors}>
                <label class="control-label required">CPF</label>
                <masked-input
                  type="text"
                  name="CPF"
                  v-model={this.model.document}
                  v-validate
                  data-vv-rules={'required|cpfCnpj'}
                  mask={masks.cpfCnpj}
                  guide={false}
                  class="form-control"
                />
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-xs-12 col-sm-4">
              <div class="form-group" v-validation={this.errors}>
                <label class="control-label required">Telefone</label>
                <masked-input
                  type="tel"
                  name="telefone"
                  v-model={this.model.phone}
                  v-validate
                  data-vv-rules={'required|phone'}
                  mask={masks.phone}
                  guide={false}
                  class="form-control"
                />
              </div>
            </div>

            <div class="col-xs-12 col-sm-4">
              <div class="form-group" v-validation={this.errors}>
                <label class="control-label required">Celular</label>
                <masked-input
                  type="tel"
                  name="celular"
                  v-model={this.model.cellphone}
                  v-validate
                  data-vv-rules={'required'}
                  mask={masks.phone}
                  guide={false}
                  class="form-control"
                />
              </div>
            </div>

            <div class="col-xs-12 col-sm-4">
              <div class="form-group" v-validation={this.errors}>
                <label class="control-label">Sexo</label>
                <input type="text" name="sexo" v-model={this.model.gender} class="form-control" />
              </div>
            </div>
          </div>

          <hr />
          <h4>Dados de acesso</h4>

          <div class="row">
            <div class="col-xs-12 col-sm-6">
              <div class="form-group" v-validation={this.errors}>
                <label class="control-label required">Senha</label>
                <input
                  type="password"
                  name="senha"
                  v-model={this.model.password}
                  v-validate
                  data-vv-rules={'required|min:8'}
                  class="form-control"
                />
              </div>
            </div>

            <div class="col-xs-12 col-sm-6">
              <div class="form-group" v-validation={this.errors}>
                <label class="control-label required">Confirmar senha</label>
                <input
                  type="password"
                  name="confirmar"
                  v-model={this.model.confirmPassword}
                  v-validate
                  data-vv-rules={'required|confirmed:senha'}
                  class="form-control"
                />
              </div>
            </div>
          </div>
        </div>

        <div class="modal-footer">
          <button type="button" class="btn btn-default pull-left" on-click={this.backCallback}>
            <i class="glyphicon glyphicon-chevron-left" />
            Entrar
          </button>
          <button class="btn btn-accent">Cadastrar</button>
        </div>
      </form>
    );
  }
}
</script>

<style lang="scss" scoped>
@import '../theme/_index.scss';

.modal-body h4 {
  margin-bottom: 20px;
}
</style>
