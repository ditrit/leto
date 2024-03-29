import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

export default function useProductsTabData(props) {
	const store = useStore();
	const route = useRouter();
	const $q = useQuasar();
	const productTeam = ref(props.teamProducts);
	const productName = ref("");
	const productLogo = ref("");
	const productShortDescription = ref("");
	const productDescription = ref("");
	const productRepositoryURL = ref("");

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

	const deleteProduct = async (id) => {
		await store
			.dispatch("appProducts/removeProduct", `${id}`)
			.then(() => refreshData());
	};

	const confirmDeleteProduct = (id) => {
		$q.dialog({
			title: "Confirm",
			message: "Are you sure to delete this item?",
			cancel: true,
			persistent: true,
		})
			.onOk(() => {
				deleteProduct(id);
			})
			.onCancel(() => {
				console.log("Cancel");
			});
	};

	const addNewProduct = async () => {
		let newProduct = {
			domainID: route.currentRoute.value.params.id,
			name: productName.value,
			logo: avatarUrl.value,
			shortDescription: productShortDescription.value,
			description: productDescription.value,
		};
		console.log("newProduct: ", newProduct);
		try {
			await store
				.dispatch("appProducts/addProduct", newProduct)
				.then(() => {
					refreshData();
				})
				.then(() => {
					$q.notify({
						type: "positive",
						message: `${productName.value} product was succefuly created`,
					});
				});

			console.log("productTeam from useTabs:", productTeam.value);
		} catch (error) {
			$q.notify({
				type: "negative",
				message: `${productName.value} product was not created`,
			});
		}

		productName.value = "";
		productLogo.value = "";
		productShortDescription.value = "";
		productDescription.value = "";
	};

	const updateProduct = async (id) => {
		let product = {
			id: id,
			name: productName.value,
			logo: productLogo.value,
			shortDescription: productShortDescription.value,
			description: productDescription.value,
			repositoryURL: productRepositoryURL.value,
			domainID: route.currentRoute.value.params.id,
		};

		await store
			.dispatch("appProducts/updateProduct", product)
			.then(() => {
				refreshData();
			})
			.then(() => {
				$q.notify({
					type: "positive",
					message: `${productName.value} product was succefuly updated`,
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
		productLogo,
		productShortDescription,
		productDescription,
		productRepositoryURL,
		deleteProduct,
		confirmDeleteProduct,
		addNewProduct,
		updateProduct,
	};
}
