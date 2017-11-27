import $ from 'jquery';
import Vue, { VNodeDirective } from 'vue';

Vue.directive('validation', {
  inserted(el: HTMLElement, binding: VNodeDirective): void {
    check(el as any, binding);
  },
  update(el: HTMLElement, binding: VNodeDirective): void {
    check(el as any, binding);
  }
});

function check(element: JQuery, binding: VNodeDirective): void {
  element = $(element);

  const name = element
    .find('[name]')
    .first()
    .attr('name');

  element.removeClass('has-error has-feedback');
  element.find('.validation-error,.form-control-feedback').remove();

  if (binding.value && binding.value.first(name)) {
    element.addClass('has-error has-feedback');
    element.append(
      `
        <span class="glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>
        <span class="validation-error">${binding.value.first(name)}</span>
        `
    );
    return;
  }
}
