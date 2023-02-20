# API documentation

Because of complexity of IoT Systems it's really hard to maintain full understanding of the available API. With the aim to approach to the maximal coverage (if it is possible to reach without prior knowledge) there are supposed to be 2 levels of API functionality docs available:

- `swagger API` - available via specific url (for example `domain/api/v1`) with models descriptions and out of the box UI to perform REST API calls
- `postman collection` - available in `/.docs` folder and has coverage of main use-cases and combinations saved as examples

# Swagger API doc

`Swagger` API documentation is maintained via automatic generation of API description format for REST APIs. Generated OpenAPI file allows to describe your entire API, including:

- Available endpoints and operations on each endpoint (`GET`, `POST` and so on)
- Operation parameters Input and output for each operation (params, body and so on)
- Authentication
- Request and Response View Models

Generation of swagger API description format is performed via decorators. The following requirements on the project apply:

- All fields in request models and view-models must be covered with decorators
- The model itself must be covered with decorator with name and description, where name is 1:1 copy of model class name and description briefly describes, what does this model do
- All REST API endpoints must be covered with swagger decorators at controller levels, if they are available to the user

# Postman API doc

`Postman` API documentation is maintained via postman application and saved to postman collection. The following requirements on the project apply:

- Each endpoint must be covered and contain appropriate body or other params if applicable
- Examples for main operations should be saved and attached to the correct endpoint
