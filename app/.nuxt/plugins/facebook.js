import { FACEBOOK_ID } from '../../config';

window.fbAsyncInit = () => {
  FB.init({
    appId: FACEBOOK_ID,
    autoLogAppEvents: true,
    xfbml: true,
    version: "v2.11"
  });
};

const js = document.createElement('script');
js.src = "https://connect.facebook.net/pt_BR/all.js#xfbml=1&version=v2.11&appId=" + FACEBOOK_ID;
js.async = 'async';

document.body.appendChild(js);