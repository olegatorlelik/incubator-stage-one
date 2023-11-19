import generateKeys from '../../helpers/generate-keys';
import { IErrorField } from '../../../interfaces';
import { string } from '../schemas/string';
import { array } from '../schemas/array';
import { IVideoUpdate } from '../../../features/videos/models/update';
import { AVAILABLE_RESOLUTIONS } from '../../../constants';

/**
 * Validation input params for video entity
 */
const updateVideoValidation = (videoParams: IVideoUpdate): IErrorField[] => {
  const requiredFields: (keyof IVideoUpdate)[] = [
    'availableResolutions',
    'canBeDownloaded',
    'minAgeRestriction',
    'publicationDate',
    'author',
    'title',
  ];
  const keys = generateKeys<IVideoUpdate>(videoParams);
  const isFillRequired = requiredFields.every((field) => keys.includes(field));

  if (!isFillRequired) {
    return [{ field: 'all', message: 'All required fields should be filled' }];
  }

  return keys
    .map((key) => {
      const value = videoParams[key];

      switch (key) {
        case 'title': {
          return (
            !(typeof value === 'string' && string(value)) && {
              field: 'title',
              message: 'Invalid field',
            }
          );
        }

        case 'author': {
          return (
            !(typeof value === 'string' && string(value)) && {
              field: 'author',
              message: 'Invalid field',
            }
          );
        }

        case 'availableResolutions': {
          return (
            !(
              Array.isArray(value) &&
              array(value, Object.values(AVAILABLE_RESOLUTIONS))
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
