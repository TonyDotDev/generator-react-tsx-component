const helpers = require("yeoman-test");
const assert = require("yeoman-assert");
const path = require("path");

describe("generator:feature", () => {
  const NAME = "notifications";
  const FEATURE_PATH = "../generators/feature";

  describe("With name argument", () => {
    before((done) => {
      helpers.run(path.join(__dirname, FEATURE_PATH)).withArguments([NAME]).on("end", done);
    });

    describe("[feature] directory", () => {
      const featurePath = `src/features/${NAME}`;

      it("has index.ts export file", () => {
        const filePath = `${featurePath}/index.ts`;
        assert.file(filePath);
      });

      it("has default sub-folders", () => {
        const defaultSubFolders = "api, assets, components, hooks, routes, stores, types, utils";
        defaultSubFolders.split(", ").forEach((folder) => {
          assert.file(`${featurePath}/${folder}`);
        });
      });
    });
  });

  describe("With name argument and folders option", () => {
    const featurePath = `src/features/${NAME}`;
    const folders = "api,components,hooks,types";

    before((done) => {
      helpers
        .run(path.join(__dirname, FEATURE_PATH))
        .withArguments([NAME])
        .withOptions({ folders })
        .on("end", done);
    });

    describe("[feature] directory", () => {
      it("has the specified feature folders", () => {
        folders.split(",").forEach((folder) => {
          assert.file(`${featurePath}/${folder}`);
        });
      });
    });
  });

  describe("With name argument and path option", () => {
    const customPath = "custom/path";

    before((done) => {
      helpers
        .run(path.join(__dirname, FEATURE_PATH))
        .withArguments([NAME])
        .withOptions({ path: customPath })
        .on("end", done);
    });

    describe("[feature] directory", () => {
      it("is located at the specified path", () => {
        assert.file(`${customPath}/${NAME}`);
      });
    });
  });
});
