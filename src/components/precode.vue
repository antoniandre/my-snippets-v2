<script>
export default {
  props: {
    language: {
      type: String,
      default: 'text'
    },
    editable: {
      type: Boolean,
      default: false
    },
    wrap: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    knownLanguages: ['text', 'js', 'css', 'php', 'html'],
    notSupportedMessage: 'Sorry this language is not supported at the moment.',
    contents: {
      original: '',
      parsed: '',
      selection: {
        start: null,
        end: null,
        text: null
      }
    }
  }),

  methods: {
    parseContent (content) {
      console.log('parsing new content', content)

      return content.replace(/</g, '&lt;')
      // return content.replace(/<([^>]*?)>/g, (_, ...match) => {
      //   console.log(match, 'here')
      //   return match[0]
      // })

      // let newContent = ''
      // let htmlTree = []
      // let matchingParts = [
      //   '<(/?)', // tagOpen.
      //   '([a-zA-Z0-9-:]+)(?=[\\s/>])', // tagName.
      //   '((?:\\s+[a-zA-Z0-9-_:]+?(?:="[^"]+?")?)*)', // attributes.
      //   '\\s*(/?)>', // tagClose.
      // ]

      // newContent = content.replace(new RegExp(matchingParts.join(''), 'gs'), (full, ...tagMatch) => {
      //   let [slashOpen, tagName, attributes, slashClose, ...__] = tagMatch
      //   let tag = {
      //     chevronOpen: '<span class="tag ponctuation chevron"><</span>',
      //     slashOpen: slashOpen ? '<span class="tag ponctuation slash">/</span>' : '',
      //     name: `<span class="tag name">${tagName}</span>`,
      //     attributes: `<span class="tag attributes">${attributes}</span>`,
      //     slashClose: slashClose ? '<span class="tag ponctuation slash">/</span>' : '',
      //     chevronClose: '<span class="tag ponctuation chevron">></span>'
      //   }

      //   return tag.chevronOpen
      //               + tag.slashOpen
      //               + tag.name
      //               + tag.attributes
      //               + tag.slashClose
      //               + tag.chevronClose

      //   console.log(full, tagMatch)
      // })

      return newContent
    },
    /* parseContent_old (content) {
      let newContent = ''
      let htmlTree = []
      let matchingParts = [
        '<(/?)', // tagOpen.
        '([a-zA-Z0-9-:]+)(?=[\\s/>])', // tagName.
        '((?:\\s+[a-zA-Z0-9-_:]+?="[^"]+?")*)', // attributes.
        '\\s*(/?)>', // tagClose.
      ]
      let regexp = new RegExp(matchingParts.join(''), 'gs')
      // let tags = content.match(regexp)
      let tagMatch = null

      while (tagMatch = regexp.exec(content)) {
        let [_, slashOpen, tagName, attributes, slashClose, ...__] = tagMatch
        let tag = {
          chevronOpen: '<span class="tag ponctuation chevron"><</span>',
          slashOpen: slashOpen ? '<span class="tag ponctuation slash">/</span>' : '',
          name: `<span class="tag name">${tagName}</span>`,
          attributes: `<span class="tag attributes">${attributes}</span>`,
          slashClose: slashClose ? '<span class="tag ponctuation slash">/</span>' : '',
          chevronClose: '<span class="tag ponctuation chevron">></span>'
        }

        newContent += tag.chevronOpen
                    + tag.slashOpen
                    + tag.name
                    + tag.attributes
                    + tag.slashClose
                    + tag.chevronClose
      }
      // tags.forEach((match, pos, arr) => {
      //   console.log(match)
      //   newContent += `<span class="tag">${match}</span>`
      // })

      // htmlTree.push(createEl('span', { class: 'chevron' }, ))

      return newContent
    } */

    getSelection () {
      let selectedText = ''
      let selection = null

      if (window.getSelection) {
        selection = window.getSelection()
        selectedText = selection.toString()
      } else if (document.selection) {
        selection = document.selection
        selectedText = selection.createRange().text
      }

      return this.contents.selection = {
        start: selection.baseOffset,
        end: selection.extentOffset,
        text: selectedText
      }
    },

    setCaret (position) {
      let el = this.$el
      let range = document.createRange()
      let sel = window.getSelection()
      range.setStart(el.childNodes[0], position)
      range.collapse(true)
      sel.removeAllRanges()
      sel.addRange(range)
    }
  },

  mounted () {
    this.contents.original = this.$el && [...this.$el.childNodes].map(node => node.textContent).join('') || ''
    // console.log(this.contents.original, "here", [...this.$el.childNodes])
  },

  computed: {
    notSupported () {
      return !this.knownLanguages.indexOf(this.language)
    }
  },

  render (createEl) {
    const children = []

    if (this.notSupported) {
      children.push(createEl('div', this.notSupportedMessage))
    }

    else if (this.contents.original) {
      this.contents.parsed = this.parseContent(this.contents.original)
      children.push(this.contents.parsed)
    }
    // else if (this.$slots.default) this.$slots.default.forEach(vnode => {
    //   if (vnode.text) {
    //     this.contents.original = vnode.text
    //     this.contents.parsed = this.parseContent(this.contents.original)
    //     children.push(this.contents.parsed)
    //   }
    // })

    // Wrapper.
    let wrapperAttributes = {
      class: [
        'precode',
        this.wrap ? 'precode--wrap' : '',
      ],
      attrs: {
        contenteditable: this.editable
      },
      domProps: {
        innerHTML: children.join()
      },
      on: {
        input: (e) => {
          let selection = this.getSelection()
          let textBeforeCarret = this.$refs.container.textContent.substr(0, selection.start)
          let textAfterCarret = this.$refs.container.textContent.substr(selection.end, this.$refs.container.textContent.length - 1)

          // this.contents.original = textBeforeCarret + '[[CARET]]'+ textAfterCarret
          // setTimeout(() => this.setCaret(selection.start + 9), 10)
          // this.contents.original = textBeforeCarret + textAfterCarret
          // setTimeout(() => this.setCaret(selection.start), 10)
        }
      },
      ref: 'container'
    }

    return createEl('div', wrapperAttributes, children)
  }
}
</script>

<style lang="scss">
$primary: #42b983;

.precode {
  border-radius: 4px;
  border: 1px solid #eee;
  outline: none;
  overflow: auto;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  background-color: #fafafa;
  padding: 5px;
  word-wrap: break-word;
  white-space: pre;
  transition: 0.3s;

  &:focus {
    border-color: $primary;
  }

  &--wrap {white-space: pre-wrap;}
}

.tag {
  // font-weight: bold;

  &.name {color: $primary;}
}

.ponctuation {
  color: $primary;
}

.attributes {
  color: orange;
}
</style>
