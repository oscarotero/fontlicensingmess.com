import lume from "lume/mod.ts";
import lightningcss from "lume/plugins/lightningcss.ts";
import favicon from "lume/plugins/favicon.ts";
import metas from "lume/plugins/metas.ts";
import inline from "lume/plugins/inline.ts";
import multilanguage from "lume/plugins/multilanguage.ts";
import nav from "lume/plugins/nav.ts";
import sheets from "lume/plugins/sheets.ts";
import icons from "lume/plugins/icons.ts";

const site = lume();

site.use(lightningcss());
site.use(metas());
site.use(inline());
site.use(nav());
site.use(sheets());
site.use(icons());
site.use(favicon({
  input: "assets/logo.svg",
}));
site.use(multilanguage({
  defaultLanguage: "en",
  languages: ["en", "es"],
}));

site.copy("assets");

interface FoundryCSV {
  Nombre: string;
  "URL Licensing": string;
  "Base Country": string;
  "Run by women": "No" | "Yes";
}
interface Foundry {
  name: string;
  url?: string;
  country: string;
  women: boolean;
}

site.filter("demographics", (content: FoundryCSV[]) => {
  const foundries: Foundry[] = [];

  for (const foundry of content) {
    const countries = foundry["Base Country"].split(",").map((c) => c.trim());
    for (const country of countries) {
      foundries.push({
        name: foundry.Nombre,
        url: foundry["URL Licensing"] || undefined,
        country,
        women: foundry["Run by women"] === "Yes",
      });
    }
  }

  foundries.sort((a, b) => a.country.localeCompare(b.country));

  return Object.groupBy(foundries, (f) => f.country);
});

export default site;
