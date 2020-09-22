// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'WhiteLuckBringers - 白い幸運屋',
  templates: {
    Work: '/work/:id',
  },
  plugins: [
    {
      use: 'gridsome-plugin-typescript',
    },
  ],
  css: {
    loaderOptions: {
      postcss: {
        plugins: [require('tailwindcss'), require('autoprefixer')],
      },
    },
  },
};
