import { AVAILABLE_RESOLUTIONS } from '../../../constants';

export interface IVideoView {
  id: number;
  title: string;
  author: string;
  minAgeRestriction: number | null;
  createdAt: Date;
  publicationDate: Date;
  availableResolutions: AVAILABLE_RESOLUTIONS[];
  canBeDownloaded: boolean;
}
