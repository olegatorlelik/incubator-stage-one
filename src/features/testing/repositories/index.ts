import db from '../../../db';

class TestingRepositories {
  /**
   * Clear data
   */
  public clearData = (): void => {
    db.updateData('videos', []);
    db.updateData('blogs', []);
  };
}

export default TestingRepositories;
