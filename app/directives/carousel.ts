import $ from 'jquery';
import Vue from 'vue';

Vue.directive('carousel', function carousel(el: HTMLElement): void {
  $(el).owlCarousel({
    loop: true,
    responsiveClass: true,
    nav: true,
    navText: ['', ''],
    responsive: {
      0: { items: 1 },
      768: { items: 2 },
      1024: { items: 3 },
      1400: { items: 4 }
    }
  });
});
