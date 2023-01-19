# Project libraries

In project all libs must be saved to libs folder. Libs are packages, which contain shared functionality, required for a number of microservices. A developer is expected to update corresponding lib during development phase. Each lib must have an entry point with brief description of what it does. It is also recommended to add such annotations to separate classes in SDK lib. Each lib must be standard kebab-lowercase with `~` preceding the name. All libs represent private packages, they are not published to npm and available inside of workspace of monorepo.

## Available libs

- SDK
- Models
- Proto
- Errors

## Lib usage

Any available lib package can be used by updating corresponding package.json, but the definition should point to monorepo workspace, smth like `"~iotcon-sdk": "workspace:*"`. To run install use pnpm command from root of the project.

## Root libs commands

- `npm run build:libs` - builds all the libs available
- `pnpm --filter api-gateway i` - run command for the api-gateway to pickup lib package after adding it to package.json
- `pnpm add ~iotcon-sdk --filter api-gateway --workspace` - add sdk lib as dependency to api gateway application from current workspace

### Models lib info

Models lib shares enums, interfaces or model throughout the solution. Main model types are:

- BaseModel (`bm.ts`) - used for abstract classes only, cannot be directly instantiated
- RequestModel (`rm.ts`) - used for fast abstraction of request data, mostly from api-gateway
- DataModel (`dm.ts`) - used for data processing and transmision, still it has a broader use than dtos, because can also have construtors, proto dto convertions and some logic mapping methods
- ViewModel (`vm.ts`) - used to provide data back from solution predominantly on api-gateway level
