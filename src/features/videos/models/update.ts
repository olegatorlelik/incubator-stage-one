import { AVAILABLE_RESOLUTIONS } from '../../../constants';

export interface IVideoUpdate {
  title: string;
  author: string;
  availableResolutions: AVAILABLE_RESOLUTIONS[];
  canBeDownloaded: boolean;
  minAgeRestriction: number | null;
  publicationDate: Date;
}
