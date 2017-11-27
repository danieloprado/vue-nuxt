// declare module '*.vue' {
//   import Vue from 'vue';
//   export default typeof Vue;
// }

declare const process: { browser: boolean };
declare const require: Function;

declare module 'nuxt-class-component';
declare module 'vuex-persistedstate';
