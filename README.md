# generator-react-tsx-component
Yeoman generator for React TSX components. The [bulletproof react repo](https://github.com/alan2207/bulletproof-react/blob/master/README.md) was an inspiration for this generator. It speeds up the process of adding new component and feature folders when using a feature based project structure.

## Table Of Contents

- [How To Use](#how-to-use)
- [Generate Component Folder](#generate-component-folder)
- [Generate Feature Folder](#generate-feature-folder)
- [Options](#options)

<br/>

## How To Use:

First install the generator:
`yarn add generator-react-tsx-component`

<br/>

## Generate Component Folder

### Base Command
To generate a React TSX component folder with component, index and imported css files, run:

`npx yo generator-react-tsx-component MyComponent`

where MyComponent is the name of your component.

<br/>

## Generate Feature Folder

### Base Command
This will generate a features folder in the src directory with api, assets, components, hooks, routes, stores, types, and utils subfolders.

`npx yo generator-react-tsx-component feature MyFeature`

<br/>

## Options

- --path flag, string

To generate a component or feature at a specific path.

`--path=your/path/here`


### Feature Options

- --folders flag, string

To specify which sub-directories are created in the feature folder use a comma separated list with no spaces:

`--folders=api,components,types,__tests__`


### Component Options

- --test flag, boolean

To generate a component with a __tests__ subfolder and react testing library test file, run:

`npx yo generator-react-tsx-component MyComponent --test`

<br/>

## Project Structure

```sh
root
|
+-- generators           # yeoman generators
|
+-- test                 # all tests
```
<br/>

## Generator Structure
In the generators directory, the root generator, which will be run when no additional commands are input with the `yo` CLI command, is kept in the app folder. Other generators are kept in sibling directories within the generators directory. The following diagram shows the anatomy of a generator:


```sh
generator_folder_name (such as app or features in the repo)
|
+-- templates            # template files to be generated
|
+-- index                # generator business logic
```

Visit the [Yeoman Generator Docs](https://yeoman.io/authoring/) for more info on how to author your own generator.

<br/>

## Running Locally

This application was developed using Node v16.17.0

```bash
git clone git@github.com:TonyDotDev/generator-react-tsx-component.git
cd generator-react-tsx-component
yarn
npm link
```

Now you can run the generator with [these commands](#how-to-use)
