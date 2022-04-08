import { ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

export default function useProductDetails() {
	const store = useStore();
	const route = useRouter();
	const $q = useQuasar();
	const currentProductContent = ref(null);
	const menu = ref([
		{
			label: "ENV ONE",
			avatar: "https://cdn.quasar.dev/img/boy-avatar.png",
			children: [
				{
					label: "Model 1",
					icon: "sell",
				},
				{
					label: "ENV TWO",
					icon: "sell",
					children: [{ label: "Model 2" }, { label: "Model 3" }],
				},
				{
					label: "ENV THREE",
					icon: "sell",
					children: [
						{
							label: "Model 1",
						},
						{ label: "Model 2" },
						{ label: "Model 3" },
					],
				},
			],
		},
	]);
	return { store, route, $q, currentProductContent, menu };
}
