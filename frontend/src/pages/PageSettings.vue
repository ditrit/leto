<template>
	<q-layout class="page_padding">
		<AjaxBar />
		<q-page class="flex flex-center bg-gray">
			<h2>Settings Page</h2>
		</q-page>
	</q-layout>
</template>

<script>
import { defineComponent } from "vue";
import AjaxBar from "../components/UI/Progress/AjaxBar";

export default defineComponent({
	name: "PageSettings",
	components: { AjaxBar },
});
</script>
