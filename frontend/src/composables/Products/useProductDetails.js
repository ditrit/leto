import { ref, computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

export default function useProductDetails() {
	const store = useStore();
	const route = useRouter();
	const $q = useQuasar();
	const currentProductContent = ref([
		{
			name: "Product One",
			shortDescription: "Product One short description",
			description:
				"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
			logo: "http://127.0.0.1:9203/ditrit/Gandalf/1.0.0/file/9c19cc0d-bbb7-47c6-bfeb-83059f397ea8?Authorization=Bearer+eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySUQiOiI5MGQ0ODFhMy05NDlkLTRkODQtYThlMC0yNjg4NzZkNzRlNGEiLCJOYW1lIjoiIiwiRW1haWwiOiJicmFoaW1AZ21haWwuY29tIiwiVGVuYW50IjoiIiwiZXhwIjoxNjQ4ODAyMDU1fQ.v4aCTTJlDRuxaaQozubfLJjTkF_z2cw0y1VfVNit5eo",
			gitURL: "https://github.com/ditrit",
		},
	]);
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
