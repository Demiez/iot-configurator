import { IUtils } from './interfaces/utils.interfaces';

export class IotconUtils implements IUtils {
  // Required for generic handling
  /* eslint-disable */
  public applyMixins = (
    derivedConstructor: any,
    baseConstructors: any[]
  ): void => {
    baseConstructors.forEach((baseConstructor) => {
      Object.getOwnPropertyNames(baseConstructor.prototype).forEach((name) => {
        Object.defineProperty(
          derivedConstructor.prototype,
          name,
          Object.getOwnPropertyDescriptor(baseConstructor.prototype, name)
        );
      });
    });
  };
}
