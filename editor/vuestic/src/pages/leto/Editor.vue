<template>
    <!--<MonacoEditor ref="editor" class="editor" :options="options" :value="code" @editorDidMount="editorDidMount" />-->
    <div id="editor" class="editor"></div>
</template>

<script>
import * as monaco from 'monaco-editor'

export default {
  data() {
    return {
      options: {
        value: "test",
        language: 'javascript',
        theme: 'vs-dark'
        //Monaco Editor Options
      }
    }
  },
  name: "Editor",
  components: {
  },
  watch: {
    code(newVal) {
      console.log('newVal', newVal)
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
      editor.setValue('test2')
    },
    editorDidMount(editor) {
      // Listen to `scroll` event
      console.log('editor', editor)
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
