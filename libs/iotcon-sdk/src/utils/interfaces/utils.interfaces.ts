export interface IUtils {
  /**
   * Applies mixins for Typescript functionality of multiple class extension
   * Requires interface with same base model class name
   * @param derivedConstructor - base model class
   * @param baseConstructors - array of extended base classes
   */
  applyMixins: (derivedConstructor: any, baseConstructors: any[]) => void;

  /**
   * Converts js variable name to string value
   * @param variableObject - object that contains variable, put { variable }
   */
  convertVariableToString: (variableObject: Record<string, unknown>) => string;

  /**
   * Checks minimal of provided values
   * @param x - any value
   * @param y - any value
   * @param z - any value
   */
  // eslint-disable-next-line
  checkIsMinTwoValuesTrue: (x: any, y: any, z: any) => boolean;

  /**
   * Checks if string is a valid JSON string
   * @param value - any string value
   */
  checkIsJsonString: (value: string) => boolean;
}
