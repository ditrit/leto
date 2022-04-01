<template>
	<div class="col">
		<q-uploader
			style="max-width: 100%"
			class="full-height"
			label="Your Logo"
			accept=".jpg, svg, image/*"
			@rejected="onRejected"
			color="primary"
			:factory="uploadFile"
		/>
	</div>
</template>
<script>
export default {
	name: "FileUploader",
	emits: ["uploadAction"],
	setup(props, { emit }) {
		const uploadFile = async (file) => {
			emit("uploadAction", file);
		};

		function onRejected(rejectedEntries) {
			$q.notify({
				type: "negative",
				message: `${rejectedEntries.length} file(s) did not pass validation constraints`,
			});
		}
		return {
			onRejected,
			uploadFile,
		};
	},
};
</script>

<style></style>
