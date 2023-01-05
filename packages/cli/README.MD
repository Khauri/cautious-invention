# Chronicle/Cli

This is the main entrypoint for initializing and interacting with Chronicle.

## Commands

```sh
chronicle init
```

This will initialize chronicle. No-op if chronicle is already initialized.

```sh
chronicle serve
```

This will initialize the server using the closest Chronicle config to the current working directory as well as start the default Chronicle client. Additional flags can be provided such as:

```text
--server-only   only start the development server
--client-only   only start the client server
--server-port   bind the server to a specific port. Env Var: CHRONICLE_PORT_SERVER
--client-port   bind the client to a specific port. Env Var: CHRONICLE_PORT_CLIENT
--server-host   Use this if you want to connect to a remote backend. Implies --client-only. 
```

```sh
chronicle build
```

This will *attempt* to create a static build. Whether or not this works depends on the framework. In general this process will attempt to render every page as a static HTML page.
Static builds will have documentation editing tools disabled.

## Remote Backends

It can be useful to host and/or share your Chronicle instance among team members. Use the serverHost option to configure the Chronicle client to connect to a remote backend (note CORS may apply in certain cases).

The remote cloud service may offer account management or collaborative services. 

## Development

The cli is an interactive application built in typescript on top of the `ink` and `commander` packages.

### Testing

```sh
npm run build && npm run start -- [command] [...flags] [argument]
```