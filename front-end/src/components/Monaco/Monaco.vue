<template>
  <div id="app">
    hello monaco
    <MonacoEditor
      width="800"
      height="500"
      theme="vs-dark"
      language="javascript"
      :options="options"
      @change="onChange"
    ></MonacoEditor>
  </div>
</template>

<script>
import MonacoEditor from "monaco-editor-vue";
export default {
  name: "App",
  components: {
    MonacoEditor,
  },
  data() {
    return {
      options: {
        //Monaco Editor Options
      },
    };
  },
  methods: {
    onChange(value) {
      console.log(value);
    },
  },
};
</script>
