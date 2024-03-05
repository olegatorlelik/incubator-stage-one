import { AVAILABLE_RESOLUTIONS } from '../constants';

const db = {
  videos: [
    {
      id: 1,
      title: 'The Catcher in the Rye',
      author: 'J.D. Salinger',
      canBeDownloaded: true,
      minAgeRestriction: null,
      createdAt: '2023-10-14T12:23:48.730Z',
      publicationDate: '2023-10-14T12:23:48.730Z',
      availableResolutions: [AVAILABLE_RESOLUTIONS.P144],
    },
    {
      id: 2,
      title: 'To Kill a Mockingbird',
      author: 'Harper Lee',
      canBeDownloaded: true,
      minAgeRestriction: 2,
      createdAt: '2023-10-14T12:23:48.730Z',
      publicationDate: '2023-10-14T12:23:48.730Z',
      availableResolutions: [AVAILABLE_RESOLUTIONS.P144],
    },
    {
      id: 3,
      title: '1984',
      author: 'George Orwell',
      canBeDownloaded: true,
      minAgeRestriction: null,
      createdAt: '2023-10-14T12:23:48.730Z',
      publicationDate: '2023-10-14T12:23:48.730Z',
      availableResolutions: [AVAILABLE_RESOLUTIONS.P144],
    },
  ],
  blogs: [
    {
      id: 'item1',
      name: 'First Item',
      description: 'This is the description of the first item.',
      websiteUrl: 'https://www.example.com/item1',
    },
    {
      id: 'item2',
      name: 'Second Item',
      description: 'Description for the second item goes here.',
      websiteUrl: 'https://www.example.com/item2',
    },
    {
      id: 'item3',
      name: 'Third Item',
      description: 'Detailed description of the third item.',
      websiteUrl: 'https://www.example.com/item3',
    },
  ],
};

type TData = typeof db;
type TDataKeys = keyof TData;
type TDataValue = TData[TDataKeys];

class MockDatabase {
  /**
   * Instance of mock database
   */
  private static instance: MockDatabase | null = null;

  /**
   * Data
   */
  private data: TData | Record<string, any> = {};

  /**
   * Constructor
   */
  constructor() {
    if (MockDatabase.instance) {
      return MockDatabase.instance;
    }

    // Initialize your database properties here
    this.data = db;

    MockDatabase.instance = this;
  }

  /**
   * Get entities
   */
  public getData<TKey extends TDataKeys>(key: TKey): TData[TKey] {
    return this.data[key];
  }

  /**
   * Update data
   */
  public updateData(key: TDataKeys, value: TDataValue): void {
    this.data[key] = value;
  }
}

const databaseInstance = new MockDatabase();

export default databaseInstance;
