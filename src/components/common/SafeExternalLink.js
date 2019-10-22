// cf. https://github.com/Developmint/vue-link

export const SafeExternalLinkComponent = {
  functional: true,
  props: {
    href: {
      type: String,
      required: true,
    },
  },
  render(h, { data, props, children }) {
    return h('a', {
      ...data,
      attrs: {
        ...data.attrs,
        href: props.href,
        rel: 'noopener',
        target: '_blank',
      },
    }, children);
  }
}