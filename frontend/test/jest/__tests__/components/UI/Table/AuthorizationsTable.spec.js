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

	it('should not remove unmodified fields on edit' , () => {
		wrapper.vm.authorizationObj = ["731bcff7-4cf5-4100-b9ea-7648d2f186cb",
		"",
		"d353f7bb-bc6f-4fd7-93bc-aeb56ab688f1",
		"root",
		"eac752c1-458e-4945-b5ba-f2a104be0230",
		"Administrator",
		"922f552b-9291-424d-9e27-d79a55d3eef7",
		"test test"]
		wrapper.vm.allAuthorizations = jest.fn(() => {});
		store.dispatch = jest.fn(() => {});
		wrapper.vm.onSubmitUpdate()
		expect(store.dispatch).toBeCalledWith("appAuthorization/updateAuthorization", {
			ID: "731bcff7-4cf5-4100-b9ea-7648d2f186cb",
			DomainID: "d353f7bb-bc6f-4fd7-93bc-aeb56ab688f1",
			RoleID: "eac752c1-458e-4945-b5ba-f2a104be0230",
			UserID: "922f552b-9291-424d-9e27-d79a55d3eef7",
		})

	})
});
