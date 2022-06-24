<template>
	<div>
		<div class="monaco" ref="monacoContainer"></div>
		<button :onClick="consoleClick" class="Button">
			<slot>Compiler</slot>
		</button>
	</div>
</template>
<script>
import * as monaco from 'monaco-editor';
import { hclTokensProvider } from './hclTokensProvider.js';
import Button from '../UI/Buttons/BtnAddNew.vue';
import { calculAttributesObjects } from './svg_maths.js';
import { mapActions, mapGetters } from 'vuex';
import { analyse_resources } from 'hcl/src/parser/compiler/schema_parser.js';
import plugins from '../../assets/plugins/terraform/plugins';
import {toString, toStringResource} from './toStringFunctions';

export default {
	data() {
		return {
			iactorDatas: {},
			button: Button,
			metadatas: {}
		};
	},
	created() {
		this.worker = new Worker(new URL('./iactor.js', import.meta.url));
		this.worker.onmessage = function (event) {
			this.iactorDatas = event.data;
			const provider = {
				provider: this.iactorDatas.provider,
			}
			window.localStorage.setItem("monacoSource", JSON.stringify(provider));
		};
		this.worker.addEventListener("message", (event) => {
			this.getSource();
			this.getMetaDatas();
			this.metadatas = this.allMetadatas;
			const data = event.data;
			data.provider[0].orderResources = (this.metadatas.provider.orderResources) ? this.metadatas.provider.orderResources : [];
			analyse_resources(data.resources, this.metadatas.provider.resources);
			data.resources = calculAttributesObjects(data);	
			window.localStorage.setItem("monacoSource", JSON.stringify(data));
			this.getSource();		
		});
	},
	mounted() {
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
		...mapGetters({ allMetadatas: "appMonaco/allMetadatas",
						allMonacoSource : "appMonaco/allMonacoSource" }),
	},
	methods: {
		...mapActions({
			setResources: "appMonaco/setResources",
			getMonacoSource: "appMonaco/getMonacoSource",
			getMetaSource: "appMonaco/getMetadatas",
		}),
		consoleClick() {
			this.worker.postMessage(this.valueEditor);
			this.getSource();
		},
		getSource() {
			return this.getMonacoSource();
		},
		getGraph() {
			const datas = JSON.parse(window.localStorage.getItem("monacoSource"));
			const str = this.graphToString(datas);
			const models = monaco.editor.getModels();
			const editor = models[models.length - 1];
			editor.setValue(str);
			this.valueEditor = str;
		},
		graphToString(datas) {			
			let str = '';
			str += this.resourceToString(datas['resources']);
			datas['provider'].forEach( provider => {
				str += toString(provider, 'provider') + '\n';
			})
			datas['variables'].forEach( variable => {
				str += toString(variable, 'variable') + '\n';
			})
			datas['datas'].forEach( data => {
				str += toString(data, 'data') + '\n';
			})
			datas['outputs'].forEach( output => {
				str += toString(output, 'output') + '\n';
			})
			return str;
		},
		resourceToString(resources, containers) {		
			let str = '';	
				
			resources.forEach( resource => {
				str += toStringResource(resource, 'resource', containers) + '\n';
				if(resource.contains.length > 0) {
					if(!containers) {
						let container = [resource];
						str += this.resourceToString(resource.contains, container);
					} else {
						containers.push(resource);
						str += this.resourceToString(resource.contains, containers);
					}
				}
			})

			return str;
		},
		async getMetaDatas() {
			const provider = JSON.parse(window.localStorage.getItem("monacoSource")).provider[0].name;
			const plugin = plugins[provider]
			const meta = require(`../../assets/plugins/terraform/${plugin}/metadatas.json`)
			await this.getMetaSource(meta);
		},
		onChange(value) {
			this.valueEditor = value;
		}
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
