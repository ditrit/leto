import git from "isomorphic-git";
import http from "isomorphic-git/http/web";
import * as BrowserFS from "browserfs";

console.log("git: ", git);
console.log("http: ", http);
console.log("*: ", BrowserFS);

BrowserFS.install(window);
BrowserFS.configure({ fs: "LocalStorage" }, () => {});

const httpCommands = [
	"clone",
	"fetch",
	"push",
	"pull",
	"fastForward",
	"getRemoteInfo",
	"getRemoteInfo2",
	"listServerRefs",
];

export const execute = ({ getters }, command) => {
	console.log(command);
	const defaultCommandOption = {
		fs: BrowserFS.BFSRequire("fs"),
		dir: command.product.ID,
	};
	console.log("defaultCommandOption: ", defaultCommandOption);

	if (httpCommands.includes(command.name)) {
		defaultCommandOption.http = http;
		defaultCommandOption.corsProxy = "https://cors.isomorphic-git.org";
		defaultCommandOption.url = command.product.RepositoryURL;
	}

	return git[command.name]({
		...command.options,
		...defaultCommandOption,
	});
};
