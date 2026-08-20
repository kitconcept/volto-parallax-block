# Volto Parallax Block (@kitconcept/volto-parallax-block)

A visual block with a fixed background image that creates a parallax scrolling effect. Content scrolls over the image, revealing different areas as the user scrolls down the page.

[![npm](https://img.shields.io/npm/v/@kitconcept/volto-parallax-block)](https://www.npmjs.com/package/@kitconcept/volto-parallax-block)
[![](https://img.shields.io/badge/-Storybook-ff4785?logo=Storybook&logoColor=white&style=flat-square)](https://kitconcept.github.io/volto-parallax-block/)
[![CI](https://github.com/kitconcept/volto-parallax-block/actions/workflows/main.yml/badge.svg)](https://github.com/kitconcept/volto-parallax-block/actions/workflows/main.yml)

<picture>
  <source media="(prefers-color-scheme: dark)" srcset="https://kitconcept.com/kitconcept-white.svg">
  <img width="300" alt="kitconcept, GmbH" src="https://kitconcept.com/kitconcept-black.svg">
</picture>

## Screenshot

<img width="2560" height="1355" alt="image" src="https://github.com/user-attachments/assets/618be7d3-eaf3-484f-8b59-f459f6978029" />

## Screencast

https://github.com/user-attachments/assets/06ef1bff-1eee-4f02-9e09-e5bca06e7238

> [!IMPORTANT]
> #### `@kitconcept/volto-light-theme` required first
>
> This add-on is build to be used with the `@kitconcept/volto-light-theme` theme.
> To use this addon with volto you may require additional configuration or customization.

## Features

Implement a Parallax block for Volto sites.

## Installation

To install this add-on on your project, you should add the following configurations to your `package.json`:

This add-on requires both `@kitconcept/volto-bm3-compat` and `@kitconcept/volto-light-theme`, so please make sure you have the `theme` set to `@kitconcept/volto-light-theme`

```json
"theme": "@kitconcept/volto-light-theme",
```

And also make sure both add-ons are present in `addons` and in `dependencies`:

```json
"addons": [
    "@kitconcept/volto-bm3-compat",
    "@kitconcept/volto-light-theme",
    "@kitconcept/volto-parallax-block"
],
"dependencies": {
    "@kitconcept/volto-bm3-compat": "*",
    "@kitconcept/volto-light-theme": "*"
}
```

Then add `@kitconcept/volto-parallax-block` to `addons` and to `dependencies`

```json
"addons": [
    ...
    "@kitconcept/volto-parallax-block"
],
"dependencies": {
    ...
    "@kitconcept/volto-parallax-block": "*"
}
```

## Test installation

Visit http://localhost:3000/ in a browser, login, and check the awesome new features.


## Development

The development of this add-on is done in isolation using a new approach using pnpm workspaces and latest `mrs-developer` and other Volto core improvements.
For this reason, it only works with pnpm and Volto 18 (currently in alpha).


### Prerequisites ✅

-   An [operating system](https://6.docs.plone.org/install/create-project-cookieplone.html#prerequisites-for-installation) that runs all the requirements mentioned.
-   [nvm](https://6.docs.plone.org/install/create-project-cookieplone.html#nvm)
-   [Node.js and pnpm](https://6.docs.plone.org/install/create-project.html#node-js) 24
-   [Make](https://6.docs.plone.org/install/create-project-cookieplone.html#make)
-   [Git](https://6.docs.plone.org/install/create-project-cookieplone.html#git)
-   [Docker](https://docs.docker.com/get-started/get-docker/) (optional)

### Installation 🔧

1.  Clone this repository, then change your working directory.

    ```shell
    git clone git@github.com:kitconcept/volto-parallax-block.git
    cd volto-parallax-block
    ```

2.  Install this code base.

    ```shell
    make install
    ```


### Make convenience commands

Run `make help` to list the available commands.

```text
help                             Show this help
install                          Installs the add-on in a development environment
start                            Starts Volto, allowing reloading of the add-on during development
build                            Build a production bundle for distribution of the project with the add-on
i18n                             Sync i18n
ci-i18n                          Check if i18n is not synced
format                           Format codebase
lint                             Lint, or catch and remove problems, in code base
release                          Release the add-on on npmjs.org
release-dry-run                  Dry-run the release of the add-on on npmjs.org
test                             Run unit tests
ci-test                          Run unit tests in CI
backend-docker-start             Starts a Docker-based backend for development
storybook-start                  Start Storybook server on port 6006
storybook-build                  Build Storybook
acceptance-frontend-dev-start    Start acceptance frontend in development mode
acceptance-frontend-prod-start   Start acceptance frontend in production mode
acceptance-backend-start         Start backend acceptance server
ci-acceptance-backend-start      Start backend acceptance server in headless mode for CI
acceptance-test                  Start Cypress in interactive mode
ci-acceptance-test               Run cypress tests in headless mode for CI
```

### Development environment set up

Install package requirements.

```shell
make install
```

### Start developing

Start the backend.

```shell
make backend-docker-start
```

In a separate terminal session, start the frontend.

```shell
make start
```

### Lint code

Run ESlint, Prettier, and Stylelint in analyze mode.

```shell
make lint
```

### Format code

Run ESlint, Prettier, and Stylelint in fix mode.

```shell
make format
```

### i18n

Extract the i18n messages to locales.

```shell
make i18n
```

### Unit tests

Run unit tests.

```shell
make test
```

### Run Cypress tests

Run each of these steps in separate terminal sessions.

In the first session, start the frontend in development mode.

```shell
make acceptance-frontend-dev-start
```

In the second session, start the backend acceptance server.

```shell
make acceptance-backend-start
```

In the third session, start the Cypress interactive test runner.

```shell
make acceptance-test
```

## License

The project is licensed under the MIT license.

## Credits and acknowledgements 🙏

Generated using [Cookieplone (2.0.0b3)](https://github.com/plone/cookieplone) and [cookieplone-templates (321ce0f)](https://github.com/plone/cookieplone-templates/commit/321ce0f7e5da80755483552af9a85599bd532468) on 2026-08-07 09:57:44.639278. A special thanks to all contributors and supporters!
