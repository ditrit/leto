import { describe, expect, it } from "@jest/globals";
import API from "src/services/index";
import store from "src/store/Roles/index.js";

describe("Store: Roles", () => {
	describe("Test: actions", () => {
		it("Test methods: fetchAllRoles", async () => {
			jest.spyOn(API, "get").mockResolvedValue({ data: "test fetchAllRoles" });
			const commit = jest.fn(() => {});
			await store.actions.fetchAllRoles({ commit }, {});
			expect(commit).toBeCalledWith("GET_ROLES", "test fetchAllRoles");
		});

		it("Test methods: addRole", async () => {
			jest.spyOn(API, "post").mockResolvedValue({ data: "test addRole" });
			const commit = jest.fn(() => {});
			await store.actions.addRole({ commit }, {});
			expect(commit).toBeCalledWith("NEW_ROLE", "test addRole");
		});

		it("Test methods: updateRole", async () => {
			jest.spyOn(API, "put").mockResolvedValue({ data: "test updateRole" });
			const commit = jest.fn(() => {});
			await store.actions.updateRole({ commit }, {});
			expect(commit).toBeCalledWith("UPDATE_ROLE", "test updateRole");
		});

		it("Test methods: removeRole", async () => {
			jest.spyOn(API, "delete").mockImplementation(() => {});
			const commit = jest.fn(() => {});
			await store.actions.removeRole({ commit }, 1);
			expect(commit).toBeCalledWith("DELETE_ROLE", 1);
		});
	});

	describe("Test: getters", () => {
		const mockState = {
			roles: "test allRoles",
		};

		it("Test methods: allRoles", () => {
			expect(store.getters.allRoles(mockState)).toBe("test allRoles");
		});
	});

	describe("Test: state", () => {
		it("Test initialization", () => {
			expect(store.state).toEqual({ roles: [] });
		});
	});

	describe("Test: mutations", () => {
		it("Test method: GET_ROLES", () => {
			const state = { roles: null };
			store.mutations.GET_ROLES(state, []);
			expect(state.roles).toEqual([]);
		});

		it("Test method: NEW_ROLE", () => {
			const state = { roles: [] };
			store.mutations.NEW_ROLE(state, 2);
			store.mutations.NEW_ROLE(state, 1);
			expect(state.roles).toEqual([1, 2]);
		});

		it("Test method: UPDATE_ROLE", () => {
			const state = { roles: [{ ID: 1 }, { ID: 2 }] };
			store.mutations.UPDATE_ROLE(state, { ID: 1 });
			expect(state.roles).toEqual([{ ID: 1 }, { ID: 2 }]);
			store.mutations.UPDATE_ROLE(state, { ID: 2 });
			expect(state.roles).toEqual([{ ID: 1 }, { ID: 2 }]);
		});

		it("Test method: DELETE_ROLE", () => {
			const state = { roles: [{ ID: 1 }, { ID: 2 }] };
			store.mutations.DELETE_ROLE(state, 1);
			expect(state.roles).toEqual([{ ID: 2 }]);
			store.mutations.DELETE_ROLE(state, 2);
			expect(state.roles).toEqual([]);
		});
	});
});
