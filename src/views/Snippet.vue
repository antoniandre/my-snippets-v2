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

    splitpanes.default-theme(:horizontal="!verticalLayout" style="height:400px" watch-slots)
      splitpanes.default-theme(:horizontal="!!verticalLayout" watch-slots)
        codemirror.precode(:value="snippet.source.js" :options="{ mode: 'javascript' }")
        codemirror.precode(:value="snippet.source.html" :options="{ mode: 'htmlmixed' }")
        //- precode(language="html" editable).
          {{ snippet.source.html }}
        //- precode(language="html" editable v-text="snippet.source.html")
        .precode 3
      .precode 1

    //- multipane.outter(:layout="verticalLayout ? 'vertical' : 'horizontal'")
      multipane(:layout="verticalLayout ? 'horizontal' : 'vertical'")
        ssh-pre.pane.pane--source(language="html" contenteditable).
          {{ snippet.source.html }}
        multipane-resizer
        ssh-pre.pane.pane--source(language="css" contenteditable).
          {{ snippet.source.css }}
        multipane-resizer
        ssh-pre.flex.pane.pane--source(language="js" contenteditable).
          {{ snippet.source.js }}
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
import Splitpanes from 'splitpanes'
import 'splitpanes/dist/splitpanes.css'
// import { simpleSyntaxHighlighter } from 'simple-syntax-highlighter'
// import 'simple-syntax-highlighter/dist/simple-syntax-highlighter.min.css'
import Precode from '@/components/precode'
import { codemirror } from 'vue-codemirror-lite'
require('codemirror/mode/javascript/javascript')
require('codemirror/mode/htmlmixed/htmlmixed')
require('codemirror/mode/vue/vue')

export default {
  props: [ 'id' ],
  components: { Splitpanes, Precode, codemirror },
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

iframe {
  border: none;
}

// .splitpanes {
//   &__pane {}
//   &--vertical &__splitter {width: 10px;background-color: #fff;}
//   &--horizontal &__splitter {height: 10px;background-color: #fff;}
// }

.CodeMirror {
  background-color: transparent;
}
</style>
