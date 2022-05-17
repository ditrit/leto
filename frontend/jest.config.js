const esModules = [
	"quasar",
	"quasar/lang",
	"lodash-es",
	"grapesjs",
	"monaco",
].join("|");

module.exports = {
	globals: {
		__DEV__: true,
		// TODO: Remove if resolved natively
		// See https://github.com/vuejs/vue-jest/issues/175
		"vue-jest": {
			pug: { doctype: "html" },
		},
	},
	// Jest assumes we are testing in node environment, specify jsdom environment instead
	testEnvironment: "jsdom",
	collectCoverage: false,
	coverageDirectory: "<rootDir>/test/jest/coverage",
	collectCoverageFrom: [
		"<rootDir>/src/**/*.vue",
		"<rootDir>/src/**/*.js",
		"<rootDir>/src/**/*.jsx",
	],
	// Needed in JS codebases too because of feature flags
	coveragePathIgnorePatterns: ["/node_modules/", ".d.ts$"],
	testMatch: [
		"<rootDir>/test/jest/__tests__/**/*.(spec|test).js",
		"<rootDir>/src/**/*.jest.(spec|test).js",
	],
	moduleFileExtensions: ["vue", "js", "jsx", "json"],
	moduleNameMapper: {
		"^quasar$": "quasar/dist/quasar.esm.prod.js",
		"^~/(.*)$": "<rootDir>/$1",
		"^src/(.*)$": "<rootDir>/src/$1",
		"^app/(.*)$": "<rootDir>/$1",
		"^components/(.*)$": "<rootDir>/src/components/$1",
		"^layouts/(.*)$": "<rootDir>/src/layouts/$1",
		"^pages/(.*)$": "<rootDir>/src/pages/$1",
		"^assets/(.*)$": "<rootDir>/src/assets/$1",
		"^boot/(.*)$": "<rootDir>/src/boot/$1",
		//".*css$": "@quasar/quasar-app-extension-testing-unit-jest/stub.css",
		"^d3": "<rootDir>/node_modules/d3/dist/d3.min.js",
		grapesjscss: "<rootDir>/node_modules/grapesjs/dist/grapesjs.min.css",
	},
	transform: {
		".*\\.vue$": "vue-jest",
		".*\\.js$": "babel-jest",
		".+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$":
			"jest-transform-stub",
	},
	transformIgnorePatterns: [`node_modules/(?!(${esModules}))`],
	snapshotSerializers: ["jest-serializer-vue"],
	testResultsProcessor: "jest-sonar-reporter",
	collectCoverage: true,
	collectCoverageFrom: ["src/**/*.{js,vue}"],
	coverageReporters: ["lcov", "cobertura", "text-summary"],
	coverageDirectory: "./reports",
};
