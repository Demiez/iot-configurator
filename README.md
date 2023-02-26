# IoT Configurator

![Node version][node-version-image]
![Express version][express-version-image]
![NestJs version][nestjs-version-image]
![gRPC proto version][grpc-proto-version-image]
![Mongo version][mongo-version-image]
![Redis version][redis-version-image]
![RMQ version][rmq-version-image]
![MQTT version][mqtt-version-image]

The **Internet of Things (IoT)** describes physical objects with sensors, processing ability, software, and other technologies that connect and exchange data with other devices and systems over Internet or any othe communications networks.<br>

**IoT Configurator (iotcon)** is planned to be a part of the IoT generic data for any system and can be seen as separate IoT system or as IoT subsystem and freely integrated due to the possibility of addition of specific protocols (opcua, modbus, rmq, mqtt, insite and so on), which are implemented through DataSource abstraction, management of required connectors via **Indicators** as high-level abstraction over sensor/publishers and their variables, orchestrating low-level modules in Transaction-Orchestrator pipe for futher data processing from edge devices. **Iotcon** ensures that required IoT data lifecycle is processed quickly via connector modules, logically organized through local events and can be operated on at any enterprise level.<br>

**Why indicators?** - in my opinion, current IoT state is quite complicated to the end-user, it still remains interconnection of unknown terms. With **Indicators** it's quite evident, that there is some data, which indicates some part of flow (it will relate 1:1 to IoT `variable` in scope of specific `connector`). With use of `Indicator` user is focused only on data, but not connector setup with separate variables. `Indicators` still maintain the configuration part for sensor and publisher, because connector modules are required to process data. So in fact `Indicator` flow should be close to [Global Variable Devices](https://docs.devicewise.com/Content/Products/GatewayDevelopersGuide/Devices/DeviceTypes/GlobalVariables/Global-Variables-device.htm) for basic understanding of the idea<br>

## dev documentation

- [Monorepo Setup and Management](./.docs/monorepo/README.md)
- [Project libraries](./.docs/libs/README.md)
- [Project board](https://github.com/users/Demiez/projects/2)
- [API documentation](./.docs/api-doc/README.md)
- [Functionality TODO list](./.docs/todo-list/README.md)

# Design

Architecture of **Iotcon** is shown on below diagram, iotcon subsystem can represent a part of Overall IoT System Architecture:

![flowdiagram](./.docs/images/iotcon_architecture.png)

# Supported data sources

**Iotcon** dataSources serve as generic source of data standartization, with specific default fields, which will be managed on deeper layers of IoT system. The number of configured fields differ. In current system implementation only basic and not all dataSource fields are taken (they are available for extension), mostly with aim to identify that mandatory data of specific type can be persisted in the system.

**Iotcon** has the following supported dataSources for connectors (these are added as examples, with the links to documentations):

- INSITE ([Intelligent Edge](https://www.insight.com/en_US/what-we-do/expertise/intelligent-edge.html))
- MQTT ([MQTT: The Standard for IoT Messaging](https://mqtt.org/))
- OPC Unified Architecture ([OPCUA](https://opcfoundation.org/about/opc-technologies/opc-ua/))
- RMQ ([RMQ for IoT](https://funprojects.blog/2018/12/07/rabbitmq-for-iot/))
- MODBUS ([Modbus Refference](https://www.modbus.org/docs/PI_MBUS_300.pdf))
- Wellsite Information Transfer Specification ([WITS0](https://info.erdosmiller.com/blog/wits-wellsite-information-transfer-specification-fundamentals))

# Understanding base IoT Orchestration

**Iotcon** uses **IoT Orchestrator** to perform orchestration for IoT side, which includes the following base functionality (futher development could be required depending on the subsystem integration/setup):

- iot modules schemas and templates management
- transactions processing and logging
- discrete iot modules whole configs storage and retrieval

`IoT module` should be considered a base functionality item and is itself a connector (sensor/publisher) with specific variables. Manipulations over modules are performed via `transactions`, each one is supposed to have some number of `operations` for modules. Operation holds `transactionId` field, as a mark for transaction service to identify the result of transaction, `mode` and `config` fields (each config depends on dataSource type). Before the module creation there is a need to specify `schema` and `template` that are also different and depend on dataSource type.

Each `transaction` must be logged and linked as 1:M relation to operations (because each transaction can have a link multiple performed operations, each of these has own module and mode). `Transaction` can have 2 generic states (complete and not complete, that are presented by boolean field `isComplete`). Failed transactions must still have logged moduleIds and operationModes.

`Modules storage` (precisely their configs) is performed in JSON stringified format as generic approach in current implementation for extensible solution, because types of possible configs can vary in different IoT systems. On orchestration level all operations need to be generic so modules are not differentiated explicitly into sensors or publishers (like on transaction level). Still it is possible to extend to different nested schema types, if needed.

The following limitations also apply:

- All transactions automatically marked as complete and cannot fail (no integration with external IoT/Edge system)
- Nested stored config types absent on the level of Orchestrator

# Variable types at IoT Configurator

Variables usage at **Iotcon** is based on the understanding, explained by AWS for IoT Sitewise ([AWS IoT Sitewise](https://docs.aws.amazon.com/iot-sitewise/latest/userguide/expression-variables.html)) and represents an asset of properties. Because **Iotcon** uses different dataSources (not precisely AWS IoT Sitewise) the differentiation of variables has been provided.<br>

**Differentiation of variables** for transaction creation is currently based on Data Source, in scope of which this variable is supposed to be used. Primary key (`PK`) is unique through out all the variables and unique key (`UK`) is unique in scope of selected connector (check diagram below for interactions):<br>

![dataflowdiagram](./.docs/images/iotcon_variable_types.png)

# Generic Variable fields explanation

- Variable name - unique name of variable in scope of connector
- Indicator key - used to link variable to indicator and allows correct data flow (exists in 1:1 relation on the connector module level)
- UoM (Unit of Measurement) - definite magnitude of a quantity, defined and adopted by convention
- UoC (Unit of Class) - classification used for units

# External and internal types of indicators

The terminology is mostly used to comprehend with understanding of indicators produced inside of the IoT Configurator (**internals**) and from outside of the system (**externals**). The aim here stays for possibility of integration with other/external Edge systems. In architectural plane IoT system is not isolated, so creating a basis for externals is logical. The external indicator is also supposed to have unpublished state, which leads to possibility to use it like placeholder for future external data (from MQTT or RMQ brokers). Internals meanwhile are required to have both sensor and publisher (at least default one).

# Single API

Single API flow includes CRUD for indicators (internals and externals). Standard indicator request body has the following base structure:

```json
{
  "id": "uuid",
  "name": "string",
  "description": "string",
  "group": "string",
  "tags": ["string"],
  "sensor": {},
  "publishers": {}[]
}
```

In scope of IoT Configurator sensor and publishers configurations are merged with single variable configuration based on the dataSource to approach to user flow simplification (examples for different configs for implemented dataSources will be provided in docs folder in postman collection).

[node-version-image]: https://img.shields.io/badge/node-%3E%3D%2018.12.0-brightgreen
[express-version-image]: https://img.shields.io/badge/express-v.4.18.2-brightgreen
[nestjs-version-image]: https://img.shields.io/badge/nestjs-v.9.0.0-brightgreen
[grpc-proto-version-image]: https://img.shields.io/badge/grpc-proto3-brightgreen
[mongo-version-image]: https://img.shields.io/badge/mongo-v.4.4.0-brightgreen
[redis-version-image]: https://img.shields.io/badge/redis-latest-brightgreen
[rmq-version-image]: https://img.shields.io/badge/rmq-v.3-brightgreen
[mqtt-version-image]: https://img.shields.io/badge/mqtt-latest-brightgreen
