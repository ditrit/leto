import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-jest";
import { beforeEach, describe, expect, it } from "@jest/globals";
import { shallowMount } from "@vue/test-utils";
import component from "components/UI/Tables/EnvirTypeTable.vue";
import { createStore } from "vuex";

installQuasarPlugin();
describe("Component: EnvirTypeTable", () => {
	let wrapper, mockStore;
	beforeEach(() => {
		mockStore = createStore({});
		jest.spyOn(mockStore, "dispatch").mockImplementation();
		wrapper = shallowMount(component, {
			global: {
				plugins: [[mockStore]],
			},
		});
	});
	it("Test: refs", () => {
		expect(wrapper.vm.opendDialog).toBeFalsy();
	});
	describe("Test: methods", () => {
		it("Test method: allEnviTypes", () => {
			console.log("wrapper: ", wrapper.vm.rowsData.value);
			expect(wrapper.vm.rowsData.value).toEqual([]);
		});
	});
});
