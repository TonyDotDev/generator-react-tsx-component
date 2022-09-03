"use strict";

const Generator = require("yeoman-generator");
const yosay = require("yosay");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.log("Initializing...");

    this.argument("name", {
      type: String,
      required: true,
      description:
        "The name of the component. This will also be the name of the directory containing the component.",
    });

    this.option("test", {
      type: Boolean,
      default: false,
      description:
        "Adds a __tests__ directory in the component folder with some boilerplate for @testing-library/react.",
    });

    this.option("path", {
      type: String,
      default: "",
      description: "Path where the component directory will be created",
    });

    this.name = this.options.name;
    this.test = this.options.test;

    this.generateDestination = function () {
      if (this.options.path === "") return this.options.name;
      return this.options.path + "/" + this.options.name;
    };
  }

  writing() {
    // Create component directory
    this.destinationRoot(this.generateDestination());

    // Write css file
    this.fs.copyTpl(this.templatePath("component.css"), this.destinationPath(this.name + ".css"));

    // Write component file
    this.fs.copyTpl(this.templatePath("component.tsx"), this.destinationPath(this.name + ".tsx"), {
      name: this.name,
    });

    // If test flag, write test files
    if (this.test) {
      this.fs.copyTpl(
        this.templatePath("component.test.tsx"),
        this.destinationPath("__tests__/", this.name + ".test.tsx"),
        {
          name: this.name,
        }
      );
    }

    // Write component export file
    this.fs.copyTpl(this.templatePath("index.ts"), this.destinationPath("index.ts"), {
      name: this.name,
    });
  }

  end() {
    const outputMsg = `\n\nYour React TSX component ${this.name} has been created.`;
    this.log(yosay(outputMsg));
  }
};
