<template>
	<div class="col">
		<q-uploader
			style="max-width: 100%"
			label="Your Logo"
			multiple
			accept=".jpg, svg, image/*"
			@rejected="onRejected"
			color="primary"
			:factory="uploadFile"
		/>
	</div>
</template>

<script>
import { useStore } from "vuex";

export default {
	name: "FileUploader",
	emits: ["uploadAction"],
	setup(props, { emit }) {
		// const store = useStore();
		// const imagesUID = uuidv4();

		const uploadFile = async (file) => {
			emit("uploadAction", file);
			// const formData = new FormData();
			// formData.append("id", imagesUID);
			// formData.append("file", file[0], file[0].name);
			// // await store.dispatch("appFiles/uploadFile", imagesUID, formData);
			// await API.post(`/file/${imagesUID}`, formData)
			// 	// await store
			// 	// 	.dispatch("appFiles/uploadFile", imagesUID, formData)
			// 	.then((res) => {
			// 		console.log("res.data", res.data);
			// 		console.log("res", res);
			// 		console.log("url", res.config.url);
			// 		console.log("responseURL", res.request.responseURL);
			// 	});
			// getFile();
		};

		// const getFile = async () => {
		// 	await store.dispatch("appFiles/downloadFile", imagesUID);
		// 	const response = store.getters["appFiles/getFiles"];
		// 	console.log("response from FileUploader: ", response);
		// 	return response[0].request.responseURL;
		// };

		function onRejected(rejectedEntries) {
			$q.notify({
				type: "negative",
				message: `${rejectedEntries.length} file(s) did not pass validation constraints`,
			});
		}
		return {
			onRejected,
			uploadFile,
			// getFile,
			onFileUpload(event) {},
		};
	},
};
</script>

<style></style>
