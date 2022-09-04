"use strict";

const Generator = require("yeoman-generator");
const yosay = require("yosay");
const mkdirp = require("mkdirp");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);
    this.log("Creating feature...");

    this.argument("name", {
      type: String,
      required: true,
      description:
        "The name of the feature. This will also be the name of the directory containing the feature folders.",
    });

    this.option("folders", {
      type: String,
      default: "api, assets, components, hooks, routes, stores, types, utils",
      description: "List folders to be generated in the feature directory",
    });

    this.option("path", {
      type: String,
      default: "src/features",
      description: "Path where the feature directory will be created",
    });

    this.name = this.options.name;
    this.folders = this.options.folders;
    this.generateDestination = function () {
      const { name, path } = this.options;
      return `${path}/${name}`;
    };
  }

  writing() {
    // Create feature directory
    this.destinationRoot(this.generateDestination());

    // Write feature export file
    this.fs.copyTpl(this.templatePath("index.ts"), this.destinationPath("index.ts"));

    // Generate default feature sub-directories
    this.folders.split(",").forEach((folder) => {
      mkdirp.sync(`${this.generateDestination()}/${folder.trim()}`);
    });
  }

  end() {
    const outputMsg = `\n\nYour feature ${this.name} has been created.`;
    this.log(yosay(outputMsg));
  }
};
