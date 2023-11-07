// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import supertest from 'supertest';
import { Response } from 'superagent';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import _ from 'lodash';
import { HTTP_STATUSES } from '../../../src/constants';

type TRequest = supertest.SuperTest<supertest.Test>;

interface IResponse<TBody> extends Omit<Response, 'body'> {
  body: TBody;
}

type TKeys<T> = keyof T;

interface ICreateEntityParams<TEntity> {
  entityKeys?: TKeys<TEntity>[];
  wrongBody?: Record<string, any>;
}

interface ITestManagerParams<TEntity> {
  defaultRouter: string;
  entity: TEntity;
}

class TestManager<TEntity extends object> {
  /**
   * Entity
   */
  public entity: TEntity;

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
  constructor(request: TRequest, params: ITestManagerParams<TEntity>) {
    const { defaultRouter, entity } = params ?? {};

    this.request = request;
    this.entity = entity;
    this.defaultRouter = defaultRouter;
  }

  /**
   * Clear data
   */
  public clearData = async () => {
    return this.request.delete(`${this.defaultRouter}/testing/all-data`);
  };

  /**
   * Get entities
   */
  public getEntities = async (): Promise<IResponse<TEntity>> => {
    return this.request.get(this.defaultRouter);
  };

  /**
   * Create entity
   */
  public createEntity = async (
    params: ICreateEntityParams<TEntity>
  ): Promise<IResponse<TEntity>> => {
    const { entityKeys, wrongBody } = params ?? {};

    if (wrongBody) {
      return this.request.post(this.defaultRouter).send(wrongBody);
    }

    const res = await this.request
      .post(this.defaultRouter)
      .send(_.pick(this.entity, entityKeys ?? 'id'));

    if (res.statusCode === HTTP_STATUSES.CREATED_201) {
      this.setEntity(res.body);
    }

    return res;
  };

  /**
   * Get single entity by id
   */
  public getSingleEntity = async (
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
  public updateEntity = async <TBody>(
    body: TBody & Record<string, any>,
    searchKey: keyof TEntity
  ): Promise<IResponse<TEntity>> => {
    const response = await this.request
      .put(`${this.defaultRouter}/${this.entity[searchKey]}`)
      .send(body);

    if (response.statusCode === HTTP_STATUSES.OK_200) {
      this.setEntity(response.body);
    }

    return response;
  };

  /**
   * Set entity
   */
  public setEntity = (entity: TEntity) => {
    this.entity = entity;
  };
}

export default TestManager;
