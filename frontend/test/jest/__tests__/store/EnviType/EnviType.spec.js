import { describe, expect, it } from "@jest/globals";
import API from "src/services/index";
import store from "src/store/EnviType/index";

describe("Store: EnviType", () => {
	describe("Test: Actions", () => {
		it("Test method: fetchAllEnviTypes", async () => {
			jest
				.spyOn(API, "get")
				.mockResolvedValue({ data: "test fetchAllEnviTypes" });
			const commit = jest.fn(() => {});

			await store.actions.fetchAllEnviTypes({ commit }, {});
			expect(commit).toBeCalledWith("GET_ENVITYPE", "test fetchAllEnviTypes");
		});
	});

	it("Test method: addEnviType", async () => {
		jest.spyOn(API, "post").mockResolvedValue({ data: "test addEnviType" });
		const commit = jest.fn(() => {});

		await store.actions.addEnviType({ commit }, {});
		expect(commit).toBeCalledWith("NEW_ENVITYPE", "test addEnviType");
	});

	it("Test method: updateEnviType", async () => {
		jest.spyOn(API, "put").mockResolvedValue({ data: "test updateEnviType" });
		const commit = jest.fn(() => {});

		await store.actions.updateEnviType({ commit }, {});
		expect(commit).toBeCalledWith("UPDATE_ENVITYPE", "test updateEnviType");
	});

	it("Test method: removeEnviType", async () => {
		jest.spyOn(API, "delete").mockImplementation(() => {});
		const commit = jest.fn(() => {});

		await store.actions.removeEnviType({ commit }, 1);
		expect(commit).toBeCalledWith("DELETE_ENVITYPE", 1);
	});
	describe("Test: getters", () => {
		const mockState = {
			enviTypes: "test allEnviTypes",
		};

		it("Test methods: allEnviTypes", () => {
			expect(store.getters.allEnviTypes(mockState)).toBe("test allEnviTypes");
		});
	});

	describe("Test: state", () => {
		it("Test initialization", () => {
			expect(store.state).toEqual({ enviTypes: [] });
		});
	});
	describe("Test: mutations", () => {
		it("Test method: GET_ENVITYPE", () => {
			const state = { enviTypes: null };

			store.mutations.GET_ENVITYPE(state, []);

			expect(state.enviTypes).toEqual([]);
		});

		it("Test method: NEW_ENVITYPE", () => {
			const state = { enviTypes: [] };

			store.mutations.NEW_ENVITYPE(state, 2);
			store.mutations.NEW_ENVITYPE(state, 1);

			expect(state.enviTypes).toEqual([1, 2]);
		});

		it("Test method: UPDATE_ENVITYPE", () => {
			const state = { enviTypes: [{ ID: 1 }, { ID: 2 }] };

			store.mutations.UPDATE_ENVITYPE(state, { ID: 1 });
			expect(state.enviTypes).toEqual([{ ID: 1 }, { ID: 2 }]);

			store.mutations.UPDATE_ENVITYPE(state, { ID: 2 });
			expect(state.enviTypes).toEqual([{ ID: 1 }, { ID: 2 }]);
		});

		it("Test method: DELETE_ENVITYPE", () => {
			const state = { enviTypes: [{ ID: 1 }, { ID: 2 }] };

			store.mutations.DELETE_ENVITYPE(state, 1);
			expect(state.enviTypes).toEqual([{ ID: 2 }]);

			store.mutations.DELETE_ENVITYPE(state, 2);
			expect(state.enviTypes).toEqual([]);

			store.mutations.DELETE_ENVITYPE(state, 3);
			expect(state.enviTypes).toEqual([]);
		});
	});
});
