export interface IUtils {
  /**
   * Applies mixins for Typescript functionality of multiple class extension
   * Requires interface with same base model class name
   * @param derivedConstructor - base model class
   * @param baseConstructors - array of extended base classes
   */
  applyMixins: (derivedConstructor: any, baseConstructors: any[]) => void;
}
