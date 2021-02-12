const { writeFileSync, readFileSync, existsSync, mkdirSync } = require("fs");
const { join } = require("path");

const packageFile = readFileSync(join(__dirname, "../package.json"));
const { name, description, version } = JSON.parse(packageFile);

const manifestFile = readFileSync(
  join(__dirname, "../src/manifest.json")
).toString();

const updatedManifestFile = manifestFile
  .replace("{{name}}", name.toUpperCase())
  .replace("{{description}}", description)
  .replace("{{version}}", version);

if (!existsSync(join(__dirname, "../dist"))) {
  mkdirSync(join(__dirname, "../dist"));
}

writeFileSync(join(__dirname, "../dist/manifest.json"), updatedManifestFile, {
  encoding: "utf-8",
});
