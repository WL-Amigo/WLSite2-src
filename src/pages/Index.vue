<template lang="pug">
Layout
  section.section
    .container
      .columns.is-centered
        .column.is-one-third: img.image(src="@/assets/logo.svg")

      .centering-container
        .buttons
          a.button.is-primary(href="/about/circle") WhiteLuckers について
          a.button.is-primary(href="/about/self") アミーゴについて

</template>


<script>
export default {
  metaInfo: {
    title: ''
  }
}
</script>

<style>
.home-links a {
  margin-right: 1rem;
}
</style>
