"use strict";

const Generator = require("yeoman-generator");
const yosay = require("yosay");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.log("Initializing...");
  }
  async prompting() {
    this.answers = await this.prompt([
      {
        type: "input",
        name: "name",
        message: "Enter a name for the new component (i.e.: NavigationMenu): ",
      },
      {
        type: "confirm",
        name: "hasTest",
        message: "Would you like to create a test file with this component? ",
      },
    ]);
  }

  writing() {
    // Create component directory
    this.destinationRoot(this.answers.name);

    // Write css file
    this.fs.copyTpl(
      this.templatePath("component.css"),
      this.destinationPath(this.answers.name + ".css")
    );

    // Write component file
    this.fs.copyTpl(
      this.templatePath("component.tsx"),
      this.destinationPath(this.answers.name + ".tsx"),
      {
        name: this.answers.name,
      }
    );

    if (this.answers.hasTest) {
      this.fs.copyTpl(
        this.templatePath("component.test.tsx"),
        this.destinationPath("__tests__/", this.answers.name + ".test.tsx"),
        {
          name: this.answers.name,
        }
      );
    }

    // Write component export file
    this.fs.copyTpl(this.templatePath("index.ts"), this.destinationPath("index.ts"), {
      name: this.answers.name,
    });
  }

  end() {
    const outputMsg = `\n\nYour React TSX component ${this.answers.name} has been created.`;
    this.log(yosay(outputMsg));
  }
};
