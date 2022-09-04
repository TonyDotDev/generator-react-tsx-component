"use strict";

const Generator = require("yeoman-generator");
const yosay = require("yosay");
const { depascalize } = require("xcase");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.log("Creating component...");

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

    this.getCssClassName = function (name) {
      return decamelize(name, { separator: "-" });
    };

    this.generateDestination = function () {
      const { path, name } = this.options;
      if (path === "") return name;
      return path + "/" + name;
    };

    this.name = this.options.name;
    this.test = this.options.test;
    this.className = depascalize(this.options.name, "-");
  }

  writing() {
    // Create component directory
    this.destinationRoot(this.generateDestination());

    // Write css file
    this.fs.copyTpl(this.templatePath("component.css"), this.destinationPath(this.name + ".css"), {
      className: this.className,
    });

    // Write component file
    this.fs.copyTpl(this.templatePath("component.tsx"), this.destinationPath(this.name + ".tsx"), {
      name: this.name,
      className: this.className,
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
