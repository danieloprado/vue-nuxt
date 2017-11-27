<script  lang="tsx">
import Component from 'nuxt-class-component';
import { Prop } from 'vue-property-decorator';

import { BaseComponent } from '../interfaces/baseComponent';

interface IProps {
  'v-model': number;
  'value-change'?: (value: number) => void;
}

@Component()
export default class ProductItemCartQuantity extends BaseComponent<IProps> {
  @Prop({ default: 1 })
  value: number;

  @Prop() valueChange: Function;

  minus() {
    if (this.value === 1) return;
    this.emit(this.value - 1);
  }

  plus() {
    this.emit(this.value + 1);
  }

  change(event: any) {
    this.emit(Number(event.target.value));
  }

  emit(value: number) {
    this.$emit('input', value);
    if (this.valueChange) this.valueChange(value);
  }

  render(h: any) {
    return (
      <div class="input-group">
        <span class="input-group-btn">
          <button type="button" onClick={this.minus.bind(this)} class="btn btn-default btn-icon">
            <i class="glyphicon glyphicon-minus" />
          </button>
        </span>

        <input
          type="number"
          min="1"
          value={this.value}
          onChange={this.change.bind(this)}
          onKeyup={this.change.bind(this)}
          class="form-control"
        />

        <span class="input-group-btn">
          <button type="button" onClick={this.plus.bind(this)} class="btn btn-default btn-icon">
            <i class="glyphicon glyphicon-plus" />
          </button>
        </span>
      </div>
    );
  }
}
</script>

<style lang="scss" scoped>
@import '../theme/_index.scss';

.cart-button-text {
  margin-left: 10px;
  font-size: 18px;
}

.unavailable {
  margin: 9px 0;
  color: $red;
  font-size: 16px;
  display: block;
}

.input-group {
  width: calc(100% - 50px);
  float: left;
  max-width: 200px;

  .form-control {
    border-radius: 30px;
    text-align: center;
    height: 30px;
    margin: 0 10px;
    width: calc(100% - 20px);
  }

  .btn {
    border-radius: 30px;
    width: 25px;
    height: 25px;
    font-size: 12px;
    padding: 4px 0;
    text-align: center;
  }

  .input-group-btn:last-child .btn {
    padding-left: 2px;
  }
}

form > .btn {
  color: $primary-text-color !important;
  background: none;
  border: none;
  font-size: 20px;
  padding: 3px 10px;
  box-shadow: none;
  float: right;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    background: none;
    transform: scale(1.05);
  }
}

@include media-max-breakpoints(xs) {
  .full-button {
    .input-group {
      width: 100%;
      max-width: 100vw;
      float: none;
    }

    form > .btn {
      display: block;
      width: 100%;
      margin-top: 10px;
      float: none;
    }
  }
}
</style>