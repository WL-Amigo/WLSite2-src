// This is where project configuration and plugin options are located. 
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'WhiteLuckers - 白い幸運屋',
  plugins: [
    { use: 'gridsome-plugin-pug', },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'articles/**/*.md',
        typeName: 'Article',
        route: 'articles/:year/:month/:day/:slug',
        remark: {
          externalLinksTarget: '_blank',
          externalLinksRel: ['nofollow', 'noopener', 'noreferrer'],
        }
      }
    }
  ],
  transformers: {
    remark: {}
  }
}
