import git from "isomorphic-git";
import http from "isomorphic-git/http/web";
import * as BrowserFS from "browserfs";

// console.log("git: ", git);
// console.log("http: ", http);
// console.log("*: ", BrowserFS);
// git.clone("https://github.com/ditrit/leto.git");

BrowserFS.install(window);
BrowserFS.configure({ fs: "LocalStorage" }, (err) => {
});

window.dir = "/leto";
// console.log(dir);

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
	const defaultCommandOption = {
		fs: BrowserFS.BFSRequire("fs"),
		dir: command.product.ID,
	};

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
