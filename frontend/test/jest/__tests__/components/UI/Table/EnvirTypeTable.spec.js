import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-jest";
import { beforeEach, describe, expect, it } from "@jest/globals";
import { mount } from "@vue/test-utils";
import component from "components/UI/Tables/EnvirTypeTable.vue";
import { createStore } from "vuex";

installQuasarPlugin();
describe("Component: EnvirTypeTable", () => {
	let wrapper, mockStore;
	beforeEach(() => {
		mockStore = createStore({});
		jest.spyOn(mockStore, "dispatch").mockImplementation();
		wrapper = mount(component, {
			global: {
				plugins: [[mockStore]],
			},
		});
	});
	it("Test: refs", () => {
		expect(wrapper.vm.opendDialog).toBeFalsy();
		expect(wrapper.vm.openAddEnviTypeDialog).toBeFalsy();
		expect(wrapper.vm.enviTypeObj).toBeNull();
		expect(wrapper.vm.rowsData).toBe();
		expect(wrapper.vm.editedIndex).toBeNull();
		expect(wrapper.vm.parentID).toBe("");
		expect(wrapper.vm.enviTypeName).toBe("");
		expect(wrapper.vm.enviTypeShortDescription).toBe("");
		expect(wrapper.vm.enviTypeDescription).toBe("");
		expect(wrapper.vm.imagesUID).toHaveLength(36);
		expect(wrapper.vm.logoUrl).toBe("");
	});
});
