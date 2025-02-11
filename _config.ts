import lume from "lume/mod.ts";
import lightningcss from "lume/plugins/lightningcss.ts";

const site = lume();

site.use(lightningcss());
site.copy("assets");

export default site;
