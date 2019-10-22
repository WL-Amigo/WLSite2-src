// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import DefaultLayout from '~/layouts/Default.vue'
import '@/assets/global.scss'
import Buefy from 'buefy'
import { SafeExternalLinkComponent } from './components/common/SafeExternalLink';

export default function (Vue, { router, head, isClient }) {
  Vue.use(Buefy);

  Vue.component('ex-link', SafeExternalLinkComponent);

  // Set default layout as a global component
  Vue.component('Layout', DefaultLayout);
}
