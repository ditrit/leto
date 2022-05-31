import { describe, expect, it } from "@jest/globals";
import API from "src/services/index";
import store from "src/store/Auth/index.js";

describe("Store: Auth", () => {
	describe("Test: actions", () => {
		it("Test methods: register", async () => {
			jest.spyOn(API, "post").mockResolvedValue({ data: "Test register" });
			const commit = jest.fn(() => {});
			await store.actions.register({ commit }, {});
			expect(commit).toBeCalledWith("SET_USER_DATA", "Test register");
		});

		it("Test methods: login", async () => {
			jest.spyOn(API, "post").mockResolvedValue({ data: "Test login" });
			const commit = jest.fn(() => {});
			await store.actions.login({ commit }, {});
			expect(commit).toBeCalledWith("SET_USER_DATA", "Test login");
		});

		it("Test methods: currentUser", async () => {
			const commit = jest.fn(() => {});
			await store.actions.currentUser({ commit }, {});
			expect(commit).toBeCalledWith("USER", {});
		});

		it("Test methods: logout", async () => {
			jest.spyOn(API, "post").mockResolvedValue();
			const commit = jest.fn(() => {});
			await store.actions.logout({ commit }, 1);
			expect(commit).toBeCalledWith("CLEAR_USER_DATA");
		});
	});

	describe("Test: getters", () => {
		const mockState = {
			user: "Get Current User",
		};

		it("Test methods: currentUser", () => {
			expect(store.getters.currentUser(mockState)).toBe("Get Current User");
		});
	});

	describe("Test: state", () => {
		it("Test initialization", () => {
			expect(store.state).toEqual({ authenticated: false, user: null });
		});
	});

	describe("Test: mutations", () => {
		const windowLocation = window.location;
		beforeAll(() => {
			Object.defineProperty(window, "location", {
				configurable: true,
				value: { reload: jest.fn() },
			});
		});
		afterAll(() => {
			Object.defineProperty(window, "location", {
				configurable: true,
				value: windowLocation,
			});
		});
		it("Test method: SET_USER_DATA", () => {
			const state = { user: null };
			store.mutations.SET_USER_DATA(state, {});
			expect(jest.isMockFunction(window.location.reload)).toBe(true);
			expect(state.user).toEqual({});
		});

		it("Test method: CLEAR_USER_DATA", () => {
			const state = { user: {} };
			store.mutations.CLEAR_USER_DATA(state, 1);
			expect(state.user).toEqual({});
		});

		it("Test method: USER", () => {
			const state = { user: { ID: 1 } };
			store.mutations.USER(state, { ID: 1 });
			expect(state.user).toEqual({ ID: 1 });
		});
	});
});
