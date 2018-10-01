<template lang="pug">
  v-app.white
    v-toolbar.elevation-0(app dense color="white")
      v-toolbar-title
        router-link(to="/")
          v-icon.mr-3(color="primary") apps
          | My Snippets
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
    v-footer.py-3.text-xs-center.justify-center.grey--text(color="white")
      span.font-italic.caption &copy; 2018 Antoni Andre. All rights reserved.
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

<style lang="scss">
a {
  text-decoration: none;
}

.v-toolbar {
  border-bottom: 1px solid #f2f2f2 !important;
}
</style>
