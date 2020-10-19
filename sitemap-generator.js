// the code is failing, babel issue I noon in this

const es2015 = require('babel-preset-es2015');
const presetReact = require('babel-preset-react');

require("babel-register")({
  presets: [es2015, presetReact],
});

const router = require("./src/components/routers/routers").default;
const Sitemap = require("react-router-sitemap").default;

function generateSitemap() {
  return new Sitemap(router)
    .build("https://genshin-impact-tracker.herokuapp.com/")
    .save("./public/sitemap.xml");
}

generateSitemap();
