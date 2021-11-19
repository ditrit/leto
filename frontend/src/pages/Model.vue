<template>
	<q-layout container view="hHh lpR fFf" class="global bg-grey-3">
		<q-header class="bg-primary main_header">
			<q-toolbar>
				<q-btn flat @click="drawer = !drawer" round dense icon="menu" />
				<q-toolbar-title>
					<!--<q-avatar>
						<img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
					</q-avatar>
					Title-->
				</q-toolbar-title>
				<q-btn
					flat
					@click="rightDrawer = !rightDrawer"
					round
					dense
					icon="menu"
				/>
			</q-toolbar>
		</q-header>
		<q-drawer
			v-model="drawer"
			@hide="makeMenuVisible"
			side="left"
			show-if-above
			:width="250"
			:breakpoint="500"
			bordered
			class="bg-grey-3"
		>
			<q-list>
				<q-expansion-item expand-separator label="Components">
					<model-tree
						:items="componentItems"
						node-key="type"
						label-key="type"
						@item:selected="addComponent"
					></model-tree>
				</q-expansion-item>
				<q-expansion-item label="Services" expand-separator>
					<model-tree
						:items="serviceItems"
						node-key="type"
						label-key="type"
						@item:selected="addService"
					></model-tree>
				</q-expansion-item>
			</q-list>
		</q-drawer>
		<q-page-container>
			<q-page :style-fn="pageSizeTweak">
				<ModelEdit
					:items="items"
					:links="links"
					@item:select="selectItem"
					@item:link="onItemLink"
					@item:updateParent="updateItemParent"
				/>
			</q-page>
		</q-page-container>
		<q-drawer
			v-model="rightDrawer"
			@hide="makeMenuVisible"
			overlay
			side="right"
			:width="450"
			:breakpoint="500"
			bordered
			class="bg-grey-3"
		>
			<div>
				<!--<div class="q-gutter-md">
					<q-input
						v-model="search"
						debounce="500"
						label="Search"
						class="search_input q-mb-lg q-pa-md"
					>
						<template v-slot:append>
							<q-icon name="search" />
						</template>
					</q-input>
				</div>-->
				<q-card flat v-if="selectedItem" style="max-width: 450px">
					<q-card-section>
						<div class="row">
							<div class="col col-8">
								<q-input
									:color="selectedItem.color"
									v-model="selectedItem.name"
									label="Name"
								></q-input>
							</div>
							<div class="col col-4">
								<q-btn flat icon="close" @click="removeSelection"></q-btn>
							</div>
						</div>
					</q-card-section>
					<q-card-section>
						<div class="row">
							<div class="col">
								<q-select
									v-model="newLinkTarget"
									:options="items"
									option-label="name"
								></q-select>
								<q-btn @click="addLink">Relier</q-btn>
							</div>
						</div>
					</q-card-section>
					<q-card-section>
						<template :key="item.id" v-for="item in selectedItemChildren">
							<q-card @click="selectItem(item)">
								<q-card-section>
									{{ item.name }}
								</q-card-section>
							</q-card>
						</template>
					</q-card-section>
				</q-card>
				<template v-else>
					<q-tree
						:nodes="itemTree"
						node-key="id"
						label-key="name"
						default-expand-all
						v-model:selected="selectedItemKey"
					>
					</q-tree>
					<!--<template :key="item.id" v-for="item in baseItems">
						<q-card @click="selectItem(item)">
							<q-card-section>
								{{item.name}}
							</q-card-section>
						</q-card>
					</template>-->
				</template>
			</div>
			<!--	<q-list>
					<template v-for="item in filterdSidebarItem" :key="item.id">
						<q-item clickable @click="addItem(item)">
							<q-item-label>{{item.name}}</q-item-label>
						</q-item>
					</template>
					<q-separator />
				</q-list>-->
		</q-drawer>
	</q-layout>
</template>

<script>
import { ref, computed } from "vue";
import ModelEdit from "../components/3dModals/ModelEdit.vue";
import ModelTree from "components/3dModals/ModelTree";
import { pageSizeTweak } from "../common/index";

export default {
	components: { ModelTree, ModelEdit },
	setup() {
		/*const { path, dataItems, error, fetchData } = getDataItems();
		fetchData("http://localhost:3000/modelSideBar");*/
		//TODO: clarify data model and storage

		/*nodeTypes: {},
		nodeTemplates:{},
		relationships:{}*/
		/*const dataItems = {
			'root' : { 'name': 'root', 'derivedFrom' : '',   'color' : '#8288a1', 'logo' : 'textures/logos/file.jpg', 'capacities': {'nestedOn': [], 'linkedTo': []}, 'requirements': {'nestedOn': [], 'linkedTo': []} },
			'serveur' : { 'name': 'serveur', 'derivedFrom' : 'root',   'color' : '#8288a1', 'logo' : 'textures/logos/file.jpg', 'capacities': {'nestedOn': [], 'linkedTo': []}, 'requirements': {'nestedOn': [''], 'linkedTo': ['router']} },
			'serveurDeFichier' : { 'name': 'serveur de fichier', 'derivedFrom' : 'serveur',   'color' : '#8288a1', 'logo' : 'textures/logos/file.jpg', 'capacities': {'nestedOn': [], 'linkedTo': []}, 'requirements': {'nestedOn': [''], 'linkedTo': []} },
			'serveurImpression' : { 'name': 'serveur d\'impression', 'derivedFrom' : 'serveur',   'color' : '#8288a1', 'logo' : 'textures/logos/print.png', 'capacities': {'nestedOn': [], 'linkedTo': []}, 'requirements': {'nestedOn': [''], 'linkedTo': []} },
			'serveurApplication' : { 'name': 'serveur d\'application', 'derivedFrom' : 'serveur',   'color' : '#8288a1', 'logo' : 'textures/logos/menu.webp', 'capacities': {'nestedOn': [], 'linkedTo': []}, 'requirements': {'nestedOn': [''], 'linkedTo': []} },
			'serveurDNS' : { 'name': 'serveur DNS', 'derivedFrom' : 'serveur',   'color' : '#8288a1', 'logo' : 'textures/logos/dns.png', 'capacities': {'nestedOn': [], 'linkedTo': []}, 'requirements': {'nestedOn': [''], 'linkedTo': []} },
			'serveurMessagerie' : { 'name': 'serveur de messagerie', 'derivedFrom' : 'serveur',   'color' : '#8288a1', 'logo' : 'textures/logos/mail.png', 'capacities': {'nestedOn': [], 'linkedTo': []}, 'requirements': {'nestedOn': [''], 'linkedTo': []} },
			'serveurWeb' : { 'name': 'serveur web', 'derivedFrom' : 'serveur',   'color' : '#8288a1', 'logo' : 'textures/logos/web.jpg', 'capacities': {'nestedOn': [], 'linkedTo': ['database']}, 'requirements': {'nestedOn': [''], 'linkedTo': ['apache', 'php']} },
			'serveurBDD' : { 'name': 'serveur de bases de données', 'derivedFrom' : 'serveur',   'color' : '#8288a1', 'logo' : 'textures/logos/servBDD.png', 'capacities': {'nestedOn': [], 'linkedTo': []}, 'requirements': {'nestedOn': [''], 'linkedTo': []} },
			'serveurVirtuel' : { 'name': 'serveur virtuel', 'derivedFrom' : 'serveur',   'color' : '#404040', 'logo' : 'textures/logos/file.jpg', 'capacities': {'nestedOn': [], 'linkedTo': []}, 'requirements': {'nestedOn': ['serveur'], 'linkedTo': []} },
			'jetty' : { 'name': 'jetty', 'derivedFrom' : 'serveurVirtuel',   'color' : '#404040', 'logo' : 'textures/logos/file.jpg', 'capacities': {'nestedOn': [], 'linkedTo': []}, 'requirements': {'nestedOn': [], 'linkedTo': []} },
			'router': { 'name': 'router', 'derivedFrom' : 'root',   'color' : '#19bfba', 'logo' : 'textures/logos/wifi.png', 'capacities': {'nestedOn': [], 'linkedTo': ['serveur']}, 'requirements': {'nestedOn': [''], 'linkedTo': []} },
			'apache': { 'name': 'apache', 'derivedFrom' : 'root',   'color' : '#a82b18', 'logo' : 'textures/logos/apache.png', 'capacities': {'nestedOn': [], 'linkedTo': []}, 'requirements': {'nestedOn': ['serveur'], 'linkedTo': []} },
			'php': { 'name': 'php', 'derivedFrom' : 'root',   'color' : '#3065ba', 'logo' : 'textures/logos/php.png', 'capacities': {'nestedOn': [], 'linkedTo': []}, 'requirements': {'nestedOn': ['serveur'], 'linkedTo': []} },
			'database': { 'name': 'database', 'derivedFrom' : 'root',   'color' : '#db852a', 'logo' : 'textures/logos/db.png', 'capacities': {'nestedOn': [], 'linkedTo': []}, 'requirements': {'nestedOn': ['serveur'], 'linkedTo': []} },
			'nodejs': { 'name': 'nodejs', 'derivedFrom' : 'root',   'color' : '#2cab4c', 'logo' : 'textures/logos/nodejs.jpg', 'capacities': {'nestedOn': [], 'linkedTo': []}, 'requirements': {'nestedOn': ['serveur'], 'linkedTo': []} }
		}*/
		const dataItems = [
			{
				name: "serveur",
				type: "serveur",
				derivedFrom: "root",
				color: "#8288a1",
				nature: "abstract",
				logo: "textures/logos/file.jpg",
				capacities: { nestedOn: [], linkedTo: [] },
				requirements: { nestedOn: [""], linkedTo: ["router"] },
			},
			{
				type: "serveurDeFichier",
				name: "serveur de fichier",
				derivedFrom: "serveur",
				color: "#8288a1",
				nature: "abstract",
				logo: "textures/logos/file.jpg",
				capacities: { nestedOn: [], linkedTo: [] },
				requirements: { nestedOn: [""], linkedTo: [] },
			},
			{
				type: "serveurImpression",
				name: "serveur d'impression",
				derivedFrom: "serveur",
				color: "#8288a1",
				nature: "abstract",
				logo: "textures/logos/print.png",
				capacities: { nestedOn: [], linkedTo: [] },
				requirements: { nestedOn: [""], linkedTo: [] },
			},
			{
				type: "serveurApplication",
				name: "serveur d'application",
				derivedFrom: "serveur",
				color: "#8288a1",
				nature: "abstract",
				logo: "textures/logos/menu.webp",
				capacities: { nestedOn: [], linkedTo: [] },
				requirements: { nestedOn: [""], linkedTo: [] },
			},
			{
				type: "serveurDNS",
				name: "serveur DNS",
				derivedFrom: "serveur",
				color: "#8288a1",
				nature: "abstract",
				logo: "textures/logos/dns.png",
				capacities: { nestedOn: [], linkedTo: [] },
				requirements: { nestedOn: [""], linkedTo: [] },
			},
			{
				type: "serveurMessagerie",
				name: "serveur de messagerie",
				derivedFrom: "serveur",
				color: "#8288a1",
				nature: "abstract",
				logo: "textures/logos/mail.png",
				capacities: { nestedOn: [], linkedTo: [] },
				requirements: { nestedOn: [""], linkedTo: [] },
			},
			{
				type: "serveurWeb",
				name: "serveur web",
				derivedFrom: "serveur",
				color: "#8288a1",
				nature: "abstract",
				logo: "textures/logos/web.jpg",
				capacities: { nestedOn: [], linkedTo: ["database"] },
				requirements: { nestedOn: [""], linkedTo: ["apache", "php"] },
			},
			{
				type: "serveurBDD",
				name: "serveur de bases de données",
				derivedFrom: "serveur",
				color: "#8288a1",
				nature: "abstract",
				logo: "textures/logos/servBDD.png",
				capacities: { nestedOn: [], linkedTo: [] },
				requirements: { nestedOn: [""], linkedTo: [] },
			},
			{
				type: "serveurVirtuel",
				name: "serveur virtuel",
				derivedFrom: "serveur",
				color: "#404040",
				nature: "abstract",
				logo: "textures/logos/file.jpg",
				capacities: { nestedOn: [], linkedTo: [] },
				requirements: { nestedOn: ["serveur"], linkedTo: [] },
			},
			{
				type: "router",
				name: "router",
				derivedFrom: "root",
				color: "#19bfba",
				nature: "service",
				logo: "textures/logos/wifi.png",
				capacities: { nestedOn: [], linkedTo: ["serveur"] },
				requirements: { nestedOn: [""], linkedTo: [] },
			},
			{
				type: "jetty",
				name: "jetty",
				derivedFrom: "serveurVirtuel",
				color: "#404040",
				nature: "concrete",
				logo: "textures/logos/file.jpg",
				capacities: { nestedOn: [], linkedTo: [] },
				requirements: { nestedOn: [], linkedTo: [] },
			},
			{
				type: "apache",
				name: "apache",
				derivedFrom: "root",
				color: "#a82b18",
				nature: "service",
				logo: "textures/logos/apache.png",
				capacities: { nestedOn: [], linkedTo: [] },
				requirements: { nestedOn: ["serveur"], linkedTo: [] },
			},
			{
				type: "php",
				name: "php",
				derivedFrom: "root",
				color: "#3065ba",
				nature: "service",
				logo: "textures/logos/php.png",
				capacities: { nestedOn: [], linkedTo: [] },
				requirements: { nestedOn: ["serveur"], linkedTo: [] },
			},
			{
				type: "database",
				name: "database",
				derivedFrom: "root",
				color: "#db852a",
				nature: "abstract",
				logo: "textures/logos/db.png",
				capacities: { nestedOn: [], linkedTo: [] },
				requirements: { nestedOn: ["serveur"], linkedTo: [] },
			},
			{
				type: "nodejs",
				name: "nodejs",
				derivedFrom: "root",
				color: "#2cab4c",
				nature: "service",
				logo: "textures/logos/nodejs.jpg",
				capacities: { nestedOn: [], linkedTo: [] },
				requirements: { nestedOn: ["serveur"], linkedTo: [] },
			},
		];

		const search = ref("");
		const selectedItem = ref(null);
		const newLinkTarget = ref(null);
		const items = ref([]);
		const links = ref([]);
		const filterdSidebarItem = computed(() => {
			return Object.keys(dataItems)
				.map((i) => ({ ...dataItems[i], type: i }))
				.filter((item) =>
					item.name.toLowerCase().match(search.value.toLowerCase())
				);
			/*return dataItems.keys().filter((item) =>
				item.caption.toLowerCase().match(search.value.toLowerCase())
			);*/
		});

		const selectedItemChildren = computed(() => {
			if (!selectedItem.value) return null;
			return items.value.filter((i) => i.parentId === selectedItem.value.id);
		});
		const baseItems = computed(() => {
			return items.value.filter((i) => !i.parentId);
		});
		const serviceItems = computed(() =>
			dataItems.filter((i) => i.nature === "service")
		);
		const componentItems = computed(() =>
			dataItems.filter((i) => i.nature !== "service")
		);
		const itemTree = computed(() => {
			const localItems = JSON.parse(JSON.stringify(items.value));
			const tree = [];
			for (let item of localItems) {
				item.icon = `img: ${item.logo}`;
				if (!item.children) item.children = [];
				if (item.parentId) {
					const parent = localItems.find((i) => i.id === item.parentId);
					if (!parent.children) parent.children = [];
					parent.children.push(item);
				} else {
					tree.push(item);
				}
			}
			return tree;
		});
		const typeTree = computed(() => {
			const localItems = JSON.parse(JSON.stringify(dataItems));
			const tree = [];
			for (let item of localItems) {
				item.icon = `img: ${item.logo}`;
				if (!item.children) item.children = [];
				if (item.derivedFrom && item.derivedFrom !== "root") {
					const parent = localItems.find((i) => i.type === item.derivedFrom);
					if (!parent.children) parent.children = [];
					parent.children.push(item);
				} else {
					tree.push(item);
				}
			}
			return tree;
		});

		return {
			drawer: ref(true),
			rightDrawer: ref(false),
			dataItems,
			search,
			items,
			serviceItems,
			componentItems,
			links,
			itemTree,
			newLinkTarget,
			typeTree,
			selectedItem,
			selectedItemKey: ref(null),
			newItemType: ref(null),
			selectedItemChildren,
			baseItems,
			//error,
			//path,
			filterdSidebarItem,
			pageSizeTweak,
		};
	},
	watch: {
		selectedItemKey(newVal) {
			const item = this.items.find((i) => i.id === newVal);
			if (item) this.selectItem(item);
		},
		/*newItemType(newVal) {
			const item = this.dataItems.find((i) => i.type === newVal);
			if (item) {
				this.addItem(item);
			}
		},*/
	},
	methods: {
		addComponent(key) {
			const item = this.dataItems.find((i) => i.type === key);
			if (item) {
				this.addItem(item);
			}
		},
		addService(key) {
			const item = this.dataItems.find((i) => i.type === key);
			if (item) {
				this.addItem(item);
			}
		},
		createKey() {
			return (
				Math.random().toString(36).substring(2, 15) +
				Math.random().toString(36).substring(2, 15)
			);
		},
		selectItem(item) {
			if (this.selectedItem) {
				this.selectedItem.isSelected = false;
				this.selectedItemKey = null;
			}
			const itemIndex = this.items.findIndex((i) => i.id === item.id);
			this.items[itemIndex].isSelected = true;
			this.selectedItem = this.items[itemIndex];
		},
		updateItemParent(event) {
			console.log("this.items", this.items);
			const itemIndex = this.items.findIndex((i) => i.id === event.itemId);
			this.items[itemIndex].parentWasUpdated =
				event.parentId !== this.items[itemIndex].parentId;
			this.items[itemIndex].parentId = event.parentId;
			this.items[itemIndex].manuallyMoved = true;
		},
		removeSelection() {
			if (this.selectedItem) this.selectedItem.isSelected = false;
			this.selectedItem = null;
			this.selectedItemKey = null;
		},
		onItemLink(newTarget) {
			if (this.selectedItem) {
				this.newLinkTarget = newTarget;
				this.addLink();
			}
		},
		addLink() {
			console.log("newLinkTarget", this.newLinkTarget);
			this.links.push({
				id: this.createKey(),
				from: this.selectedItem.id,
				to: this.newLinkTarget.id,
			});
		},
		addItem(item) {
			this.newItemType = null;
			const newItem = JSON.parse(JSON.stringify(item));
			newItem.id = this.createKey();
			if (this.selectedItem) {
				newItem.parentId = this.selectedItem.id;
			} else {
				newItem.parentId = null;
			}
			console.log("adding item", newItem);

			this.items.push(newItem);
		},
	},
};
</script>

<style lang="sass" scoped>

.page_margin
	margin-top: 70px
	margin-left: 100px

.global
	height: 100vh
	overflow: hidden
.menuStyle
	background: #eeeeee
	border-radius: 0
.hiddenMenu
	transform: translateX(238px)
.visibleMenu
	transform: translateX(-14px)
</style>
