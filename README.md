# Chronicle

A storybook alternative and component builder that's more visual.

- Document components using a block-based editor
- Construct examples from your own component library using a drag-and-drop interface
- Build new components from existing ones
- Use low-code markup to add data bindings to your live server
- Export your components back to your framework's code
- Build your own frontend / add extensions
- Automatically detect and import components
- BYOB (Bring your own bundler)

Chronicle works out of the box with popular frameworks but can work with any framework that can support the creation of a single Block component.


## Usage

Use the Chronicle cli to create a new Chronicle project.

```sh
npx @chronicle/cli .
```

This will output a `.chronicle` configuration folder

## Blocks

A block is an atomic component that can be used to construct other components.

Typically the framework adapter will have specific instructions on how to specify blocks, but generically a block can be created by specifying a `*.block.[json/yaml]` file somewhere in the repository.

The structure of blocks in the JSON file is as follows:

```json
{
  "blocks": [
    {
      "name": "Say Hello",
      "path": "relative/path/to/component.js",
      "description": "This is the description of the component written *in markdown!*",
      "inputs": {
        "name": {
          "type": "string",
          "required": false,
          "description": "Input descriptions also accept **markdown!**",
          "default": "World"
        }
      },
      "slots": []
    }
  ]
}
```

## Components

A component is composed of one or more blocks. If the framework supports it the component can be exported back to framework code as well.

## Documentation

Documentation are pages of text, components, code examples, and blocks that are used to fully describe something in your design system. This is similar to an MDX file, but not written by hand.

Documentation pages can be built and exported into a static website which can be hosted publically on the internet.

## Design Tokens

Design tokens are key-value pairs that add meaning to arbitrary values.

## Data Sources

Chronicle can support getting real data from one-or-more sources using REST api connectors or generate fake data in a given format.
This can help to see what components look like when filled with data.

Chronicle can also run queries in postgres as well as.

## Styling

Unfortunately there are many, many ways to style a component and Chronicle cannot handle them all.
However, Chromatic pays special attention to the main ways components can be styled: css-in-js, inline-styles, and atomic classes.

Depending on what method your component supports you will get a different editing interface in the component editor.

### css-in-js

Chronicle will pass styles from the style editor to the component as a series of properties.

### Atomic CSS

Libraries like tailwind and bootstrap generate atomic utility classes. Due to the amount of configuration, Chromatic doesn't really have any way of knowing what utility classes you are using.

This means that Chromatic has to rely solely on your design tokens as well as a mapper from those tokens to the utility class.

The editor will provide a dropdown for searching and selecting tokens depending on the type of value being modified.

Make sure that your stylesheets are imported.

(Tailwind's JIT mode may or may not be supported depending on feasability...)
