import create from './create';
import update from './update';

const blogSchemas = {
  POST: create,
  PUT: update,
};

export default blogSchemas;
