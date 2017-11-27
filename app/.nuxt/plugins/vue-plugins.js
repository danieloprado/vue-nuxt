import '@vtex/phone/countries/BRA';

import * as phoneValidator from '@vtex/phone';
import { CNPJ, CPF } from 'cpf_cnpj';
import VeeValidate, { Validator } from 'vee-validate';
import ptBR from 'vee-validate/dist/locale/pt_BR';
import Vue from 'vue';
import MaskedInput from 'vue-text-mask';

Vue.component('masked-input', MaskedInput);

Validator.extend('cpfCnpj', {
  messages: { ptBR: field => `O campo ${field} não inválido` },
  validate: value => CPF.isValid(value) || CNPJ.isValid(value)
});

Validator.extend('phone', {
  messages: { ptBR: field => `O campo ${field} não inválido` },
  validate: value => phoneValidator.validate(value)
});

Validator.localize('ptBR', ptBR);
Vue.use(VeeValidate, {
  inject: true,
  locale: 'ptBR'
});
