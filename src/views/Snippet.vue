<template lang="pug">
  div.snippet
    h1 Snippet {{ snippet.name }}
    p Some content. id: {{ id }}
    v-btn(:to="{ name: 'home' }" small)
      v-icon.mr-2 keyboard_arrow_left
      | Back to list
</template>

<script>
export default {
  props: [ 'id' ],
  data: () => ({
    snippet: {
      name: 'First Snippet'
    }
  })
}
</script>

