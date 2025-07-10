import lume from "lume/mod.ts";
import lightningcss from "lume/plugins/lightningcss.ts";
import favicon from "lume/plugins/favicon.ts";
import metas from "lume/plugins/metas.ts";
import inline from "lume/plugins/inline.ts";
import multilanguage from "lume/plugins/multilanguage.ts";
import nav from "lume/plugins/nav.ts";
import sheets from "lume/plugins/sheets.ts";
import icons from "lume/plugins/icons.ts";
import transformImages from "lume/plugins/transform_images.ts";
import picture from "lume/plugins/picture.ts";
import * as filters from "./_filters.ts";

const site = lume();

site.use(lightningcss());
site.use(metas());
site.use(icons());
site.use(picture());
site.use(transformImages());
site.use(inline());
site.use(nav());
site.use(sheets());
site.use(favicon({
  input: "assets/logo.svg",
}));
site.use(multilanguage({
  defaultLanguage: "en",
  languages: ["en", "es"],
}));

site.add("assets");
site.add("style.css");
site.filter("demographics", filters.convertFoundries);
site.filter("units", filters.convertUnit);
site.filter("pricing", filters.convertPricing);
site.filter("licenses", filters.convertLicenses);
site.filter("languages", filters.convertLanguages);

export default site;
