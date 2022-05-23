import { evaluate } from "mathjs";

function SVGmatch(text, data) {
    function matchTxt(m, op, found, s) {
      return op == "N"
        ? evaluate(found, data)
        : found
            .split(",")
            .map((x) => (data[x] ? data[x] : x))
            .join("");
    }

    return text.replace(/([TN]){{([^}]*)}}/g, matchTxt);
}

export default function SVGinstanciate(svgVars, data) {
    const domParser = new DOMParser();
    const svgTxt = SVGmatch(svgVars, data);
    return domParser.parseFromString(svgTxt, "image/svg+xml");
}
