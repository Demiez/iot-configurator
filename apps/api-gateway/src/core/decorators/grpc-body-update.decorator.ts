import { Request } from 'express';
import { MetaContextEnum } from '~iotcon-models';
import { mapDataSource } from '~iotcon-proto';

export function GrpcBodyUpdate(context: MetaContextEnum): MethodDecorator {
  return function (
    _target: unknown,
    _propertyKey: string | symbol,
    descriptor: PropertyDescriptor
  ) {
    const original = descriptor.value;

    descriptor.value = function (...args: unknown[]) {
      const request = args[0] as Request;

      const { body } = request;

      switch (context) {
        case MetaContextEnum.DATA_SOURCE_SERVICE: {
          mapDataSource(body);
        }
      }

      return original.apply(this, args);
    };
  };
}
