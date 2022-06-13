import git from "isomorphic-git";
import http from "isomorphic-git/http/web";
import * as BrowserFS from "browserfs";

BrowserFS.install(window);

window.dir = "/leto";

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

export const execute = (command) => {
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
