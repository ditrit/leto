import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-jest";
import { beforeEach, describe, expect, it } from "@jest/globals";
import { mount } from "@vue/test-utils";
import component from "components/UI/Tables/RolesTable.vue";
import { createStore } from "vuex";

installQuasarPlugin();
describe("Component: RolesTable", () => {
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
		expect(wrapper.vm.openAddRoleDialog).toBeFalsy();
		expect(wrapper.vm.roleObj).toBeNull();
		expect(wrapper.vm.rowsData).toBe();
		expect(wrapper.vm.editedIndex).toBeNull();
		expect(wrapper.vm.roleName).toBe("");
		expect(wrapper.vm.roleShortDescription).toBe("");
		expect(wrapper.vm.roleDescription).toBe("");
		expect(wrapper.vm.imagesUID).toHaveLength(36);
		expect(wrapper.vm.logoUrl).toBe("");
	});
});
