<script  lang="tsx">
import Component from 'nuxt-class-component';

import { addHandler } from '../services/confirm';
import { BaseComponent } from '../interfaces/baseComponent';

@Component()
export default class Confirm extends BaseComponent {
  id: string;
  title: string;
  message: string;
  modal: JQuery;
  resolve: (data: boolean) => void;

  data() {
    return {
      id: 'confirm-modal',
      title: '',
      message: ''
    };
  }

  mounted() {
    addHandler(this.show.bind(this));
    this.modal = $('#' + this.id);
    this.modal.on('hide.bs.modal', () => this.resolve(false));
  }

  show(message: string, title = 'Confirmação') {
    return new Promise(resolve => {
      if (this.resolve) this.resolve(false);

      this.$nextTick(() => {
        this.title = title;
        this.message = message;
        this.resolve = resolve;

        this.modal.modal('show');
      });
    });
  }

  ok() {
    this.resolve(true);
    this.modal.modal('hide');
  }

  render(h: any) {
    return (
      <div class="modal fade" id={this.id} tabindex="-1">
        <div class="modal-dialog modal-sm">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal">
                <span aria-hidden="true">&times;</span>
              </button>

              <h4 class="modal-title">{this.title}</h4>
            </div>

            <div class="modal-body" domPropsInnerHTML={this.message} />

            <div class="modal-footer">
              <button type="button" class="btn btn-danger" data-dismiss="modal">
                Cancelar
              </button>
              <button type="button" class="btn btn-primary" onClick={this.ok.bind(this)}>
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
</script>