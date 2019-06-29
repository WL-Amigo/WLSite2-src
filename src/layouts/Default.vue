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
      p c 2019 アミーゴ(Amigo)
</template>

<static-query>
query {
  metaData {
    siteName
  }
}
</static-query>

<style lang="scss">

</style>
