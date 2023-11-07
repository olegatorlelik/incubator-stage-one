import { IVideoUpdate } from '../../features/videos/models/update';
import { AVAILABLE_RESOLUTIONS } from '../../constants';
import { array, string } from '../validators/scheme';
import { IErrorField } from '../../interfaces';
import generateKeys from './generate-keys';

/**
 * Validation input params for video entity
 */
const updateVideoValidation = (videoParams: IVideoUpdate): IErrorField[] => {
  const keys = generateKeys<IVideoUpdate>(videoParams);

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

        case 'canBeDownloaded': {
          return (
            typeof videoParams[key] !== 'boolean' && {
              field: 'canBeDownloaded',
              message: 'Should be boolean',
            }
          );
        }

        case 'minAgeRestriction':
          return (
            typeof videoParams[key] !== 'number' && {
              field: 'minAgeRestriction',
              message: 'Should be number',
            }
          );

        case 'publicationDate':
          return (
            !(new Date(videoParams[key]) instanceof Date) && {
              field: 'publicationDate',
              message: 'Should be date',
            }
          );

        default:
          return { field: key, message: 'Field not exists' };
      }
    })
    .filter(Boolean) as IErrorField[];
};

export default updateVideoValidation;
