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

export default site;
