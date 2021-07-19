<template>
  <div class="monaco" ref="monacoContainer"></div>
</template>

<script>
import * as monaco from "monaco-editor";
export default {
  data() {
    return {
      monacoEditor: {},
    };
  },

  mounted() {
    // Initialize the editor, make sure the dom has been rendered, and the dialog should be written in opened
    this.monacoEditor = monaco.editor.create(this.$refs.monacoContainer, {
      value: "json:- rigid - better for data interchange",
      readOnly: false,
      language: "yaml",
      theme: "vs-dark",
    });
  },
  methods: {
    changeEditor() {
      // change editor content
      this.monacoEditor.setValue(result.data);
      this.monacoEditor.getAction("editor.action.formatDocument")._run();
    },
    destroyEditor() {
      // Destroy the editor
      this.monacoEditor.dispose();
    },
  },
};
</script>
<style lang="sass" scoped>
.monaco
  width: 100%
  height: 100%
  verflow-y: hidden
</style>
