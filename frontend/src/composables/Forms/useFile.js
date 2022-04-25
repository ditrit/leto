import { ref } from "vue";
import API from "../../services";
import { useStore } from "vuex";
import { v4 as uuidv4 } from "uuid";

export default function userFileData() {
	const store = useStore();
	const imagesUID = uuidv4();
	const logoUrl = ref("");
	const uploadFile = async (file) => {
		const formData = new FormData();
		formData.append("id", imagesUID);
		formData.append("file", file[0], file[0].name);
		await API.post(`/file/${imagesUID}`, formData).then((res) => {
			console.log("res.data", res.data);
			console.log("res", res);
			console.log("url", res.config.url);
			console.log("responseURL", res.request.responseURL);
		});
		getFile();
	};
	const getFile = async () => {
		await store.dispatch("appFiles/downloadFile", imagesUID);
		const response = store.getters["appFiles/getFiles"];
		logoUrl.value = response[0].request.responseURL;
	};

	return { imagesUID, logoUrl, uploadFile };
}
