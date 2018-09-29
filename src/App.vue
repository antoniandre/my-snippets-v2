<template lang="pug">
  v-app
    v-toolbar.elevation-0(app dense color="white")
      v-toolbar-title My Snippets
      v-spacer
      v-btn(icon @click.stop="rightDrawer = !rightDrawer")
        v-icon menu
    v-content
      router-view
    v-navigation-drawer(temporary right v-model="rightDrawer" fixed app)
      v-list
        v-list-tile(@click="")
          v-list-tile-action
            v-icon compare_arrows
          v-list-tile-title Switch drawer (click me)
    v-footer(app)
      span &copy; 2018 Antoni Andre. All rights reserved.
</template>

<script>

export default {
  data () {
    return {
      drawer: true,
      fixed: false,
      rightDrawer: false
    }
  }
}
</script>
