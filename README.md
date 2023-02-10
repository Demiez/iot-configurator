# IoT Configurator

The **Internet of Things (IoT)** describes physical objects with sensors, processing ability, software, and other technologies that connect and exchange data with other devices and systems over Internet or any othe communications networks.<br>

**IoT Configurator (iotcon)** is planned to be a part of the IoT generic data for any system and can be seen as separate IoT system or as IoT subsystem and freely integrated due to the possibility of addition of specific protocols (opcua, modbus, rmq, mqtt, insite and so on), which are implemented through DataSource abstraction, management of required connectors via **Indicators** as high-level abstraction over sensor/publishers and variables, orchestrating low-level modules in Transaction-Orchestrator pipe for futher data processing from edge devices. **Iotcon** ensures that required IoT data lifecycle is processed quickly via connector modules, logically organized through local events and can be operated on at any enterprise level.<br>

**Why indicators?** - in my opinion, current IoT state is quite complicated to the end-user, it still remains interconnection of unknown terms. With **Indicators** it's quite evident, that there is some data, which indicates some part of flow (it will relate 1:1 to IoT `variable` in scope of specific `connector`). With use of `Indicator` user doesn't really care of connector setup (like sensor taking some data and passing it to publisher) and only focuses on data with specific unit measurement and class. So in fact `Indicator` flow should be close to [Global Variable Devices](https://docs.devicewise.com/Content/Products/GatewayDevelopersGuide/Devices/DeviceTypes/GlobalVariables/Global-Variables-device.htm) for basic understanding of the idea<br>

## dev documentation

- [Monorepo Setup and Management](./.docs/monorepo/README.md)
- [Project libraries](./.docs/libs/README.md)
