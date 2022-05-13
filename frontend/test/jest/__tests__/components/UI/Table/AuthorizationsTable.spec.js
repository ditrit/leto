import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-jest";
import { beforeEach, describe, expect, it } from "@jest/globals";
import { mount } from "@vue/test-utils";
import component from "components/UI/Tables/AuthorizationsTable";
import { createStore } from "vuex";
import { useRouter } from "vue-router";

installQuasarPlugin();
describe("Component: AuthorizationsTable", () => {
	let wrapper, mockStore, router;

	beforeEach(() => {
		mockStore = createStore({});
		router = useRouter();
		jest.spyOn(mockStore, "dispatch").mockImplementation();

		wrapper = mount(component, {
			global: {
				plugins: [[mockStore, router]],
			},
		});
	});

	it("Test: refs", () => {
		expect(wrapper.vm.domainList).toBeNull();
		expect(wrapper.vm.authorizationObj).toBeNull();
		expect(wrapper.vm.rowsData).toEqual([]);
		expect(wrapper.vm.authorisationUser).toBe("");
		expect(wrapper.vm.authorizsationDomain).toBeNull();
		expect(wrapper.vm.authorizationRole).toBe("");
	});
});
