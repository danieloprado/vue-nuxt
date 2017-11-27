//jQuery
require('expose-loader?jQuery!jquery');
require('expose-loader?$!jquery');

//boostrap
require('bootstrap/dist/js/bootstrap.min');
require('bootstrap/dist/css/bootstrap.min.css');

//font-awesome
require('font-awesome/css/font-awesome.min.css');

//owl-carousel
require('owl.carousel/dist/owl.carousel.min');
require('owl.carousel/dist/assets/owl.carousel.min.css');

//toastr
require('toastr/build/toastr.min.css');

//loading
require('animate.css/animate.min.css');

//toastr
const toastr = require('toastr');
toastr.options.positionClass = 'toast-top-center';
toastr.options.timeOut = '3000';
toastr.options.hideDuration = '500';
toastr.options.showMethod = 'slideDown';
toastr.options.hideMethod = 'slideUp';

//facebook
window.fbAsyncInit = () => {
  console.log('init');
  FB.init({
    appId: FACEBOOK_ID,
    autoLogAppEvents: true,
    xfbml: true,
    version: 'v2.11'
  });
};
