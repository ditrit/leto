import { describe, expect, it } from "@jest/globals";
import API from "src/services/index";
import store from "src/store/Users/index.js";

describe("Store: Users", () => {
	describe("Test: actions", () => {
		it("Test methods: fetchUsers", async () => {
			jest.spyOn(API, "get").mockResolvedValue({ data: "test fetchUsers" });
			const commit = jest.fn(() => {});

			await store.actions.fetchUsers({ commit }, {});
			expect(commit).toBeCalledWith("GET_USERS", "test fetchUsers");
		});

		it("Test methods: addUser", async () => {
			jest.spyOn(API, "post").mockResolvedValue({ data: "test addUser" });
			const commit = jest.fn(() => {});

			await store.actions.addUser({ commit }, {});
			expect(commit).toBeCalledWith("NEW_USER", "test addUser");
		});

		it("Test methods: updateUser", async () => {
			jest.spyOn(API, "put").mockResolvedValue({ data: "test updateUser" });
			const commit = jest.fn(() => {});

			await store.actions.updateUser({ commit }, {});
			expect(commit).toBeCalledWith("UPDATE_USER", "test updateUser");
		});

		it("Test methods: removeUser", async () => {
			jest.spyOn(API, "delete").mockImplementation(() => {});
			const commit = jest.fn(() => {});

			await store.actions.removeUser({ commit }, 1);
			expect(commit).toBeCalledWith("DELETE_USER", 1);
		});
	});

	describe("Test: getters", () => {
		const mockState = {
			theUsers: "test theUsers",
		};

		it("Test methods: allUsers", () => {
			expect(store.getters.allUsers(mockState)).toBe("test theUsers");
		});
	});

	describe("Test: state", () => {
		it("Test initialization", () => {
			expect(store.state).toEqual({ theUsers: [] });
		});
	});

	describe("Test: mutations", () => {
		it("Test method: GET_USERS", () => {
			const state = { theUsers: null };

			store.mutations.GET_USERS(state, []);

			expect(state.theUsers).toEqual([]);
		});

		it("Test method: NEW_USER", () => {
			const state = { theUsers: [] };
			store.mutations.NEW_USER(state, 2);
			store.mutations.NEW_USER(state, 1);
			expect(state.theUsers).toEqual([1, 2]);
		});

		it("Test method: UPDATE_USER", () => {
			const state = { theUsers: [{ ID: 1 }, { ID: 2 }] };
			store.mutations.UPDATE_USER(state, { ID: 1 });
			expect(state.theUsers).toEqual([{ ID: 1 }, { ID: 2 }]);
			store.mutations.UPDATE_USER(state, { ID: 2 });
			expect(state.theUsers).toEqual([{ ID: 1 }, { ID: 2 }]);
		});

		it("Test method: DELETE_USER", () => {
			const state = { theUsers: [{ ID: 1 }, { ID: 2 }] };
			store.mutations.DELETE_USER(state, 1);
			expect(state.theUsers).toEqual([{ ID: 2 }]);
			store.mutations.DELETE_USER(state, 2);
			expect(state.theUsers).toEqual([]);
			store.mutations.DELETE_USER(state, 3);
			expect(state.theUsers).toEqual([]);
		});
	});
});
