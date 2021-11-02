<template>
	<q-layout class="page_padding">
		<AjaxBar />
		<q-page class="bg-gray">
			<PageContent
				v-for="item in dataItems"
				:key="item.id"
				:icon="item.icon"
				:headline="$t('teams')"
				:textContent="item.textContent"
			/>
			<div class="buttons_wrapper">
				<div class="teams_buttons__container">
					<Modal :oepnDialog="oepnDialog">
						<template v-slot:ModalHeadline> Create new Team </template>
						<template v-slot:ModalBody>
							<CreationFormStepper />
						</template>
					</Modal>
				</div>
			</div>
		</q-page>
	</q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import Modal from "../components/UI/Dialogs/Modal.vue";
import getDataItems from "../composables/getDataItems";

import PageContent from "../components/Content/PageContent";
import CreationFormStepper from "../components/UI/Stepper/CreationFormStepper";
import AjaxBar from "../components/UI/Progress/AjaxBar";

export default defineComponent({
	name: "PageTeams",
	components: { PageContent, Modal, CreationFormStepper, AjaxBar },

	setup() {
		const oepnDialog = ref(false);
		const { path, dataItems, error, fetchData } = getDataItems();
		const data = fetchData("http://localhost:3000/teams");
		dataItems.value = data;

		return {
			progress: dataItems.length,
			path,
			dataItems,
			error,
			oepnDialog,
		};
	},
});
</script>
