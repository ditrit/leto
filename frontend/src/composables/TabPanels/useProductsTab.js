import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

export default function useEnvironmentsTabsData(props) {
	const store = useStore();
	const route = useRouter();
	const $q = useQuasar();
	const productTeam = ref(props.teamProducts);
	const productName = ref("");
	const productShortDescription = ref("");
	const productDescription = ref("");

	const refreshData = async () => {
		await store.dispatch(
			"appDomain/fetchDomainById",
			route.currentRoute.value.params.id
		);
		let data = computed(() => {
			return store.getters["appDomain/allDomaines"];
		});
		console.log('"data from refreshData: ": ', data.value);
		console.log("data.value[0].Products: ", data.value[0].Products);
		console.log(
			"	route.currentRoute.value.params.id: ",
			route.currentRoute.value.params.id
		);
		productTeam.value = data.value[0].Products;
	};

	const deleteProduct = async (product) => {
		await store.dispatch("appEnvironment/removeEnvironment", product.id);
		refreshData();
	};

	const confirmDeleteProduct = (props) => {
		$q.dialog({
			title: "Confirm",
			message: "Are you sure to delete this item?",
			cancel: true,
			persistent: true,
		})
			.onOk(() => {
				deleteProduct(props);
			})
			.onCancel(() => {
				console.log("Cancel");
			});
	};

	const addNewProduct = async () => {
		let newProduct = {
			domainID: route.currentRoute.value.params.id,
			name: productName.value,
			shortDescription: productShortDescription.value,
			description: productDescription.value,
		};
		console.log("newProduct: ", newProduct);
		try {
			await store
				.dispatch("appEnvironment/addEnvironment", newProduct)
				.then(() => {
					refreshData();
				})
				.then(() => {
					$q.notify({
						type: "positive",
						message: `${productName.value} environment was succefuly created`,
					});
				});

			console.log("productTeam from useTabs:", productTeam.value);
		} catch (error) {
			$q.notify({
				type: "negative",
				message: `${productName.value} environment was not created`,
			});
		}

		productName.value = "";
		productShortDescription.value = "";
		productDescription.value = "";
	};

	const updateProduct = async (product) => {
		await store
			.dispatch("appEnvironment/updateEnvironment", product)
			.then(() => {
				refreshData();
			})
			.then(() => {
				$q.notify({
					type: "positive",
					message: `${productName.value} environment was succefuly updated`,
				});
			});
		console.log("Update product from useTabs: ", product);
	};

	return {
		store,
		route,
		$q,
		productTeam,
		productName,
		productShortDescription,
		productDescription,
		deleteProduct,
		confirmDeleteProduct,
		addNewProduct,
		updateProduct,
	};
}
