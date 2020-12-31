import { DefaultOGP } from '@/consts/OGP';
import { MetaPropertyName, MetaPropertyProperty } from 'vue-meta';

export const makeOGPTags = (options?: {
  description?: string;
  title?: string;
  imageUrl?: string;
}): (MetaPropertyName | MetaPropertyProperty)[] => {
  const description = options?.description ?? DefaultOGP.description;
  const title = options?.title ?? DefaultOGP.title;
  const imageUrl = options?.imageUrl ?? DefaultOGP.cardImageUrl;

  return [
    {
      key: 'description',
      name: 'description',
      content: description,
    },
    {
      key: 'twitter:card',
      name: 'twitter:card',
      content: 'summary_large_image',
    },
    {
      key: 'twitter:description',
      name: 'twitter:description',
      content: description,
    },
    { key: 'twitter:title', name: 'twitter:title', content: title },
    { key: 'twitter:site', name: 'twitter:site', content: DefaultOGP.twitter },
    {
      key: 'twitter:image',
      name: 'twitter:image',
      content: imageUrl,
    },
    {
      key: 'twitter:creator',
      name: 'twitter:creator',
      content: DefaultOGP.twitter,
    },
    { key: 'og:type', property: 'og:type', content: 'article' },
    { key: 'og:title', property: 'og:title', content: title },
    {
      key: 'og:description',
      property: 'og:description',
      content: description,
    },
    {
      key: 'og:url',
      property: 'og:url',
      content: DefaultOGP.url,
    },
    { key: 'og:image', property: 'og:image', content: imageUrl },
    // {
    //   property: "article:published_time",
    //   content: moment(this.$page.post.date).format("MM-DD-YYYY")
    // },
    // { property: "og:updated_time", content: this.$page.post.date },
    // { property: "og:image:secure_url", content: Defaults.cardImageUrl }
  ];
};
