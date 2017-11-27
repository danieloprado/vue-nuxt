import $ from 'jquery';
import Vue, { VNodeDirective } from 'vue';

Vue.directive('accordion', {
  inserted(el: HTMLElement, binding: VNodeDirective): void {
    el.classList.add('panel');
    el.classList.add('collapse');

    collapse(el, binding.value);
  },
  update(el: HTMLElement, binding: VNodeDirective): void {
    collapse(el, binding.value);
  },
  unbind(el: HTMLElement): void {
    el.classList.remove('panel');
    el.classList.remove('collapse');
  }
});

function collapse(el: HTMLElement, show: boolean): void {
  setTimeout(() => $(el).collapse(show ? 'show' : 'hide'));
}
