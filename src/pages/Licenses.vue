<template lang="pug">
Layout
  #licenses
    section.section: .container: .content
      h1 本サイトで使用しているライブラリ等のライセンス表示
      ul
        li(v-for="license in licenses" :key="license.package") 
          ex-link(:href="license.url") {{ license.package }}
          |  ({{ license.license }})
</template>

<static-query>
query {
  allLicenseInfo {
    edges {
      node {
        license
        url
        package
      }
    }
  }
}
</static-query>

<script>
export default {
  computed: {
    licenses() {
      return this.$static.allLicenseInfo.edges.map(e => e.node);
    }
  }
}
</script>