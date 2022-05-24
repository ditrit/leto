<template>
	<div>
		<div class="monaco" ref="monacoContainer"></div>
		<button :onClick="consoleClick" class="Button">
			<slot>Button</slot>
		</button>
		<div>
			<pre>{{ metadatas }}</pre>
		</div>
	</div>
</template>

<script>
import * as monaco from "monaco-editor";
import { hclTokensProvider } from "./hclTokensProvider.js";
import Button from "../UI/Buttons/BtnAddNew.vue";
import { calculAttributesObjects } from "./svg_maths.js";
import meta from "../../../public/metadatas.json";
import { mapActions, mapGetters } from "vuex";

export default {
	data() {
		return {
			monacoEditor: {},
			iactorDatas: {},
			button: Button,
			metadatas: {},
		};
	},
	created() {
		this.worker = new Worker("dist/bundle.js");
		this.worker.onmessage = function (event) {
			this.iactorDatas = event.data;
			this.iactorDatas = calculAttributesObjects(this.iactorDatas);
			console.log("data : ", event.data);
		};
		this.worker.addEventListener("message", (event) => {
			window.localStorage.setItem("monacoSource", JSON.stringify(event.data));
		});
	},
	mounted() {
		// Initialize the editor, make sure the dom has been rendered, and the dialog should be written in opened
		monaco.languages.register({ id: "hcl" });
		monaco.languages.setTokensProvider("hcl", hclTokensProvider.prototype);
		let string = "BF2937";
		let identifier = "131DB4";
		let symbolsFg = "000000";
		let object = "4FA786";
		let errorFg = "ff0000";
		let comment = "07812C";
		let boolean = "105FEE";
		this.valueEditor = "";

		monaco.editor.defineTheme("terraformTheme", {
			base: "vs",
			inherit: false,
			rules: [
				{ token: "output.hcl", foreground: object },
				{ token: "variable.hcl", foreground: object },
				{ token: "module.hcl", foreground: object },
				{ token: "terraform.hcl", foreground: object },
				{ token: "provider.hcl", foreground: object },
				{ token: "resource.hcl", foreground: object },
				{ token: "string.hcl", foreground: string },
				{ token: "type.hcl", foreground: symbolsFg },
				{ token: "boolean.hcl", foreground: boolean, fontStyle: "bold" },
				{ token: "booleanop.hcl", foreground: symbolsFg },
				{ token: "index.hcl", foreground: symbolsFg },
				{ token: "identifier.hcl", foreground: identifier },
				{ token: "number.hcl", foreground: symbolsFg },
				{ token: "comment.hcl", foreground: comment, fontStyle: "bold" },
				{ token: "line_comment.hcl", foreground: comment, fontStyle: "bold" },
				{ token: "has_comment.hcl", foreground: comment, fontStyle: "bold" },
				{ token: "error.hcl", foreground: errorFg },
			],
			colors: {
				"editor.foreground": "#000000",
			},
		});
		let editor = monaco.editor.create(this.$refs.monacoContainer, {
			language: "hcl",
			theme: "terraformTheme",
		});
		this.monacoEditor = editor;
		this.monacoEditor.getModel().onDidChangeContent((event) => {
			this.onChange(editor.getValue());
		});
	},
	computed: {
		...mapGetters({ allMetadatas: "appMonaco/allMetadatas" }),
	},
	methods: {
		...mapActions({
			getMonacoSource: "appMonaco/getMonacoSource",
			getMetaSource: "appMonaco/getMetadatas",
		}),
		consoleClick() {
			this.worker.postMessage(this.valueEditor);
			this.getSource();
			this.getMetaDatas();
			this.metadatas = this.allMetadatas;
		},
		getSource() {
			return this.getMonacoSource();
		},
		async getMetaDatas() {
			await this.getMetaSource(meta);
		},

		onChange(value) {
			this.valueEditor = value;
		},
	},
};
</script>
<style lang="sass" scoped>
.monaco
  width: 1200px
  height: 1000px !important
  overflow-y: hidden

.monaco-editor
  width: 100%
  height: 100% !important
  overflow-y: hidden
</style>
