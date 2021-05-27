<template>
    <!--<MonacoEditor ref="editor" class="editor" :options="options" :value="code" @editorDidMount="editorDidMount" />-->
    <div id="editor" class="editor"></div>
</template>

<script>
import * as monaco from 'monaco-editor'

export default {
  data() {
    return {
      editor: null,
      options: {
        value: "test",
        language: 'javascript',
        theme: this.$vuetify.theme.dark? 'vs-dark' : 'vs-light',
        //Monaco Editor Options
      }
    }
  },
  name: "Editor",
  components: {
  },
  computed: {
    darkMode() {
      return this.$vuetify.theme.dark
    }
  },
  watch: {
    code(newVal) {
      console.log('newVal', newVal)
    },
    darkMode(newVal) {
      const theme = newVal? 'vs-dark' : 'vs-light'
      monaco.editor.setTheme(theme)
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    save() {
      //TODO
    },
    init() {
      const editor = monaco.editor.create(document.getElementById('editor'), this.options)

      editor.onDidChangeModelContent(e => {
        console.log(e)
        console.log(editor.getValue())
        this.code = editor.getValue()
      })

      editor.onDidScrollChange(e => {
        console.log(e)
      })
    },
    editorDidMount(editor) {
      // Listen to `scroll` event
      editor.onDidChangeModelContent(e => {
        console.log(e)
        console.log(editor.getValue())
        this.code = editor.getValue()
      })

      editor.onDidScrollChange(e => {
        console.log(e)
      })
    },
    onChange(value) {
      console.log(value);
    }
  },
}
</script>

<style scoped>
.editor {
  width: 80vw;
  height: 70vh;
}
</style>
