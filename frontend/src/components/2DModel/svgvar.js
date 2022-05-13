import axios from "axios";
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

/* exemple d'instanciation
    let data = {
      logo: "logo/elephant.png",
      primary_color: "#d3eaf2",
      secondary_color: "#bae0ed",
      width: 100,
      rels_height: 30,
      container_height: 20,
      instance_name: "Ursulle",
      type_name: "R2D2_6PO",
    };
*/

/* exemple d'utilisation
   const res = await axios.get("srv1_vars.svg");
   if (res.status == 200) {
     const svgDom = SVGinstanciate(res.data, data);
     d3.select("#svgTest").node().append(svgDom.documentElement);
   }
*/
