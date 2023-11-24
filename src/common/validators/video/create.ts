import generateKeys from '../../helpers/generate-keys';
import { IErrorField } from '../../../interfaces';
import { string } from '../schemas/string';
import { IVideoCreate } from '../../../features/videos/models/create';
import { array } from '../schemas/array';
import { AVAILABLE_RESOLUTIONS, errorFieldMessage } from '../../../constants';

const createVideoValidation = (videoParams: IVideoCreate): IErrorField[] => {
  const requiredFields: (keyof IVideoCreate)[] = [
    'author',
    'author',
    'availableResolutions',
  ];
  const keys = generateKeys<IVideoCreate>(videoParams);
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

        default:
          return { field: key, message: 'Field not exists' };
      }
    })
    .filter(Boolean) as IErrorField[];
};

export default createVideoValidation;
