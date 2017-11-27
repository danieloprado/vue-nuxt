import marked from 'marked';
import toastr from 'toastr';

export function show(message: string, img?: string): void {
  const template = `
  <div class="product-toast">
    ${!img ? '' : `<div class="img"><img src="${img}"></div>`}
    <div>${marked(message)}</div>
  </div>`;

  toastr.info(template);
}
