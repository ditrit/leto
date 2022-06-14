import { installQuasarPlugin } from "@quasar/quasar-app-extension-testing-unit-jest";
import { beforeEach, describe, expect, it } from "@jest/globals";
import { mount } from "@vue/test-utils";
import component from "components/UI/Tables/AuthorizationsTable";
import { createStore } from "vuex";

import {
	VueRouterMock,
	createRouterMock,
	injectRouterMock,
} from "vue-router-mock";

installQuasarPlugin();

describe("Component: AuthorizationsTable", () => {
	let wrapper, store;
	store = createStore({});
	beforeEach(() => {
		const router = createRouterMock();
		injectRouterMock(router);
		jest.spyOn(store, "dispatch").mockImplementation();
		wrapper = mount(component, {
			global: {
				plugins: [VueRouterMock, store],
			},
		});
		afterEach(() => {
			wrapper.destroy();
		});
	});

	it("Test: refs", () => {
		expect(wrapper.vm.authorizationObj).toBeNull();
		expect(wrapper.vm.rowsData).toBe();
		expect(wrapper.vm.authorizsationDomain).toBe();
		expect(wrapper.vm.authorisationUser).toBe("");
		expect(wrapper.vm.authorizationRole).toBe("");
		expect(wrapper.vm.domainList).toBe();
	});
});
