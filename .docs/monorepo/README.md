# Monorepo setup and management

Monorepo management is a basic functionality of the project. On current project we use `pnpm` and `nx`:<br>

- [pnpm documentation](https://pnpm.io/)
- [nx documentation](https://nx.dev/)

## Monorepo structure - App centric approach

App centric repositories are used mainly for developing applications and products. This is a common setup in companies. Such repos are characterized in having separate `apps` and `libs` folder, where the `apps` folder contains the buildable and deployable applications, while the `libs` folder contains libraries that are specific to one or multiple applications that are being developed within the monorepo.

## Naming convention for applications and libs

- applications names are standard kebab-lowercase without special characters
- libraries names must be standard kebab-lowercase with `~` preceding the name

## Nx cacheable operations

One of the main benefits of adding nx to our pnpm workspace is speed via computation caching. Adding operations to nx caching is performed in `nx.json` in root dir. `cacheableOperations` array should contain only operations, which are side-effect free.

## monorepo commands examples

- `npm i -g pnpm` - install pnpm globally (check other options in pnpm doc)
- `pnpm add nx -D -w` - add NX to root monorepo workspace
- `pnpm --filter <app-name> <command>` - run command for the application from root folder
- `pnpm add --filter ~iotcon-sdk typescript -D` - install dependency to sdk lib from root folder
- `pnpm add ~iotcon-sdk --filter api-gateway --workspace` - add sdk lib as dependency to api gateway application from current workspace
- `pnpm run -r build` - run command recursively
- `npx nx run-many --target=build --projects=api-gateway,~iotcon-sdk` - run specificied projects from root folder (npx is used to run directly from node_modules)
