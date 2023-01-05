# Web Application Framework TYpe

Uses not-so-fancy algorithms to try and detect the libraries and framework[s] a project is using. 

Useful for tool authors who are trying to support multiple framworks and would like an easy way to determine which ones the user's project contains.

## Usage

```js
// detect and return data for the first framework found. (ie sveltekit, remix, nextjs, nuxtjs)
// useful if the project only expects a single framework to be in use
const framework = detectFramework();
// Find all frameworks
const frameworks = findFrameworks();
// check if a framework is in use
const isSveltekit = hasFramework(FRAMEWORKS.SVELTEKIT);
// Detect libraries (react, solid, svelte, typescript, prettier, jest)
const libraries = detectLibraries();
// Simply check if a library is in use
const 
```

## Frameworks

TODO: Put a table of supported frameworks here + additional data they may return

## Libraries

`detectLibraries` returns an `object` where if a library is not detected it will have a value of `false` whereas detect libraries

## Contributing

First add testing fixtures to the `tests/libraries` and/or `tests/frameworks` folders, depending on what kind of detection you're going for. Add as many as you like and don't be shy.
Each framework and library has 

