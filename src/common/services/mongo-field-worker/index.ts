import { Document } from 'mongoose';
import _ from 'lodash';

class MongoFieldWorker<TEntity, TDocument extends Document> {
  /**
   * Unnecessary fields
   */
  protected readonly unnecessaryFields: string;

  /**
   * Constructor
   */
  constructor() {
    this.unnecessaryFields = '-_id -__v';
  }

  /**
   * Pick correct fields
   */
  public pickFields = (entity: TDocument): TEntity => {
    return _.pick(entity.toObject(), Object.keys(entity.schema.obj)) as TEntity;
  };
}

export default MongoFieldWorker;
