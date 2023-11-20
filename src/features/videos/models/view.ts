import { AVAILABLE_RESOLUTIONS } from '../../../constants';

export interface IVideoView {
  id: number;
  title: string;
  author: string;
  minAgeRestriction: number | null;
  createdAt: string;
  publicationDate: string;
  availableResolutions: AVAILABLE_RESOLUTIONS[];
  canBeDownloaded: boolean;
}
