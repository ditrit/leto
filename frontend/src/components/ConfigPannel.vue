<template>
	<div id="edition" class="q-pa-md">
		<q-form
			ref="configPannelForm"
			@submit="configToObject"
			@reset="objectToConfig"
			class="q-gutter-md">
			<div id="name"><q-input filled label="Name" v-model.text="configInfos.instance_name" type="text"></q-input></div>
			<q-input filled readonly label="Ressource type" v-model.text="configInfos.resource_type" ></q-input>
			<div class="col-auto" v-for="item in configInfos.attributes" :key="item.name">
				<div v-if="item.widget === 'inputString'">
					<q-input filled
						:label="item.name"
						:rules="getRules(item)"
						v-model.text="item.value"
						type="text"
						:disable="item.name === 'resourceType'"
						>
					</q-input>
				</div>
				<div v-if="item.widget === 'inputTextArea'">
					<q-input filled
						:label="item.name"
						:rules="getRules(item)"
						v-model.textareaModel="item.value"
						type="textarea"
						:disable="item.name === 'resourceType'"
						>
					</q-input>
				</div>
				<div v-if="item.widget === 'inputFloat'">
					<q-input filled
						:label="item.name"
						:rules="getRules(item)"
						:disable="item.name === 'resourceType'"
						>
					</q-input>
				</div>
				<div v-if="item.widget === 'inputInteger'">
					<q-input filled
						:label="item.name"
						:rules="getRules(item)"
						v-model.number="item.value"
						type="number"
						:disable="item.name === 'resourceType'"
						>
					</q-input>
				</div>
				<div v-if="item.widget === 'inputDropbox'">
					<q-select filled
						:label="item.name"
						:options="getOptions(item)"
						v-model.select="item.value"
						:disable="item.name === 'resourceType'"
						>
					</q-select>
				</div>
				<div v-if="item.widget === 'inputToggle'">
					<q-toggle filled
						:label="item.name"
						v-model="item.value"
						>
					</q-toggle>
				</div>
				<!-- <div v-if="item.widget === 'RadioButton'">
					<q-input filled
						:label="item.name"
						:rules="getRules(item)"
						>
					</q-input>
				</div>
				<div v-if="item.widget === 'inputCheckBox'">
					<q-input filled
						:label="item.name"
						:rules="getRules(item)"
						>
					</q-input>
				</div> -->
			</div>
			<div>
        		<q-btn label="Submit" type="submit" color="primary"/>
        		<q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
      		</div>
		</q-form>
	</div>
</template>




<script>
import { ref } from 'vue';
import EventBus from "src/services/EventBus"

function getFakeData() {
	return [
		{
			instance_name: "Fake object",
			resource_type: "aws_instance",
			attributes: [
				{
					name: "description",
					widget: "inputTextArea",
					required: "true"
				},
				{
					name: "aws_vpc",
					value: "vpc1",
					widget: "inputString",
					regex: "^[a-zA-Z][a-zA-Z0-9_-]*$",
					required: "true"
				},
				{
					name: "Running",
					widget: 'inputToggle',
					value: false
				},
				{
					name: "aws_region",
					value: "fr",
					widget: "inputDropbox",
					options: ["fr", "de", "en"]
				},
				{
					name: "aws_security_group_id",
					widget: "inputDropbox",
					resource_type: "aws_security_group",

				},
				{
					name: "aws_route53_zone_id",
					widget: "inputDropbox",
					resource_type: "aws_route53_zone",
				},
				{
					name: "nb_vcpu",
					value: "5",
					widget: "inputInteger",
					required: "true",
					min: "1",
					max: "16",
				},
			]
		},
		{
			instance_name: 'sg1',
			resource_type: "aws_security_group",
		},
		{
			instance_name: 'sg2',
			resource_type: "aws_security_group",
		},
		{
			instance_name: 'sg3',
			resource_type: "aws_security_group",
		},
		{
			instance_name: 'route53_zone_1',
			resource_type: "aws_route53_zone",
		},
		{
			instance_name: 'route53_zone_2',
			resource_type: "aws_route53_zone",
		},

	]
}


export default {
	name: 'ConfigPannel',
	setup() {
		const configInfos = ref({})
		let objects = []
		let selected_object = ref("Fake object")
		EventBus.on('setObjects', (rootTreeObject) => {
			objects = rootTreeObject;
		});
		EventBus.on('selectObject', (object) => {
			configInfos.value = {};
			selected_object.value = object.id;
			objectToConfig()
		});


		function getRules(attribute) {
			let rules = []
			if (attribute.manualRules) {
				attribute.manualRules.forEach(e => {
					rules.push(e)
				});
			}
			if (attribute.required) {
				rules.push((val) => !!val || 'Field is required')
			}
			if (attribute.min) {
				rules.push((val) => parseInt(val, 10) >= parseInt(attribute.min, 10) || 'Field > '+attribute.min)
			}
			if (attribute.max) {
				rules.push((val) => parseInt(val, 10) <= parseInt(attribute.max, 10) || 'Field < '+attribute.max)
			}
			if (attribute.regex) {
				rules.push((val) => val.match(new RegExp(attribute.regex)) || 'Incorrect field. Failed on regex '+attribute.regex)
			}
			return rules
		}

		function getOptions(attributes) {
			if (attributes.options.length != 0) {
				return attributes.options
			} else {
				return configInfos.value.objetcsType[attributes.resource_type]
			}
		}

		function getSelectedObject(treeObjects, id) {
			for (const index in treeObjects.contains) {
				const object = treeObjects.contains[index];
				if (object.id === id) {
					return object;
				}
				const result = getSelectedObject(object, id);
				if (result) return result;
			}
			return null;
		}


		// ##### CONFIG OBJECT SKELETON #####
		// object_name: {
		// 	 instance_name: string, // eg www-a
		// 	 resource_type: string, // eg aws_instance
		// 	 attributes: [
		// 		name: string,
		//      value: valueType // optionnal
		// 		widget: string, // [inputString, inputTextArea, inputFloat, inputInteger, inputToggle, inputDropbox, RadioButton, inputCheckBox]
		//
		// 		# Optional rules
		// 		regex: "^[a-zA-Z][a-zA-Z0-9_-]*$", // conseillé pour les strings
		// 		required: boolean,
		// 		min: number,
		// 		max: number,
		// 		manual_rules, // Manual rules using quasar format
		// 		options: [], // options list for dropbox
		// 		resource_type: string // for dropbox, wil get all objects with this resource_type to fill dropbox list
		// 	 ],
		//	 objectsType
		// }

		function objectToConfig () { // TODO Adapt to real data format
			let currentObject = getSelectedObject(objects, selected_object.value)
			configInfos.value.instance_name = currentObject.instance_name
			configInfos.value.resource_type = currentObject.type
			configInfos.value.attributes = [];
			if (currentObject.attributes) {
				configInfos.value.attributes = currentObject.attributes.map((attr) => ({
					name: attr.variableName,
					value: attr.value,
					widget: (attr.widget) ? attr.widget : "inputString",
					regex: (attr.regex) ? attr.regex : null,
					required: (attr.required) ? attr.required : false,
					min: (attr.min) ? attr.min : null,
					max: (attr.max) ? attr.max : null,
					manual_rules: (attr.manualRules) ? attr.manualRules : null,
					options: (attr.options) ? attr.options : [],
					resource_type: (attr.resource_type) ? attr.resource_type : null,
				}));
			}

			configInfos.value.objetcsType = []
			objects.contains
				.filter((object) => object.id != selected_object.value)
				.forEach((object) => {
					if (object.resource_type in configInfos.value.objetcsType) {
						configInfos.value.objetcsType[object.resource_type].push(object.instance_name)
					} else {
						configInfos.value.objetcsType[object.resource_type] = [object.instance_name]
					}
				});
		}

		function configToObject() { // TODO Adapt to real data format
			const objectId = selected_object.value;
			let realObject = getSelectedObject(objects, objectId);
			realObject.instance_name = configInfos.value.instance_name;

			EventBus.emit('updateObject', realObject, {
				instance_name: configInfos.value.instance_name,
				attributes: configInfos.value.attributes.map((attr) => ({ name: attr.name, value: attr.value })),
			});
		}

		return { selected_object, objects, getRules, objectToConfig, configToObject, configInfos, getOptions}
	}
}
</script>
