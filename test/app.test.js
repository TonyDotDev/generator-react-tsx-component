const helpers = require("yeoman-test");
const assert = require("yeoman-assert");
const path = require("path");

describe("generator:app", () => {
  const NAME = "TsxComponent";
  const CLASS_NAME = "tsx-component";
  const APP_PATH = "../generators/app";

  describe("Name argument with no flags", () => {
    before((done) => {
      helpers.run(path.join(__dirname, APP_PATH)).withArguments([NAME]).on("end", done);
    });

    describe("[component]/index.ts", () => {
      const filePath = `${NAME}/index.ts`;

      it("is created", () => {
        assert.file([filePath]);
      });

      it("has component export", () => {
        const fileContent = `export * from './${NAME}'`;
        assert.fileContent(filePath, fileContent);
      });
    });

    describe("[component]/[component].css", () => {
      const filePath = `${NAME}/${NAME}.css`;

      it("is created", () => {
        assert.file([filePath]);
      });

      it("is has css class generated from component name", () => {
        const fileStrings = [`.${CLASS_NAME} {\n`, `}`];
        assert.equalsFileContent(filePath, fileStrings.join(""));
      });
    });

    describe("[component]/[component].tsx", () => {
      const filePath = `${NAME}/${NAME}.tsx`;

      it("is created", () => {
        assert.file([filePath]);
      });

      it("is exports component code", () => {
        const fileStrings = [
          `import React from 'react';\n\n`,
          `import './${NAME}.css';\n\n`,
          `export function ${NAME}(): React.ReactElement {\n`,
          `  return <div className='${CLASS_NAME}'>${NAME}</div>;\n`,
          `}`,
        ];

        assert.equalsFileContent(filePath, fileStrings.join(""));
      });
    });

    describe("[component]/__tests__", () => {
      it("is not created", () => {
        const filePath = `${NAME}/__tests__/${NAME}.test.tsx`;
        assert.noFile([filePath]);
      });
    });
  });

  describe("Name argument with test flag", () => {
    before((done) => {
      helpers
        .run(path.join(__dirname, APP_PATH))
        .withArguments([NAME])
        .withOptions({ test: true })
        .on("end", done);
    });

    describe("[component]/__tests__/[component].test.tsx", () => {
      const filePath = `${NAME}/__tests__/${NAME}.test.tsx`;

      it("is created", () => {
        assert.file([filePath]);
      });

      it("has test boilerplate", () => {
        const fileStrings = [
          `import { render } from '@/test/test-utils';\n\n`,
          `import { ${NAME} } from '../${NAME}';\n\n`,
          `describe('${NAME}', () => {\n`,
          `  render({ui: <${NAME} />});\n`,
          `})`,
        ];

        assert.equalsFileContent(filePath, fileStrings.join(""));
      });
    });
  });

  describe("Name argument with path and test flag", () => {
    const PATH = "custom/path";

    before((done) => {
      helpers
        .run(path.join(__dirname, APP_PATH))
        .withArguments([NAME])
        .withOptions({ path: PATH, test: true })
        .on("end", done);
    });

    describe("[component] directory files", () => {
      it("are created in the specified directory path", () => {
        const files = [
          `${PATH}/${NAME}/index.ts`,
          `${PATH}/${NAME}/${NAME}.tsx`,
          `${PATH}/${NAME}/${NAME}.css`,
          `${PATH}/${NAME}/__tests__/${NAME}.test.tsx`,
        ];
        assert.file(files);
      });
    });
  });
});
