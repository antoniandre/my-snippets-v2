<template lang="pug">
  v-card.ma-5.pa-3.snippet
    v-layout.mb-4(align-center)
      v-icon.mr-3(large color="grey lighten-1") star
      h1
        v-text-field.headline.snippet__title(:class="{ focus: focused.title }" :value="snippet.label" append-icon="edit" hide-details solo flat @focus="focused.title = true" @blur="focused.title = false")
      v-spacer
      span(@click="verticalLayout = !verticalLayout")
        span.mr-2.subheading.grey--text Change layout
        v-btn(color="primary" icon)
          v-icon {{ verticalLayout ? 'view_stream' : 'view_column' }}

    p.font-italic(v-html="snippet.description")
    p
      strong.mr-2.subheading id:
      v-text-field.d-inline-block.subheading.snippet__id(:class="{ focus: focused.id }" :value="id" append-icon="edit" hide-details solo flat @focus="focused.id = true" @blur="focused.id = false")

    multipane.outter(:layout="verticalLayout ? 'vertical' : 'horizontal'")
      multipane(:layout="verticalLayout ? 'horizontal' : 'vertical'")
        v-textarea.pane.pane--source(box hide-details label="HTML" v-model="snippet.source.html")
        multipane-resizer
        v-textarea.pane.pane--source(box hide-details label="CSS" v-model="snippet.source.css")
        multipane-resizer
        v-textarea.flex.pane.pane--source(box hide-details label="JS" v-model="snippet.source.js")
      multipane-resizer
      iframe.flex.pane(:srcdoc="`<html><head><script src=\"https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js\"></script><script>${snippet.source.js}</script><style>${snippet.source.css}</style></head><body>${snippet.source.html}</body></html>`")

    v-card-actions.mt-4
      router-link(:to="{ name: 'home' }")
        v-btn.mr-2(color="primary" icon)
          v-icon chevron_left
        span.subheading.grey--text Back to list
      v-spacer
      v-btn.mt-0.mx-0(color="primary" small round depressed)
        v-icon.mr-1 check
        | Save changes

</template>

<script>
import { Multipane, MultipaneResizer } from 'vue-multipane'

export default {
  props: [ 'id' ],
  components: { Multipane, MultipaneResizer },
  data: () => ({
    snippet: {
      label: '',
      description: '',
      icon: '',
      source: {
        html: '',
        css: '',
        js: ''
      }
    },
    verticalLayout: true,
    focused: {
      title: false,
      id: false
    }
  }),
  created () {
    const json = require(`@/assets/snippets/${this.id}.json`)
    this.snippet = Object.assign(this.snippet, json)
  }
}
</script>

<style lang="scss">
$primary: #42b983;

.v-card__actions a {
  text-decoration: none;
}

.v-text-field.v-text-field--solo .v-input__control {min-height: 2em;}

.snippet__title,
.snippet__id {
  .v-icon {
    opacity: 0;
    font-size: 1.3em;
  }

  .v-input__slot {
    padding: 0 !important;
    border-bottom: 1px solid transparent;
  }

  &:hover,
  &.focus {
    .v-icon {
      opacity: 1;
    }

    .v-input__slot {
      border-bottom-color: #ddd;
    }
  }

  &.focus .v-input__slot {
    border-bottom-color: $primary;
  }
}

.multipane {
  &.layout-v {
    height: 400px;

    > .multipane-resizer {margin-left: 0;left: 0;}
  }

  &.layout-h {
    height: 100%;

    > .multipane-resizer {margin-top: 0;top: 0;}
  }

  > .pane {
    overflow: hidden;
    background: #f8f8f8;
    box-shadow: inset 0 0 4px rgba(#000, 0.1);
  }

  > .multipane-resizer {
    position: relative;
    background: #fff;
    z-index: 2;

    &:before {
      content: "";
      position: absolute;
      display: block;
      width: 4px;
      height: 40px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      border: 1px solid #ccc;
      border-width: 0 1px;
      transition: 0.3s ease;

    }

    &:hover:before {
      border-color: #999;
    }
  }

  &.layout-h > .multipane-resizer:before {
    width: 40px;
    height: 4px;
    border-width: 1px 0;
  }
}

.outter.layout-h {height: 400px;}
.layout-v .layout-h {width: 50%;}
.layout-h .layout-v {height: 50%;}
.layout-h .layout-v {width: 100% !important;}
.layout-v .layout-h {height: 100% !important;}
.layout-v .layout-h > .pane {width: 100% !important;}
.layout-h .layout-v > .pane {height: 100% !important;}
.layout-v .pane--source {height: 33%;}
.layout-h .pane--source {width: 33%;}

.v-input__control, .v-input__slot {height: 100% !important;}

iframe {
  border: none;
}
</style>
