import { TKey } from '../../types';

/**
 * Generate keys for object of validation
 */
const generateKeys = <T>(entity: object): TKey<T>[] =>
  Object.keys(entity) as unknown as TKey<T>[];

export default generateKeys;
