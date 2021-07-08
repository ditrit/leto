<template>
  <div
    ref="monacoContainer"
    style="height: 1050px; width: 100%; verflow-y: hidden"
  ></div>
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
      value: "Content",
      readOnly: true,
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
