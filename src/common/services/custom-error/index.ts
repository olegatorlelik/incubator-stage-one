import { HTTP_STATUSES } from '../../../constants';
import { IErrorField } from '../../../interfaces';

interface IConstructorParams {
  statusCode?: HTTP_STATUSES;
  errors?: IErrorField[];
}

class CustomError extends Error {
  /**
   * Status code
   */
  public statusCode: HTTP_STATUSES | undefined;

  /**
   * Serialized error
   */
  public serializedErrors: IErrorField[] = [];

  /**
   * Constructor
   */
  constructor(message: string, params?: IConstructorParams) {
    super(message);

    const { errors, statusCode } = params ?? {};

    this.statusCode = statusCode;
    this.serializedErrors = errors ?? [];

    Object.setPrototypeOf(this, CustomError.prototype);
  }

  /**
   * Getter for
   */
  get getSerializedErrors(): IErrorField[] {
    return this.serializedErrors;
  }
}

export default CustomError;
