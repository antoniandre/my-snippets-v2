<template lang="pug">
  v-container(fluid)
    v-slide-y-transition(mode="out-in")
      v-container(grid-list-sm fluid)
        v-layout(row wrap)
          v-flex(v-for="n in 16" :key="n" xs3 sm2 md2 lg1 d-flex)
            v-card.d-flex(flat tile)
              router-link(to="/snippet/animated-svg-valid")
                v-img(:src="`https://picsum.photos/250/150?image=${n * 5 + 10}`"
                      :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}`"
                      aspect-ratio="1"
                      class="grey lighten-2")
                  v-layout(slot="placeholder" fill-height align-center justify-center ma-0)
                    v-progress-circular(indeterminate color="grey lighten-5")
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
