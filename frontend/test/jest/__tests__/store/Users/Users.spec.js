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
});
