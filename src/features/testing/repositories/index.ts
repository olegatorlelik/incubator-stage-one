import db from '../../../db';

class TestingRepositories {
  /**
   * Clear data
   */
  public clearData = (): void => db.updateData('videos', []);
}

export default TestingRepositories;
