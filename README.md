# IoT Configurator

The IoT (Internet of Things) describes physical objects with sensors, processing ability, software, and other technologies that connect and exchange data with other devices and systems over Internet or any othe communications networks.

`IoT Configurator` (iotcon) is planned to be a part of the IoT generic data flow for any system and can be seen as separate IOT system or as IOT subsystem and freely integrated due to the possibility of addition of specific protocols (opcua, modbus, rmq, mqtt, insite and so on), which are implemented through `DataSource` abstraction, management of required connectors via `Signals` as high-level abstraction over sensor/publisers and variables for end-user, orchestrating low-level modules in `Transaction`-`Orchestrator` pipe for futher data processing from edge devices. IoT Configurator ensures that required IoT data lifecycle is processed quickly via connector modules, logically organized through local events and can be operated on at any enterprise level.

## dev documentation

- [Monorepo Setup and Management](./.docs/monorepo/README.md)
- [Project libraries](./.docs/libs/README.md)
