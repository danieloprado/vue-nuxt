import Vue from 'vue';
import currency from './currency';

const filters = { currency };
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key]);
});