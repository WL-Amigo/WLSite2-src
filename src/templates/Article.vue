<template lang="pug">
Layout(:title="$page.article.title")
  section.section
    .container.content
      h1 {{ $page.article.displayTitle }}
      div(v-html="$page.article.content")
</template>

<page-query>
query Article ($path: String!) {
  article (path: $path) {
    displayTitle
    date (format: "D MMMM, YYYY")
    content
  }
}
</page-query>

<script>
export default {
}
</script>
