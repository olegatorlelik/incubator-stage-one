// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import supertest from 'supertest';
import { Response } from 'superagent';
import { HTTP_STATUSES, RouterPaths } from '../../src/constants';
import { TKey } from '../../src/types';

export interface IResponse<TBody> extends Omit<Response, 'body'> {
  body: TBody;
}

type TRequest = supertest.SuperTest<supertest.Test>;

export interface ITestManagerParams {
  defaultRouter: string;
  request: TRequest;
}

export interface IOptions {
  statusCode: HTTP_STATUSES;
}

class TestManager<TEntity extends object> {
  /**
   * Entity
   */
  public entity: TEntity | Record<any, any> = {};

  /**
   * Default router
   */
  public readonly defaultRouter: string;

  /**
   * Request
   */
  public readonly request: TRequest;

  /**
   * Constructor
   */
  constructor({ request, defaultRouter }: ITestManagerParams) {
    this.request = request;
    this.defaultRouter = defaultRouter;
  }

  /**
   * Clear data
   */
  public clearData = async () => {
    return this.request.delete(`${RouterPaths.testing}/all-data`);
  };

  /**
   * Get entities
   */
  protected getEntities = async (): Promise<IResponse<TEntity[]>> => {
    return this.request.get(this.defaultRouter);
  };

  /**
   * Create entity
   */
  protected createEntity = async (
    data: Partial<TEntity>
  ): Promise<IResponse<TEntity>> => {
    const res = await this.request.post(this.defaultRouter).send(data);

    if (res.statusCode === HTTP_STATUSES.CREATED_201) {
      this.setEntity(res.body);
    }

    return res;
  };

  /**
   * Get single entity by id
   */
  protected getSingleEntity = async (
    searchKey: keyof TEntity
  ): Promise<IResponse<TEntity>> => {
    const response = await this.request.get(
      `${this.defaultRouter}/${this.entity[searchKey]}`
    );

    if (response.statusCode === HTTP_STATUSES.OK_200) {
      this.setEntity(response.body);
    }

    return response;
  };

  /**
   * Update entity
   */
  protected updateEntity = async <TBody>(
    body: TBody & Record<string, any>,
    searchKey: keyof TEntity
  ): Promise<IResponse<TEntity>> => {
    const response = await this.request
      .put(`${this.defaultRouter}/${this.entity[searchKey]}`)
      .send(body);

    if (
      [HTTP_STATUSES.OK_200, HTTP_STATUSES.NO_CONTENT_204].includes(
        response.statusCode
      )
    ) {
      this.setEntity(response.body);
    }

    return response;
  };

  /**
   * Match to blog
   */
  protected compareEntity = async (
    entity: TEntity,
    key: TKey<TEntity>
  ): Promise<void> => {
    const { statusCode, body } = await this.getSingleEntity(key);

    expect(statusCode).toBe(HTTP_STATUSES.OK_200);
    expect(entity).toStrictEqual(body);
  };

  /**
   * Set entity
   */
  protected setEntity = (entity: TEntity) => {
    this.entity = entity;
  };
}

export default TestManager;
