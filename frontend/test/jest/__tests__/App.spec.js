import { describe, expect, it } from '@jest/globals';
import { installQuasarPlugin } from '@quasar/quasar-app-extension-testing-unit-jest';
import { mount } from '@vue/test-utils'
import { createRouter, createWebHistory } from 'vue-router'
import App from 'src/App.vue';

const router = createRouter({
	history: createWebHistory(),
	routes: [
		{
			path: '/',
			component: {
				template: 'Welcome to the Leto App testing'
			}
		},
	],
})

installQuasarPlugin();

describe('App', () => {
	it('mounts without errors', async () => {
		router.push('/')

		// After this line, router is ready
		await router.isReady()
		const wrapper = mount(App, {
			global: {
				plugins: [router],
			},
		});

		expect(wrapper).toBeTruthy();
	});
});

