export default function({ store }) {
  setTimeout(() => store.dispatch('nuxtClientInit'));
}