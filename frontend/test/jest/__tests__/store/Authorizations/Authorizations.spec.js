import { describe, expect, it } from "@jest/globals";
import API from "src/services/index";
import store from "src/store/Authorizations/index";

describe("Store: Authorizations", () => {
	describe("Test: actions", () => {
		it("Test methods: fetchAllAuthorizations", async () => {
			jest
				.spyOn(API, "get")
				.mockResolvedValue({ data: "test fetchAllAuthorizations" });
			const commit = jest.fn(() => {});
			await store.actions.fetchAllAuthorizations({ commit }, {});
			expect(commit).toBeCalledWith(
				"GET_AUTHORIZATIONS",
				"test fetchAllAuthorizations"
			);
		});

		it("Test methods: addAuthorization", async () => {
			jest
				.spyOn(API, "post")
				.mockResolvedValue({ data: "test addAuthorization" });
			const commit = jest.fn(() => {});
			await store.actions.addAuthorization({ commit }, {});
			expect(commit).toBeCalledWith(
				"NEW_AUTHORIZATION",
				"test addAuthorization"
			);
		});

		it("Test methods: updateAuthorization", async () => {
			jest
				.spyOn(API, "put")
				.mockResolvedValue({ data: "test updateAuthorization" });
			const commit = jest.fn(() => {});
			await store.actions.updateAuthorization({ commit }, {});
			expect(commit).toBeCalledWith(
				"UPDATE_AUTHORIZATION",
				"test updateAuthorization"
			);
		});

		it("Test methods: removeAuthorization", async () => {
			jest.spyOn(API, "delete").mockImplementation(() => {});
			const commit = jest.fn(() => {});
			await store.actions.removeAuthorization({ commit }, 1);
			expect(commit).toBeCalledWith("DELETE_AUTHORIZATION", 1);
		});
	});

	describe("Test: getters", () => {
		const mockState = {
			authorizations: "test allAuthorizations",
		};

		it("Test methods: allAuthorizations", () => {
			expect(store.getters.allAuthorizations(mockState)).toBe(
				"test allAuthorizations"
			);
		});
	});

	describe("Test: state", () => {
		it("Test initialization", () => {
			expect(store.state).toEqual({ authorizations: [] });
		});
	});

	describe("Test: mutations", () => {
		it("Test method: GET_AUTHORIZATIONS", () => {
			const state = { authorizations: null };
			store.mutations.GET_AUTHORIZATIONS(state, []);
			expect(state.authorizations).toEqual([]);
		});

		it("Test method: NEW_AUTHORIZATION", () => {
			const state = { authorizations: [] };
			store.mutations.NEW_AUTHORIZATION(state, 2);
			store.mutations.NEW_AUTHORIZATION(state, 1);
			expect(state.authorizations).toEqual([1, 2]);
		});

		it("Test method: UPDATE_AUTHORIZATION", () => {
			const state = {
				authorizations: [{ ID: 1 }, { ID: 2 }],
			};
			store.mutations.UPDATE_AUTHORIZATION(state, { ID: 1 });
			expect(state.authorizations).toEqual([{ ID: 1 }, { ID: 1 }]);
			store.mutations.UPDATE_AUTHORIZATION(state, { ID: 2 });
			expect(state.authorizations).toEqual([{ ID: 1 }, { ID: 2 }]);
		});

		it("Test method: DELETE_AUTHORIZATION", () => {
			const state = { authorizations: [{ ID: 1 }, { ID: 2 }] };
			store.mutations.DELETE_AUTHORIZATION(state, 1);
			expect(state.authorizations).toEqual([{ ID: 2 }]);
			store.mutations.DELETE_AUTHORIZATION(state, 2);
			expect(state.authorizations).toEqual([]);
		});
	});
});
