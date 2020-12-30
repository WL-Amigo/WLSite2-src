module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./src/**/*.vue', './src/**/*.ts'],
    options: {
      whitelist: [],
      whitelistPatterns: [
        /-(leave|enter|appear)(|-(to|from|active))$/,
        /^(?!(|.*?:)cursor-move).+-move$/,
        /^router-link(|-exact)-active$/,
        /data-v-.*/,
      ],
    },
  },
  theme: {
    fontFamily: {
      body: [
        'Helvetica Neue',
        'Arial',
        'Hiragino Kaku Gothic ProN',
        'Hiragino Sans',
        'Meiryo',
        'sans-serif',
      ],
    },
    inset: {
      0: 0,
      auto: 'auto',
      '1/2': '50%',
    },
    extend: {
      transitionProperty: {
        menu: 'left, width',
      },
      zIndex: {
        nav: '100',
        modal: '200',
      },
    },
  },
  variants: {},
  plugins: [],
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
  },
};
