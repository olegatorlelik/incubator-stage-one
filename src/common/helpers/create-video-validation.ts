import { IVideoCreate } from '../../features/videos/models/create';
import { array, string } from '../validators/scheme';
import { AVAILABLE_RESOLUTIONS } from '../../constants';
import { IErrorField } from '../../interfaces';
import generateKeys from './generate-keys';

const createVideoValidation = (videoParams: IVideoCreate): IErrorField[] => {
  const keys = generateKeys<IVideoCreate>(videoParams);

  if (keys?.length === 0) {
    return [{ field: 'all', message: 'All required fields should be filled' }];
  }

  return keys
    .map((key) => {
      switch (key) {
        case 'title': {
          return (
            !(
              typeof videoParams[key] === 'string' && string(videoParams[key])
            ) && { field: 'title', message: 'Invalid field' }
          );
        }

        case 'author': {
          return (
            !(
              typeof videoParams[key] === 'string' && string(videoParams[key])
            ) && { field: 'author', message: 'Invalid field' }
          );
        }

        case 'availableResolutions': {
          const availableResolutions = videoParams[key];

          return (
            !(
              Array.isArray(availableResolutions) &&
              array(availableResolutions, Object.values(AVAILABLE_RESOLUTIONS))
            ) && { field: 'availableResolutions', message: 'Invalid values' }
          );
        }

        default:
          return { field: key, message: 'Field not exists' };
      }
    })
    .filter(Boolean) as IErrorField[];
};

export default createVideoValidation;
