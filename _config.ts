import lume from "lume/mod.ts";
import lightningcss from "lume/plugins/lightningcss.ts";
import favicon from "lume/plugins/favicon.ts";
import metas from "lume/plugins/metas.ts";

const site = lume();

site.use(lightningcss());
site.use(metas());
site.use(favicon({
  input: "assets/logo.svg",
}));

site.copy("assets");

export default site;
