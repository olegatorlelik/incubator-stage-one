import { AVAILABLE_RESOLUTIONS } from '../../../constants';

export interface IVideoCreate {
  title: string;
  author: string;
  availableResolutions: AVAILABLE_RESOLUTIONS[];
}
