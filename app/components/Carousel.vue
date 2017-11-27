<script lang="tsx">
import uuid from 'uuid';
import { Prop } from 'vue-property-decorator';
import Component from 'nuxt-class-component';

import { BaseComponent } from '../interfaces/baseComponent';
import { ISlide } from '../interfaces/slides';

interface IProps {
  slides: ISlide[];
}

@Component()
export default class Carousel extends BaseComponent<IProps> {
  id: string;
  ref: string;

  @Prop({ required: true })
  slides: ISlide[];

  data() {
    const id = uuid();
    return { id, ref: `#${id}` };
  }

  render(h: any) {
    if (!this.slides.length) return;

    return (
      <div data-ride="carousel" id={this.id} data-interval="3000" class="carousel slide">
        <ol class="carousel-indicators">
          {this.slides.map((slide, index) => (
            <li data-target={this.ref} data-slide-to="0" class={index === 0 && 'active'} />
          ))}
        </ol>
        <div class="carousel-inner">
          {this.slides.map((slide, index) => (
            <div class={index === 0 ? 'active item' : 'item'}>
              <img src={slide.url} />
            </div>
          ))}
        </div>
        <a href={this.ref} data-slide="prev" class="left carousel-control">
          <span class="glyphicon glyphicon-chevron-left" />
        </a>
        <a href={this.ref} data-slide="next" class="right carousel-control">
          <span class="glyphicon glyphicon-chevron-right" />
        </a>
      </div>
    );
  }
}
</script>

<style lang="scss" scoped>
.carousel-inner {
  min-height: 100px;
}

.carousel-inner > .item > a > img,
.carousel-inner > .item > img {
  width: 100vw;
}

.carousel-indicators li {
  margin: 0 5px;
  background: white;
  transition: 0.3s;

  &.active {
    box-shadow: 0 0 3px 2px white;
  }
}
</style>