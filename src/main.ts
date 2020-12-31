// This is the main.js file. Import global CSS and scripts here.
// The Client API can be used here. Learn more: gridsome.org/docs/client-api

import VueCompositionAPI from '@vue/composition-api';

import DefaultLayout from '@/layouts/Default.vue';
import InternalLinkButton from '@/components/common/buttons/InternalLinkButton.vue';
import ExternalLinkButton from '@/components/common/buttons/ExternalLinkButton.vue';
import Carousel from '@/components/common/carousel/Carousel.vue';
import ExternalLinkColored from '@/components/common/link/ExternalLinkColored.vue';
import './styles/global.css';

import Vue, { VueConstructor, ComponentOptions } from 'vue';
import Router from 'vue-router';
import { MetaInfo, AttributeProperty } from 'vue-meta';
import { I18n } from './locales/Translations';
import { makeOGPTags } from './utils/metainfo/OGP';

type GridsomeSetupContext = {
  router: Router;
  head: MetaInfo;
  appOptions: ComponentOptions<Vue>;
};

export default function (
  vue: VueConstructor,
  { router, head, appOptions }: GridsomeSetupContext
): void {
  // Enable Composition API
  vue.use(VueCompositionAPI);

  // Install internationalization
  appOptions.i18n = I18n;

  // Set default layout as a global component
  vue.component('layout', DefaultLayout);
  vue.component('link-button', InternalLinkButton);
  vue.component('ex-link-button', ExternalLinkButton);
  vue.component('carousel', Carousel);
  vue.component('ex-link', ExternalLinkColored);

  const HtmlAttrs: AttributeProperty = {};
  // Set default language
  HtmlAttrs['lang'] = 'ja';

  head.htmlAttrs = HtmlAttrs;

  head.meta?.push(...makeOGPTags());
}
