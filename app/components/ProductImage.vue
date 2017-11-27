<script  lang="tsx">
import Component from 'nuxt-class-component';
import { Prop } from 'vue-property-decorator';

import { IProduct } from '../interfaces/product';
import { BaseComponent } from '../interfaces/baseComponent';

interface IProps {
  product: IProduct;
}

@Component()
export default class ProductImage extends BaseComponent<IProps> {
  image: string;

  @Prop({ required: true })
  product: IProduct;

  data() {
    return { image: this.product.thumbnail };
  }

  render(h: any) {
    return <img src={this.image} />;
  }
}
</script>