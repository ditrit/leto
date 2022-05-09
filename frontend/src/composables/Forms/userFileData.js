import { ref } from "vue";
import API from "../../services";
import { useStore } from "vuex";
import { v4 as uuidv4 } from "uuid";

export default function userFileData() {
	const store = useStore();
	const imagesUID = uuidv4();
	const logoUrl = ref("");
	const uploadFile = async (file) => {
		try {
			const formData = new FormData();
			formData.append("id", imagesUID);
			formData.append("file", file[0], file[0].name);
			await API.post(`/file/${imagesUID}`, formData);
		} catch (error) {
			console.error(error);
		}
		getFile();
	};
	const getFile = async () => {
		try {
			await store.dispatch("appFiles/downloadFile", imagesUID);
			const response = await store.getters["appFiles/getFiles"];
			logoUrl.value = await response[0].request.responseURL;
		} catch (error) {
			console.error(error);
		}
	};

	return { imagesUID, logoUrl, uploadFile };
}
