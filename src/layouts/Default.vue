<template lang="pug">
div
  nav.navbar
    .container
      .navbar-brand
        a.navbar-item(href="/") WhiteLuckers
      .navbar-menu
        .navbar-start
          .navbar-item.has-dropdown.is-hoverable
            a.navbar-link あばうと
            .navbar-dropdown
              a.navbar-item(href="/about/circle") WhiteLuckersについて
              a.navbar-item(href="/about/self") アミーゴの自己紹介
        
        .navbar-end
  slot
  footer.footer
    .content.has-text-centered
      p &copy; 2019-{{ $static.metadata.buildYear }} アミーゴ(Amigo)
      p
        ex-link.sns-link(href="https://twitter.com/WL_Amigo"): fa-icon(:icon="['fab', 'twitter']" size="3x")
        ex-link.sns-link(href="https://github.com/WL-Amigo"): fa-icon(:icon="['fab', 'github']" size="3x")
        ex-link.sns-link(href="https://soundcloud.com/amigo-whiteluckers"): fa-icon(:icon="['fab', 'soundcloud']" size="3x")
      p powered by 
        ex-link(href="https://gridsome.org/") Gridsome
        | , 
        ex-link(href="https://www.netlify.com/") Netlify
</template>

<static-query>
query {
  metadata {
    siteName
    buildYear
  }
}
</static-query>

<style lang="scss" scoped>
.sns-link {
  padding: 0 2rem;
  color: #DDD;
  &:hover {
    color: #555;
  }
}
</style>
