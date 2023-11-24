import generateKeys from '../../helpers/generate-keys';
import { IErrorField } from '../../../interfaces';
import { string } from '../schemas/string';
import { array } from '../schemas/array';
import { IVideoUpdate } from '../../../features/videos/models/update';
import { AVAILABLE_RESOLUTIONS, errorFieldMessage } from '../../../constants';
import date from '../schemas/date';
import number from '../schemas/number';

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
              message: errorFieldMessage,
            }
          );
        }

        case 'author': {
          return (
            !(typeof value === 'string' && string(value)) && {
              field: 'author',
              message: errorFieldMessage,
            }
          );
        }

        case 'availableResolutions': {
          return (
            !(
              Array.isArray(value) &&
              array(value, Object.values(AVAILABLE_RESOLUTIONS))
            ) && { field: 'availableResolutions', message: errorFieldMessage }
          );
        }

        case 'canBeDownloaded': {
          return (
            typeof value !== 'boolean' && {
              field: 'canBeDownloaded',
              message: errorFieldMessage,
            }
          );
        }

        case 'minAgeRestriction':
          return (
            !(typeof value === 'number' && number(value)) && {
              field: 'minAgeRestriction',
              message: errorFieldMessage,
            }
          );

        case 'publicationDate':
          return (
            !(typeof value === 'string' && date(value)) && {
              field: 'publicationDate',
              message: errorFieldMessage,
            }
          );

        default:
          return { field: key, message: errorFieldMessage };
      }
    })
    .filter(Boolean) as IErrorField[];
};

export default updateVideoValidation;
