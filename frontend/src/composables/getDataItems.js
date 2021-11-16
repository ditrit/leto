import { ref } from "vue";
import axios from "axios";

const getDataItem = (path) => {
	const dataItems = ref([]);
	const error = ref(null);

	const fetchData = async (path) => {
		try {
			let response = await axios.get(path);
			let data = response.data;
			dataItems.value = data;
		} catch (err) {
			error.value = err.message;
			console.log(error.value);
		}
	};
	return { path, dataItems, error, fetchData };
};

export default getDataItem;
