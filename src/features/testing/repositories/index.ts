import postModel from '../../posts/models';
import blogsModel from '../../blogs/models';

class TestingRepositories {
  /**
   * Clear data
   */
  public clearData = async (): Promise<void> => {
    await Promise.all([postModel.deleteMany(), blogsModel.deleteMany()]);
  };
}

export default TestingRepositories;
